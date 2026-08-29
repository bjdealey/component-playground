import type {
  ComponentManifest,
  Control,
  PlaygroundValues,
  PropValues,
  SlotValues,
} from './types'
import { getManifest } from './registry'
import {
  ALL_ON,
  applyThemeToValues,
  drawsSurface,
  ownsShadow,
  roleOf,
} from './theme'
import type { Theme, ThemeColors, ThemeMode } from './theme'
import { parseHex } from './color'
import { effectDefaults } from './effects'
import {
  generateDesign,
  pageFor,
  SHADOW_MAX,
  toContrast,
  type Archetype,
} from './designSystem'

/**
 * Randomising a component — as a coherent design system, not a pile of CSS.
 *
 * The generator in `designSystem.ts` picks one design direction and draws a
 * whole `Theme` from it. That theme is then folded onto the component through
 * the *same* `applyTheme` machinery compose mode uses, so the colours, the
 * corners, the spacing and the type all agree, contrast is enforced, and a
 * light/dark flip is lossless — none of which per-property randomness could give.
 *
 * Three things the theme does not decide are added on top, and only these:
 *   1. a *stylistic* pass over the few appearance props that carry design
 *      character but map to no theme role — `variant`, `uppercase`, letter
 *      spacing, hover brightness;
 *   2. a colour-blind-safe ramp for props that hold a *list* of colours (chart
 *      series, avatar rings);
 *   3. component-level effects (shadow / highlight / gradient), tinted from the
 *      generated accent so they belong to the palette.
 *
 * Everything else is deliberately left alone. Content, handlers, layout width,
 * and — the point of the rewrite — *state*: `disabled`, `hovered`, `open`,
 * `invalid` and their kin are behaviour, not decoration, and randomising them
 * was the old code previewing a broken component and calling it a style.
 */

export type StageMode = ThemeMode

/**
 * A qualitative ramp for list props (chart series, avatar rings) — every
 * adjacent pair stays separable under the common colour-vision deficiencies, so
 * a randomised palette never hides a category behind a confusable neighbour.
 */
const CVD_RAMP = [
  '#0072b2',
  '#e69f00',
  '#009e73',
  '#cc79a7',
  '#56b4e9',
  '#d55e00',
  '#7c3aed',
  '#0f766e',
]

/** Variant/tone values that mean success or failure — never repainted as style. */
const STATUS_VALUES = new Set([
  'danger',
  'success',
  'warning',
  'error',
  'info',
  'destructive',
  'positive',
  'negative',
  'critical',
])

/** Variant values that fill a shape with the accent rather than staying quiet. */
const FILLED_VALUES = new Set([
  'primary',
  'solid',
  'filled',
  'default',
  'fill',
  'contained',
])

/* ------------------------------------------------------------------ *
 * Small random helpers.
 * ------------------------------------------------------------------ */

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function chance(p: number): boolean {
  return Math.random() < p
}

function randRange([min, max]: [number, number]): number {
  return min + Math.random() * (max - min)
}

function clampIndex(value: number, length: number): number {
  return Math.min(length - 1, Math.max(0, Math.round(value)))
}

/** Keep a number inside its control's declared range, snapped to its step. */
function clampNumber(control: Extract<Control, { kind: 'number' }>, value: number): number {
  const lo = control.min ?? Number.NEGATIVE_INFINITY
  const hi = control.max ?? Number.POSITIVE_INFINITY
  const step = control.step && control.step > 0 ? control.step : 1
  const snapped = Math.round(value / step) * step
  return Math.round(Math.min(hi, Math.max(lo, snapped)) * 100) / 100
}

/* ------------------------------------------------------------------ *
 * Colour-list props (chart palettes, ring sets).
 * ------------------------------------------------------------------ */

