import {
  atLightness,
  contrast,
  hsl,
  lightnessOf,
  mix,
} from './color'
import { ALL_ON, deriveColors, SHADOW_STEPS } from './theme'
import type { Theme, ThemeColors, ThemeMode, ThemeTokens } from './theme'

/**
 * The design-direction generator.
 *
 * Randomising well is not rolling each property on its own — that is what makes
 * a card with sharp corners, a heavy shadow, a pastel fill and cramped padding,
 * four decisions that never agreed to share a page. Instead one *archetype* is
 * chosen first, and every token is drawn from ranges that reinforce it: a soft
 * direction rounds the corners *and* opens the spacing *and* softens the accent,
 * so the result reads as one design language rather than a pile of CSS.
 *
 * The output is a `Theme` — the same structure `src/lib/theme.ts` already folds
 * onto every component. So the coherence, the contrast floors and the light/dark
 * derivation that compose mode has always had come for free; this module only
 * decides *what* theme, and does it with a point of view.
 */

export interface Archetype {
  name: string
  /** Relative odds of being chosen. Kept close to even so variety survives. */
  weight: number
  /** A hue in degrees for this direction — its palette family. */
  hue: () => number
  /** Accent saturation and lightness the direction aims for (light-mode target). */
  sat: [number, number]
  light: [number, number]
  /** How far the neutrals lean toward the accent — 0 is cold grey. */
  neutralTint: number
  radius: [number, number]
  /** Odds the direction drops borders entirely; otherwise a width in this range. */
  borderZeroProb: number
  border: [number, number]
  /** Elevation as a `SHADOW_STEPS` index (0–3). */
  shadow: [number, number]
  gradientProb: number
  gradientStrength: [number, number]
  fontScale: [number, number]
  /** Font-weight offset pool, in CSS weight units. */
  weightOffset: number[]
  /** Padding/gap multiplier the direction sits at. */
  spacing: [number, number]
  stroke: [number, number]
  elementScale: [number, number]
  /** Odds a Button-like component reaches for a filled variant over a quiet one. */
  variantFilled: number
  uppercaseProb: number
  letterSpacing: [number, number]
  highlightProb: number
}

/* ------------------------------------------------------------------ *
 * Weighted randomness.
 * ------------------------------------------------------------------ */

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/** A range that leans to its middle — two uniforms averaged, so extremes are rare. */
function randMid([min, max]: [number, number]): number {
  return min + ((Math.random() + Math.random()) / 2) * (max - min)
}

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function chance(p: number): boolean {
  return Math.random() < p
}

function pickWeighted<T extends { weight: number }>(list: readonly T[]): T {
  const total = list.reduce((sum, item) => sum + item.weight, 0)
  let roll = Math.random() * total
  for (const item of list) {
    roll -= item.weight
    if (roll <= 0) return item
  }
  return list[list.length - 1]
}

/**
 * Pleasant accent hue bands, avoiding the 55–95° yellow-green that never quite
 * reads as a brand colour. A direction picks a band, then a hue within it.
 */
const HUE_BANDS: [number, number][] = [
  [210, 258], // indigo → blue
  [188, 205], // cyan
  [160, 186], // teal → green
  [128, 152], // green
  [268, 300], // violet
  [300, 330], // magenta
  [330, 352], // rose
  [12, 34], // orange
  [352, 366], // red (wraps)
]

const anyHue = () => rand(...pick(HUE_BANDS))
const coolHue = () => rand(...pick([[210, 258], [188, 205], [160, 186]] as [number, number][]))
const vividHue = () =>
  rand(...pick([[210, 258], [268, 300], [300, 330], [330, 352], [12, 34], [160, 186]] as [number, number][]))

/* ------------------------------------------------------------------ *
 * The archetypes.
 * ------------------------------------------------------------------ */

