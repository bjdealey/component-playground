/**
 * Categorical palette for the multi-series charts.
 *
 * Both sets were checked with the six-check validator (lightness band, chroma
 * floor, adjacent-pair CVD separation, contrast vs surface) rather than picked
 * by eye:
 *
 *   light  worst adjacent ΔE 15.3 (tritan) · all ≥ 3:1 on #fcfcfb
 *   dark   worst adjacent ΔE 13.3 (tritan) · all ≥ 3:1 on #1a1a19
 *
 * Dark is a *selected* set, not an automatic flip: `#4f46e5` only reaches 2.77:1
 * on a dark surface, so that one slot lifts to `#6366f1` and the rest stand.
 *
 * Hues are assigned in fixed order and never cycled — a 9th series should fold
 * into "Other" rather than inventing a colour.
 */
export const CATEGORICAL_LIGHT = [
  '#4f46e5',
  '#0284c7',
  '#15803d',
  '#d97706',
  '#db2777',
  '#7c3aed',
] as const

export const CATEGORICAL_DARK = [
  '#6366f1',
  '#0284c7',
  '#15803d',
  '#d97706',
  '#db2777',
  '#7c3aed',
] as const

export const CATEGORICAL_LIGHT_CSV = CATEGORICAL_LIGHT.join(', ')
export const CATEGORICAL_DARK_CSV = CATEGORICAL_DARK.join(', ')

/** Splits a comma-separated palette prop, falling back to the light default. */
export function parsePalette(value: string): string[] {
  const parsed = value
    .split(',')
    .map((color) => color.trim())
    .filter((color) => color.length > 0)
  return parsed.length > 0 ? parsed : [...CATEGORICAL_LIGHT]
}
