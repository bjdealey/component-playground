/**
 * Sidebar section order.
 *
 * Ninety-plus components in one alphabetical list is a scroll, not a menu.
 * Sections are ordered roughly by how often you reach for them, not
 * alphabetically — `Primitives` first because everything else composes them.
 *
 * A manifest with no `category`, or one naming a section not listed here, falls
 * into `FALLBACK_CATEGORY` rather than disappearing.
 */
export const CATEGORY_ORDER = [
  'Primitives',
  'Forms',
  'Actions',
  'Navigation',
  'Data display',
  'Charts',
  'Feedback',
  'Files & media',
  'Content',
] as const

export const FALLBACK_CATEGORY = 'Other'

/** Sections in canonical order, with anything unrecognised last. */
export function orderCategories(present: Iterable<string>): string[] {
  const seen = new Set(present)
  const ordered = CATEGORY_ORDER.filter((name) => seen.has(name)) as string[]
  const extra = [...seen].filter((name) => !ordered.includes(name)).sort()
  return [...ordered, ...extra]
}