export const ARCHETYPES: Archetype[] = [
  {
    name: 'Minimal',
    weight: 1.2,
    hue: coolHue,
    sat: [0.14, 0.5],
    light: [0.4, 0.55],
    neutralTint: 0.2,
    radius: [0, 4],
    borderZeroProb: 0.1,
    border: [1, 1],
    shadow: [0, 1],
    gradientProb: 0,
    gradientStrength: [0, 0],
    fontScale: [0.92, 1.02],
    weightOffset: [0, 0, 0, 100],
    spacing: [0.85, 1.05],
    stroke: [0.9, 1.1],
    elementScale: [0.9, 1.05],
    variantFilled: 0.3,
    uppercaseProb: 0.1,
    letterSpacing: [0, 0.3],
    highlightProb: 0,
  },
  {
    name: 'Soft',
    weight: 1.1,
    hue: anyHue,
    sat: [0.32, 0.6],
    light: [0.54, 0.66],
    neutralTint: 0.6,
    radius: [14, 24],
    borderZeroProb: 0.6,
    border: [1, 1],
    shadow: [1, 2],
    gradientProb: 0.4,
    gradientStrength: [0.12, 0.26],
    fontScale: [1.0, 1.1],
    weightOffset: [0, 0, 0],
    spacing: [1.1, 1.35],
    stroke: [0.9, 1.1],
    elementScale: [1.0, 1.15],
    variantFilled: 0.45,
    uppercaseProb: 0.05,
    letterSpacing: [0, 0.2],
    highlightProb: 0.35,
  },
  {
    name: 'Bold',
    weight: 0.9,
    hue: vividHue,
    sat: [0.7, 0.95],
    light: [0.42, 0.55],
    neutralTint: 0.35,
    radius: [4, 10],
    borderZeroProb: 0.2,
    border: [2, 3],
    shadow: [0, 1],
    gradientProb: 0.2,
    gradientStrength: [0.1, 0.2],
    fontScale: [1.0, 1.1],
    weightOffset: [100, 100, 200],
    spacing: [0.9, 1.1],
    stroke: [1.0, 1.4],
    elementScale: [0.95, 1.1],
    variantFilled: 0.8,
    uppercaseProb: 0.4,
    letterSpacing: [0.3, 1.0],
    highlightProb: 0.1,
  },
  {
    name: 'Elevated',
    weight: 1.1,
    hue: coolHue,
    sat: [0.55, 0.8],
    light: [0.45, 0.58],
    neutralTint: 0.4,
    radius: [8, 16],
    borderZeroProb: 0.7,
    border: [1, 1],
    shadow: [2, 3],
    gradientProb: 0.6,
    gradientStrength: [0.2, 0.4],
    fontScale: [1.0, 1.06],
    weightOffset: [0, 0, 100],
    spacing: [1.05, 1.25],
    stroke: [0.9, 1.1],
    elementScale: [1.0, 1.1],
    variantFilled: 0.7,
    uppercaseProb: 0.1,
    letterSpacing: [0, 0.2],
    highlightProb: 0.4,
  },
  {
    name: 'Technical',
    weight: 1.0,
    hue: coolHue,
    sat: [0.5, 0.75],
    light: [0.4, 0.52],
    neutralTint: 0.15,
    radius: [2, 6],
    borderZeroProb: 0.05,
    border: [1, 1],
    shadow: [0, 0],
    gradientProb: 0,
    gradientStrength: [0, 0],
    fontScale: [0.9, 1.0],
    weightOffset: [0, 0, 0],
    spacing: [0.8, 1.0],
    stroke: [0.9, 1.2],
    elementScale: [0.9, 1.05],
    variantFilled: 0.5,
    uppercaseProb: 0.15,
    letterSpacing: [0, 0.3],
    highlightProb: 0,
  },
  {
    name: 'Playful',
    weight: 0.9,
    hue: vividHue,
    sat: [0.62, 0.9],
    light: [0.5, 0.62],
    neutralTint: 0.5,
    radius: [16, 28],
    borderZeroProb: 0.5,
    border: [1, 2],
    shadow: [1, 2],
    gradientProb: 0.45,
    gradientStrength: [0.18, 0.34],
    fontScale: [1.02, 1.14],
    weightOffset: [0, 0, 100],
    spacing: [1.05, 1.3],
    stroke: [0.9, 1.2],
    elementScale: [1.05, 1.2],
    variantFilled: 0.6,
    uppercaseProb: 0.1,
    letterSpacing: [0, 0.2],
    highlightProb: 0.35,
  },
]

/* ------------------------------------------------------------------ *
 * Palette.
 * ------------------------------------------------------------------ */

