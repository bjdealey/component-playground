import type {
  ComponentManifest,
  Control,
  ControlValue,
  PlaygroundValues,
  PropValues,
  SlotValues,
} from './types'
import { getManifest } from './registry'
import { deriveColors, roleOf, TOKEN_RANGES } from './theme'
import type { Theme, ThemeColors, ThemeTokens } from './theme'
import { atLightness, bestOn, contrast, lightnessOf, mix, parseHex } from './color'

/**
 * Randomising a component's settings — and its colours in a way that stays
 * legible and colour-blind-safe.
 *
 * Numbers, booleans and selects get a fresh valid value; text, textarea and
 * event props keep what they had (content and handlers are not decoration). The
 * colours are the interesting part: rather than throwing random hex at each
 * prop, this builds one coherent palette for the current light/dark stage and
 * maps it onto the props by the *same roles* the shared theme uses — so a `text`
 * prop stays a legible foreground and an `accent` prop stays the brand colour.
 */

export type StageMode = 'light' | 'dark'

/**
 * Accent bases that stay distinct under the common colour-vision deficiencies
 * (deuteranopia, protanopia, tritanopia) — the Okabe–Ito set minus the pale
 * yellow that can't carry white text, plus two in the same spirit. Picking the
 * accent from here makes the brand colour colour-blind-safe by construction, and
 * one safe accent against neutral chrome can never form a confusable pair.
 */
const CVD_ACCENTS = [
  '#0072b2', // blue
  '#d55e00', // vermillion
  '#009e73', // bluish green
  '#cc79a7', // reddish purple
  '#e69f00', // orange
  '#56b4e9', // sky blue
  '#7c3aed', // violet
  '#0f766e', // teal
]

/** A qualitative ramp for list props (chart series, avatar rings) — every pair
 *  is separable under CVD, so a randomised palette never hides a category. */
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

/** Dimensions are the canvas, not the style — leave them where they are so a
 *  randomise restyles the component in place instead of teleporting it. */
const KEEP = new Set(['width', 'height'])

interface Palette {
  accent: string
  onAccent: string
  accentSoft: string
  surface: string
  surfaceAlt: string
  track: string
  text: string
  textMuted: string
  border: string
}

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/** Slide a foreground's lightness (hue kept) until it clears `min` contrast. */
function toContrast(fg: string, bg: string, min: number): string {
  if (contrast(fg, bg) >= min) return fg
  // Away from the surface: darker on a light ground, lighter on a dark one.
  const direction = lightnessOf(bg) > 0.5 ? -1 : 1
  const from = lightnessOf(fg)
  let best = fg
  for (let i = 1; i <= 26; i += 1) {
    best = atLightness(fg, clamp01(from + direction * i * 0.03))
    if (contrast(best, bg) >= min) break
  }
  return best
}

/**
 * One coherent palette for the stage. Neutrals are near-white/near-dark, warmed
 * a few percent toward the accent so the scheme reads as designed rather than
 * assembled, then held to WCAG AA: body foregrounds at 4.5:1, the accent at the
 * 3:1 large-element floor, both measured against the surface they sit on.
 */
export function randomPalette(mode: StageMode): Palette {
  const light = mode === 'light'
  const accentBase = pick(CVD_ACCENTS)

  const surfaceBase = light ? '#ffffff' : '#161719'
  const textBase = light ? '#141518' : '#f4f5f7'
  const mutedBase = light ? '#5f6672' : '#9aa1ab'
  const borderBase = light ? '#e2e5ea' : '#33353d'
  const tint = light ? 0.03 : 0.05

  const surface = mix(accentBase, surfaceBase, tint * 0.6)
  const accent = toContrast(accentBase, surface, 3)
  const text = toContrast(mix(accentBase, textBase, tint), surface, 7)
  const textMuted = toContrast(mix(accentBase, mutedBase, tint * 2), surface, 4.5)
  const border = mix(accentBase, borderBase, tint)

  return {
    accent,
    onAccent: bestOn(accent),
    accentSoft: mix(accent, surface, 0.14),
    surface,
    surfaceAlt: mix(text, surface, 0.06),
    track: mix(text, surface, 0.22),
    text,
    textMuted,
    border,
  }
}

/** The palette colour for a theme role, or null for roles that aren't colours. */
function colorForRole(role: string, palette: Palette): string | null {
  switch (role) {
    case 'accent':
      return palette.accent
    case 'accentSoft':
      return palette.accentSoft
    case 'onAccent':
      return palette.onAccent
    case 'surface':
      return palette.surface
    case 'surfaceAlt':
      return palette.surfaceAlt
    case 'track':
      return palette.track
    case 'text':
      return palette.text
    case 'textMuted':
      return palette.textMuted
    case 'border':
      return palette.border
    default:
      return null
  }
}