function listColors(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

function isColorList(value: string): boolean {
  const parts = listColors(value)
  return parts.length >= 2 && parts.every((part) => parseHex(part) !== null)
}

function shuffledRamp(count: number, surface: string): string {
  const start = Math.floor(Math.random() * CVD_RAMP.length)
  const out: string[] = []
  for (let i = 0; i < count; i += 1) {
    // Keep each series colour visible on the surface it charts against.
    out.push(toContrast(CVD_RAMP[(start + i) % CVD_RAMP.length], surface, 3))
  }
  return out.join(', ')
}

function rampLists(controls: Control[], props: PropValues, surface: string): void {
  for (const control of controls) {
    if (control.kind !== 'text' && control.kind !== 'textarea') continue
    const value = props[control.name]
    if (typeof value === 'string' && isColorList(value)) {
      props[control.name] = shuffledRamp(listColors(value).length, surface)
    }
  }
}

/* ------------------------------------------------------------------ *
 * The base — appearance reset, everything else preserved.
 * ------------------------------------------------------------------ */

/**
 * Reset every *appearance* prop to its manifest default, keeping content, state
 * and layout as they are.
 *
 * Resetting first is what makes randomise idempotent: `applyTheme` scales
 * padding and type as *multipliers* on whatever is live, so theming an
 * already-themed value would compound a little more on every click until the
 * component drifted off the page. Multiplying the manifest default instead
 * lands in the same place every time. A prop the theme has an opinion about is
 * an appearance prop, so "has a role" is exactly the line to reset on.
 */
function resetRoled(manifest: ComponentManifest, values: PlaygroundValues): PlaygroundValues {
  const reset = (target: ComponentManifest, props: PropValues): PropValues => {
    const out: PropValues = {}
    for (const control of target.props) {
      out[control.name] =
        roleOf(control, target.name) !== null
          ? control.default
          : props[control.name] ?? control.default
    }
    return out
  }

  const slots: Record<string, SlotValues> = {}
  for (const [name, slot] of Object.entries(values.slots)) {
    const definition = manifest.slots?.find((entry) => entry.name === name)
    const target = definition ? getManifest(definition.component) : undefined
    slots[name] = target
      ? { props: reset(target, slot.props), children: slot.children }
      : slot
  }

  return {
    props: reset(manifest, values.props),
    children: values.children,
    slots,
    effects: values.effects,
  }
}

/* ------------------------------------------------------------------ *
 * The stylistic pass — appearance props with no theme role.
 * ------------------------------------------------------------------ */

function pickVariant(options: string[], archetype: Archetype): string | undefined {
  const safe = options.filter((option) => !STATUS_VALUES.has(option.toLowerCase()))
  if (safe.length === 0) return undefined

  const filled = safe.filter((option) => FILLED_VALUES.has(option.toLowerCase()))
  const quiet = safe.filter((option) => !FILLED_VALUES.has(option.toLowerCase()))

  if (filled.length > 0 && chance(archetype.variantFilled)) return pick(filled)
  return pick(quiet.length > 0 ? quiet : safe)
}

function letterSpacingFor(archetype: Archetype, uppercase: boolean): number {
  // Uppercase wants tracking; without it the direction's own small range applies.
  return uppercase ? randRange([0.4, 1.0]) : randRange(archetype.letterSpacing)
}

/** Below 1 darkens (right for a light ground), above 1 lightens (right for dark). */
function hoverBrightnessFor(mode: ThemeMode): number {
  return mode === 'light' ? randRange([0.9, 0.96]) : randRange([1.04, 1.1])
}

/**
 * Choose `variant` / `tone` — *before* the theme is folded in.
 *
 * The order is load-bearing: `applyTheme` paints a variant's colours through
 * `VARIANT_ROLES` (primary fills with the accent, ghost only inks the label), so
 * the variant has to be decided first or a freshly-chosen ghost keeps the solid
 * fill the old primary left behind.
 */
function chooseVariants(controls: Control[], props: PropValues, archetype: Archetype): void {
  for (const control of controls) {
    if (control.kind !== 'select') continue
    if (control.name === 'variant') {
      const next = pickVariant(control.options, archetype)
      if (next !== undefined) props.variant = next
    } else if (control.name === 'tone') {
      const safe = control.options.filter((o) => !STATUS_VALUES.has(o.toLowerCase()))
      if (safe.length > 0) props.tone = pick(safe)
    }
  }
}

/** Type and hover styling — safe to run after theming, none of it is a colour role. */
function styleType(
  controls: Control[],
  props: PropValues,
  archetype: Archetype,
  mode: ThemeMode,
): void {
  let uppercase = props.uppercase === true
  for (const control of controls) {
    if (control.kind === 'boolean' && control.name === 'uppercase') {
      uppercase = chance(archetype.uppercaseProb)
      props.uppercase = uppercase
    }
  }

  // After uppercase is decided, since tracking depends on it.
  for (const control of controls) {
    if (control.kind !== 'number') continue
    if (control.name === 'letterSpacing') {
      props.letterSpacing = clampNumber(control, letterSpacingFor(archetype, uppercase))
    } else if (control.name === 'hoverBrightness') {
      props.hoverBrightness = clampNumber(control, hoverBrightnessFor(mode))
    }
  }
}

/** Just the hover direction, for a light/dark re-bake that keeps everything else. */
function adjustHover(controls: Control[], props: PropValues, mode: ThemeMode): void {
  for (const control of controls) {
    if (control.kind === 'number' && control.name === 'hoverBrightness') {
      props.hoverBrightness = clampNumber(control, mode === 'light' ? 0.93 : 1.07)
    }
  }
}

/* ------------------------------------------------------------------ *
 * Effects.
 * ------------------------------------------------------------------ */

/** Effect scale (0–5) for each elevation step, or 0 where the component owns one. */
const SHADOW_TO_EFFECT = [0, 2, 3, 5] as const

/**
 * Component-level effects, coherent with the direction.
 *
 * Only for components that draw a surface for an effect to sit on — a wash
 * behind a Divider or a Spinner is noise. Shadow defers to a component's own
 * elevation prop where it has one, so the two never stack. Strengths stay
 * conservative so text over the gradient or the highlight keeps its contrast.
 */
function randomEffects(
  archetype: Archetype,
  theme: Theme,
  manifest: ComponentManifest,
): PropValues {
  const base = effectDefaults()
  if (!drawsSurface(manifest)) return base

  const shadow = ownsShadow(manifest)
    ? 0
    : SHADOW_TO_EFFECT[clampIndex(theme.tokens.shadow, SHADOW_MAX + 1)]
  const highlight = chance(archetype.highlightProb) ? Math.round(randRange([8, 24])) : 0
  const gradient = theme.tokens.gradient > 0 ? Math.round(theme.tokens.gradient * 55) : 0

  return {
    shadow,
    highlight,
    gradient,
    gradientColor: theme.tokens.accent,
    gradientAngle: theme.tokens.gradientAngle,
  }
}

/* ------------------------------------------------------------------ *
 * Baking a design onto a component.
 * ------------------------------------------------------------------ */

function bake(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  theme: Theme,
  archetype: Archetype,
  mode: ThemeMode,
): PlaygroundValues {
  const base = resetRoled(manifest, values)

  // Variants first, so the theme paints the colours of the variant we chose.
  chooseVariants(manifest.props, base.props, archetype)
  for (const [name, slot] of Object.entries(base.slots)) {
    const definition = manifest.slots?.find((entry) => entry.name === name)
    const target = definition ? getManifest(definition.component) : undefined
    if (target) chooseVariants(target.props, slot.props, archetype)
  }

  const themed = applyThemeToValues(manifest, base, theme).values

  styleType(manifest.props, themed.props, archetype, mode)
  rampLists(manifest.props, themed.props, theme.tokens.surface)

  for (const [name, slot] of Object.entries(themed.slots)) {
    const definition = manifest.slots?.find((entry) => entry.name === name)
    const target = definition ? getManifest(definition.component) : undefined
    if (!target) continue
    styleType(target.props, slot.props, archetype, mode)
    rampLists(target.props, slot.props, theme.tokens.surface)
  }

  return { ...themed, effects: randomEffects(archetype, theme, manifest) }
}

/* ------------------------------------------------------------------ *
 * Public API.
 * ------------------------------------------------------------------ */

/**
 * A fresh random configuration for one component, and the design system behind
 * it. The theme is returned so the stage can flip it to the other variant on a
 * light/dark switch (see `rebakeForMode`) rather than stranding light colours
 * on a dark ground.
 */
export function randomizeComponent(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  mode: StageMode,
): { values: PlaygroundValues; theme: Theme } {
  const { theme, archetype } = generateDesign(mode)
  return { values: bake(manifest, values, theme, archetype, mode), theme }
}

/**
 * The values-only form, for the compose canvas where a block is randomised
 * under the page's own theme and carries no component-level effects.
 */
export function randomizeValues(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  mode: StageMode,
): PlaygroundValues {
  const { values: next } = randomizeComponent(manifest, values, mode)
  return { ...next, effects: values.effects }
}

/** Swap a theme's colours to its other variant, identity intact. */
function flipMode(theme: Theme, mode: ThemeMode): Theme {
  if (mode === theme.mode) return theme
  const next = theme.alternate
  const current: ThemeColors = {
    accent: theme.tokens.accent,
    surface: theme.tokens.surface,
    text: theme.tokens.text,
    textMuted: theme.tokens.textMuted,
    border: theme.tokens.border,
    page: pageFor(theme.tokens.surface, theme.mode),
  }
  return {
    ...theme,
    mode,
    tokens: {
      ...theme.tokens,
      accent: next.accent,
      surface: next.surface,
      text: next.text,
      textMuted: next.textMuted,
      border: next.border,
    },
    alternate: current,
  }
}

/**
 * Re-derive a randomised component for the other light/dark variant.
 *
 * The design identity is kept — corners, spacing, type, the chosen variant and
 * effect levels all persist (they ride through `resetRoled`, which only resets
 * what the theme drives). Only the colours, their contrast, and the hover
 * direction adapt to the new mode, and the gradient tint follows the new accent.
 */
export function rebakeForMode(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  theme: Theme,
  mode: StageMode,
): { values: PlaygroundValues; theme: Theme } {
  const flipped = flipMode(theme, mode)
  const base = resetRoled(manifest, values)
  const themed = applyThemeToValues(manifest, base, flipped).values

  adjustHover(manifest.props, themed.props, mode)
  rampLists(manifest.props, themed.props, flipped.tokens.surface)

  for (const [name, slot] of Object.entries(themed.slots)) {
    const definition = manifest.slots?.find((entry) => entry.name === name)
    const target = definition ? getManifest(definition.component) : undefined
    if (!target) continue
    adjustHover(target.props, slot.props, mode)
    rampLists(target.props, slot.props, flipped.tokens.surface)
  }

  const effects = {
    ...(values.effects ?? effectDefaults()),
    gradientColor: flipped.tokens.accent,
  }

  return { values: { ...themed, effects }, theme: flipped }
}

/**
 * A fresh random *theme* for compose mode — one click retints, re-rounds and
 * re-scales the whole page.
 *
 * The same design-direction generator drives it, so a compose theme now carries
 * a coherent spacing and type scale, not only colours and corners. Every token
 * the generator sets is switched on so the result actually shows, and the other
 * variant is derived for a lossless light/dark flip.
 */
export function randomizeTheme(theme: Theme): { theme: Theme; page: string } {
  const { theme: generated, page } = generateDesign(theme.mode)
  return {
    theme: { ...generated, enabled: { ...ALL_ON } },
    page,
  }
}