/** The page a themed surface sits on — a touch off the surface, per mode. */
export function pageFor(surface: string, mode: ThemeMode): string {
  return mode === 'light' ? mix('#000000', surface, 0.035) : mix('#000000', surface, 0.4)
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/** Slide a foreground's lightness (hue kept) until it clears `min` contrast. */
export function toContrast(fg: string, bg: string, min: number): string {
  if (contrast(fg, bg) >= min) return fg
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
 * An accent that will hold a button label has to carry it at AA (4.5:1), and the
 * label is only ever the mode's ink — white on light, near-black on dark. A
 * mid-lightness accent clears neither, so it is pushed off that dead band toward
 * its pole: darker on light, lighter on dark. Hue and saturation stay put, so a
 * teal stays teal — it just deepens enough to read a label. This keeps one
 * coherent accent everywhere rather than a second, label-only colour.
 */
function accentHoldsLabel(accent: string, label: string, light: boolean): string {
  if (contrast(accent, label) >= 4.5) return accent
  const from = lightnessOf(accent)
  const step = light ? -0.02 : 0.02
  let best = accent
  for (let i = 1; i <= 40; i += 1) {
    best = atLightness(accent, clamp01(from + step * i))
    if (contrast(best, label) >= 4.5) break
  }
  return best
}

/**
 * One coherent set of colours for a direction, held to the same WCAG floors the
 * shared theme uses: neutrals warmed a few percent toward the accent so the
 * scheme reads as designed, body text at 7:1, muted at 4.5:1, the accent at the
 * 3:1 large-element floor — all measured against the surface they sit on.
 */
function paletteFor(a: Archetype, mode: ThemeMode): ThemeColors {
  const light = mode === 'light'

  // Accents lift a little on a dark ground, where the same lightness reads dimmer.
  const hue = a.hue()
  const sat = clamp01(randMid(a.sat) + (light ? 0 : 0.05))
  const lit = clamp01(randMid(a.light) + (light ? 0 : 0.08))
  const accentBase = hsl(hue, sat, lit)

  const surfaceBase = light ? '#ffffff' : '#161719'
  const textBase = light ? '#141518' : '#f4f5f7'
  const mutedBase = light ? '#5f6672' : '#9aa1ab'
  const borderBase = light ? '#e2e5ea' : '#33353d'
  const tint = (light ? 0.03 : 0.05) * (0.4 + a.neutralTint)

  const surface = mix(accentBase, surfaceBase, tint * 0.6)
  // First legible on the surface (3:1, the large-object floor), then legible
  // *under a label* (4.5:1). A filled accent carries the opposite ink to the
  // page — white on light, near-black on dark — so that is what it must clear.
  const labelInk = light ? '#ffffff' : '#17191c'
  const accent = accentHoldsLabel(toContrast(accentBase, surface, 3), labelInk, light)
  const text = toContrast(mix(accentBase, textBase, tint), surface, 7)
  const textMuted = toContrast(mix(accentBase, mutedBase, tint * 2), surface, 4.5)
  const border = mix(accentBase, borderBase, tint)

  return { accent, surface, text, textMuted, border, page: pageFor(surface, mode) }
}

/* ------------------------------------------------------------------ *
 * Tokens.
 * ------------------------------------------------------------------ */

function round(value: number, step: number): number {
  return Math.round(value / step) * step
}

function tokensFor(a: Archetype, colors: ThemeColors): ThemeTokens {
  const spacing = randMid(a.spacing)
  // Gap tracks padding but not identically — a roomy card with slightly tighter
  // rows is a real style, and one number could not say it.
  const gap = clamp01Range(spacing + rand(-0.06, 0.06), 0.6, 1.6)

  const border = chance(a.borderZeroProb) ? 0 : Math.round(randMid(a.border))
  const gradient = chance(a.gradientProb) ? round(randMid(a.gradientStrength), 0.05) : 0

  return {
    accent: colors.accent,
    surface: colors.surface,
    text: colors.text,
    textMuted: colors.textMuted,
    border: colors.border,
    radius: Math.round(randMid(a.radius)),
    borderWidth: border,
    fontScale: round(randMid(a.fontScale), 0.05),
    padding: round(spacing, 0.05),
    gap: round(gap, 0.05),
    stroke: round(randMid(a.stroke), 0.1),
    elementScale: round(randMid(a.elementScale), 0.05),
    weight: pick(a.weightOffset),
    shadow: Math.round(randMid(a.shadow)),
    gradient,
    gradientAngle: round(rand(120, 220), 10),
  }
}

function clamp01Range(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/* ------------------------------------------------------------------ *
 * The generator.
 * ------------------------------------------------------------------ */

export interface GeneratedDesign {
  theme: Theme
  archetype: Archetype
  /** The page behind the components, for the compose-mode caller. */
  page: string
}

/**
 * A fresh, coherent design system for the given light/dark mode.
 *
 * Both variants are built so a later light/dark flip is lossless: the current
 * mode is authored, the other is derived by moving lightness while hue and
 * saturation hold — the identity (corners, spacing, type, accent family) stays
 * put, only the surfaces and contrast adapt.
 */
export function generateDesign(mode: ThemeMode): GeneratedDesign {
  const archetype = pickWeighted(ARCHETYPES)
  const colors = paletteFor(archetype, mode)
  const tokens = tokensFor(archetype, colors)
  const other = mode === 'light' ? 'dark' : 'light'

  return {
    theme: {
      tokens,
      enabled: { ...ALL_ON },
      mode,
      alternate: deriveColors(colors, other),
    },
    archetype,
    page: colors.page,
  }
}

/** Index-safe access to the elevation ramp — the shadow token bounds it. */
export const SHADOW_MAX = SHADOW_STEPS.length - 1
