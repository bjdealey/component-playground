/**
 * Small color helpers for the shared theme.
 *
 * The theme has to derive colors it was never given — a soft accent tint for
 * selected rows, a readable foreground for text sitting on the accent — so a
 * single `accent` token can drive props that are not the accent itself. Kept
 * deliberately small: sRGB mixing is close enough for a preview surface, and
 * pulling in a color library for four functions would not earn its weight.
 */

interface Rgb {
  r: number
  g: number
  b: number
}

/** Parses `#rgb` and `#rrggbb`. Returns null for anything else, including
 *  `transparent`, `''` and named colors — callers treat that as "leave alone". */
export function parseHex(value: string): Rgb | null {
  const hex = value.trim().replace(/^#/, '')

  if (hex.length === 3) {
    const [r, g, b] = hex.split('')
    return parseHex(`#${r}${r}${g}${g}${b}${b}`)
  }

  if (!/^[0-9a-f]{6}$/i.test(hex)) return null

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

function toHex({ r, g, b }: Rgb): string {
  const channel = (value: number) =>
    Math.round(Math.min(255, Math.max(0, value)))
      .toString(16)
      .padStart(2, '0')
  return `#${channel(r)}${channel(g)}${channel(b)}`
}

/**
 * `amount` of `from` over `to` — `mix('#4f46e5', '#ffffff', 0.12)` is the 12%
 * accent tint used for selected backgrounds.
 */
export function mix(from: string, to: string, amount: number): string {
  const a = parseHex(from)
  const b = parseHex(to)
  if (!a || !b) return from

  const t = Math.min(1, Math.max(0, amount))
  return toHex({
    r: b.r + (a.r - b.r) * t,
    g: b.g + (a.g - b.g) * t,
    b: b.b + (a.b - b.b) * t,
  })
}

/** WCAG relative luminance. */
function luminance(color: Rgb): number {
  const channel = (raw: number) => {
    const c = raw / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return (
    0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b)
  )
}

/**
 * A foreground that stays legible on `background` — the label on an accent-filled
 * button, which must not go on being white when the accent is pale yellow.
 *
 * The 0.45 threshold is tuned rather than the textbook 0.5: at exactly 0.5 a
 * mid-blue accent flips to dark text a step before it actually reads better.
 */
export function readableOn(background: string, dark = '#17191c', light = '#ffffff'): string {
  const parsed = parseHex(background)
  if (!parsed) return light
  return luminance(parsed) > 0.45 ? dark : light
}

interface Hsl {
  h: number
  s: number
  l: number
}

function toHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h =
    max === rn
      ? ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
      : max === gn
        ? ((bn - rn) / d + 2) / 6
        : ((rn - gn) / d + 4) / 6

  return { h, s, l }
}

function fromHsl({ h, s, l }: Hsl): Rgb {
  if (s === 0) {
    const v = l * 255
    return { r: v, g: v, b: v }
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const channel = (t: number) => {
    let x = t
    if (x < 0) x += 1
    if (x > 1) x -= 1
    if (x < 1 / 6) return p + (q - p) * 6 * x
    if (x < 1 / 2) return q
    if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6
    return p
  }

  return {
    r: channel(h + 1 / 3) * 255,
    g: channel(h) * 255,
    b: channel(h - 1 / 3) * 255,
  }
}

/**
 * The same color at a different lightness, hue and saturation untouched.
 *
 * This is what makes a dark variant of a theme rather than a different theme:
 * Warm's amber stays amber and Forest's green stays green, they just sit at the
 * lightness their new surface needs. Saturation is nudged up slightly as things
 * darken, because a color that keeps its saturation number reads flatter
 * against a dark ground than it did against a light one.
 */
export function atLightness(color: string, lightness: number): string {
  const parsed = parseHex(color)
  if (!parsed) return color

  const hsl = toHsl(parsed)
  const target = Math.min(1, Math.max(0, lightness))

  // HSL inflates the saturation of near-white and near-black colors. `#fffdf9`
  // is barely off-white and reports S = 1.0, because at the ends of the
  // lightness axis the denominator collapses to the same tiny number as the
  // numerator. Carrying that S down to a dark surface produced a fully
  // saturated brown where a warm grey belonged — Warm and Bloom both did it.
  //
  // Chroma is the honest measure of how colorful something is, so chroma is
  // what carries across. Only when that *lowers* saturation, though: raising it
  // would take an accent moving toward mid-lightness and blow it out.
  const chroma = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s
  const room = 1 - Math.abs(2 * target - 1)
  const fromChroma = room === 0 ? 0 : chroma / room
  const s = Math.min(1, Math.max(0, Math.min(hsl.s, fromChroma)))

  return toHex(fromHsl({ h: hsl.h, s, l: target }))
}

/** How light a color is, 0 to 1. Used to decide which variant a theme is. */
export function lightnessOf(color: string): number {
  const parsed = parseHex(color)
  return parsed ? toHsl(parsed).l : 1
}

/**
 * A hex color from HSL — hue in degrees [0, 360), saturation and lightness in
 * [0, 1]. The randomiser builds accents this way so a design direction can dial
 * hue, vividness and lightness independently rather than picking from a fixed list.
 */
export function hsl(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360
  return toHex(
    fromHsl({
      h: hue / 360,
      s: Math.min(1, Math.max(0, s)),
      l: Math.min(1, Math.max(0, l)),
    }),
  )
}

/**
 * Whichever of the two foregrounds actually measures better on `background`.
 *
 * `readableOn` is the one to reach for normally — its threshold is tuned by eye,
 * and eye is what a preview surface is for. This is its counterpart for the
 * legibility guard, where the only question is which pairing can be read, and a
 * tuned threshold is exactly the wrong instrument: Midnight's `#818cf8` sits
 * just under it and gets white text at 2.98:1 when dark text would give 6.5:1.
 */
export function bestOn(background: string, dark = '#17191c', light = '#ffffff'): string {
  return contrast(dark, background) >= contrast(light, background) ? dark : light
}

/**
 * WCAG contrast ratio, 1 (identical) to 21 (black on white).
 *
 * Used as a guard rather than a target: the theme is allowed to put any two
 * colors together, but not to put a foreground somewhere it cannot be seen.
 * Unparseable input returns 21 so a sentinel like `''` reads as "no opinion"
 * and nothing gets overridden on the strength of a color nobody chose.
 */
export function contrast(a: string, b: string): number {
  const first = parseHex(a)
  const second = parseHex(b)
  if (!first || !second) return 21

  const light = Math.max(luminance(first), luminance(second))
  const dark = Math.min(luminance(first), luminance(second))
  return (light + 0.05) / (dark + 0.05)
}

/** Whether a color prop holds a real color, as opposed to a sentinel. */
export function isConcreteColor(value: string): boolean {
  return parseHex(value) !== null
}

/**
 * `rgba()` from a hex color and an alpha.
 *
 * The gradient wash needs the accent as a translucent stop, and a hex cannot
 * carry alpha in a form the older `#rrggbbaa` syntax makes safe to concatenate.
 * An unparseable input yields transparent rather than a broken declaration that
 * would take the whole gradient down with it.
 */
export function withAlpha(color: string, alpha: number): string {
  const parsed = parseHex(color)
  if (!parsed) return 'rgba(0, 0, 0, 0)'
  const a = Math.min(1, Math.max(0, alpha))
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${Math.round(a * 1000) / 1000})`
}