function listColors(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

/** A text prop that is really a list of colours — a chart palette or ring set. */
function isColorList(value: string): boolean {
  const parts = listColors(value)
  return parts.length >= 2 && parts.every((part) => parseHex(part) !== null)
}

function shuffledRamp(count: number, palette: Palette): string {
  const start = Math.floor(Math.random() * CVD_RAMP.length)
  const out: string[] = []
  for (let i = 0; i < count; i += 1) {
    // Keep each series colour visible on the surface it charts against.
    out.push(toContrast(CVD_RAMP[(start + i) % CVD_RAMP.length], palette.surface, 3))
  }
  return out.join(', ')
}

function randomNumber(control: Extract<Control, { kind: 'number' }>): number {
  const min = control.min ?? 0
  const fallbackMax = typeof control.default === 'number' ? control.default * 2 : 1
  const max = control.max ?? Math.max(min + 1, fallbackMax)
  const step = control.step && control.step > 0 ? control.step : 1

  // Triangular (average of two uniforms) leans toward the middle of the range,
  // so results favour reasonable values over the ragged extremes.
  const t = (Math.random() + Math.random()) / 2
  const snapped = Math.round((min + (max - min) * t) / step) * step
  const bounded = Math.min(max, Math.max(min, snapped))
  // One decimal at most — sizes carry halves, spacing and radius stay integral.
  return Math.round(bounded * 10) / 10
}

function randomValue(
  control: Control,
  current: ControlValue,
  componentName: string,
  palette: Palette,
): ControlValue {
  switch (control.kind) {
    case 'number':
      return KEEP.has(control.name) ? current : randomNumber(control)
    case 'boolean':
      return Math.random() < 0.5
    case 'select':
      return control.options.length > 0 ? pick(control.options) : current
    case 'color': {
      // `''` is the manifest's "my variant decides" sentinel — leave it, the same
      // way the theme does, so a danger button doesn't turn into the brand colour.
      if (control.default === '') return current
      const role = roleOf(control, componentName)
      return (role && colorForRole(role, palette)) ?? current
    }
    case 'text':
    case 'textarea':
      return typeof current === 'string' && isColorList(current)
        ? shuffledRamp(listColors(current).length, palette)
        : current
    default:
      // Event props are handlers, not style.
      return current
  }
}

function randomizeProps(
  controls: Control[],
  props: PropValues,
  componentName: string,
  palette: Palette,
): PropValues {
  const out: PropValues = { ...props }
  for (const control of controls) {
    out[control.name] = randomValue(
      control,
      props[control.name] ?? control.default,
      componentName,
      palette,
    )
  }
  return out
}

/**
 * A fresh random configuration for one component, colours and all.
 *
 * `mode` is the stage's light/dark, so the palette is legible against the
 * background you're actually previewing on. Slots share the one palette, the way
 * a real page shares a theme, so a card and the button inside it agree.
 */
export function randomizeValues(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  mode: StageMode,
): PlaygroundValues {
  const palette = randomPalette(mode)

  const slots: Record<string, SlotValues> = { ...values.slots }
  for (const slot of manifest.slots ?? []) {
    const target = getManifest(slot.component)
    const slotValues = values.slots[slot.name]
    if (!target || !slotValues) continue
    slots[slot.name] = {
      props: randomizeProps(target.props, slotValues.props, target.name, palette),
      children: slotValues.children,
    }
  }

  return {
    props: randomizeProps(manifest.props, values.props, manifest.name, palette),
    children: values.children,
    slots,
  }
}

function randToken(range: { min: number; max: number; step: number }): number {
  const steps = Math.round((range.max - range.min) / range.step)
  const value = range.min + Math.floor(Math.random() * (steps + 1)) * range.step
  return Math.round(value * 100) / 100
}

/** The page a themed surface sits on — a touch off the surface, per mode. */
function pageFor(surface: string, mode: StageMode): string {
  return mode === 'light' ? mix('#000000', surface, 0.035) : mix('#000000', surface, 0.4)
}

/**
 * A fresh random *theme* for compose mode — one click retints the whole page.
 *
 * Colours come from the same `randomPalette`, so the scheme is coherent, WCAG-
 * legible and colour-blind-safe in the current light/dark variant. Corners and
 * surface effects vary too; the type and spacing scales are left alone so nothing
 * about the layout breaks. The randomised tokens are switched on so the result
 * actually shows, and the other variant is derived for a lossless light/dark flip.
 */
export function randomizeTheme(theme: Theme): { theme: Theme; page: string } {
  const p = randomPalette(theme.mode)

  const tokens: ThemeTokens = {
    ...theme.tokens,
    accent: p.accent,
    surface: p.surface,
    text: p.text,
    textMuted: p.textMuted,
    border: p.border,
    radius: randToken(TOKEN_RANGES.radius),
    borderWidth: randToken(TOKEN_RANGES.borderWidth),
    shadow: randToken(TOKEN_RANGES.shadow),
    gradient: Math.random() < 0.45 ? 0 : randToken({ min: 0.1, max: 0.5, step: 0.05 }),
  }

  const page = pageFor(p.surface, theme.mode)
  const colors: ThemeColors = {
    accent: p.accent,
    surface: p.surface,
    text: p.text,
    textMuted: p.textMuted,
    border: p.border,
    page,
  }
  const otherMode = theme.mode === 'light' ? 'dark' : 'light'

  return {
    theme: {
      ...theme,
      tokens,
      // Turn on the tokens we just set, so a randomise is never a no-op because a
      // switch happened to be off. The rest keep the user's toggles.
      enabled: {
        ...theme.enabled,
        accent: true,
        surface: true,
        text: true,
        textMuted: true,
        border: true,
        radius: true,
        borderWidth: true,
        shadow: true,
        gradient: true,
      },
      alternate: deriveColors(colors, otherMode),
    },
    page,
  }
}
