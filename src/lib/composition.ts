import type { ComponentManifest, PlaygroundValues, PropValues } from './types'
import { defaultValues } from './values'
import { getManifest } from './registry'

/**
 * A page built out of registered components.
 *
 * Deliberately a flat list rather than nested rows: every block declares how
 * many of the twelve columns it wants and the grid wraps them into rows itself.
 * That keeps reordering a single array move instead of a tree edit, and it means
 * a block can be widened without first working out which row owns it.
 */

/** The grid is twelve columns, so halves, thirds and quarters all land clean. */
export const COLUMNS = 12

export interface CompositionBlock {
  id: string
  /** Manifest name. A block whose component has since been removed is dropped. */
  component: string
  values: PlaygroundValues
  /** Columns spanned, 1–12. */
  span: number
  /**
   * Rows spanned. Only interesting for a block that should sit beside a stack of
   * others — a nav rail down the left of a settings page — which auto-placement
   * gives you for free once the rail is told it is three rows tall.
   */
  rowSpan: number
  /**
   * Drive the component's own `width` prop from the cell it landed in.
   *
   * Without this every block would need a hand-computed width, and re-spanning
   * one from a half to a third would leave it the old size with a gap beside it.
   * Components cap their width — `DataTable` stops at 660 — so the fitted value
   * is clamped to whatever the control declared and simply stops growing.
   */
  fit: boolean
}

export interface PageSettings {
  /** Behind the blocks — the theme's page color, or a scene's own. */
  background: string
  /** Content width in px. The canvas is scrollable past it. */
  width: number
  padding: number
  gap: number
  /**
   * The narrowest a block may get at this page size, in columns.
   *
   * This is what makes the device sizes mean anything. Narrowing the page alone
   * would leave a three-column stat card 78px wide on a phone — a crushed
   * desktop layout, not a mobile one. A floor collapses the grid the way a real
   * breakpoint does, and because it is applied on the way to the renderer
   * rather than written into the blocks, going back to Desktop restores every
   * span exactly as it was authored.
   */
  minSpan: number
}

export interface DevicePreset {
  id: string
  label: string
  /** Shown on the button, since the collapse is not obvious from the width. */
  hint: string
  width: number
  padding: number
  minSpan: number
}

/**
 * The three sizes worth checking a page at.
 *
 * Widths are the common viewport rather than the device — 390 is the iPhone
 * class, 768 the portrait tablet, 1100 the point past which the components
 * stop growing anyway, since most of them cap their own width.
 */
export const DEVICES: DevicePreset[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    hint: '390px — every block full width',
    width: 390,
    padding: 16,
    minSpan: COLUMNS,
  },
  {
    id: 'tablet',
    label: 'Tablet',
    hint: '768px — nothing narrower than a half',
    width: 768,
    padding: 20,
    minSpan: 6,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    hint: '1100px — spans as authored',
    width: 1100,
    padding: 24,
    minSpan: 1,
  },
]

/** The device a page currently matches, or null once it has been hand-tuned. */
export function activeDevice(page: PageSettings): DevicePreset | null {
  return (
    DEVICES.find(
      (device) => device.width === page.width && device.minSpan === page.minSpan,
    ) ?? null
  )
}

export function applyDevice(page: PageSettings, device: DevicePreset): PageSettings {
  return {
    ...page,
    width: device.width,
    padding: device.padding,
    minSpan: device.minSpan,
  }
}

/**
 * The columns a block actually occupies, after the page's floor.
 *
 * Derived rather than stored, for the same reason the theme is: the authored
 * span is the decision, and this is what the decision looks like at this size.
 */
export function effectiveSpan(page: PageSettings, span: number): number {
  return Math.min(COLUMNS, Math.max(1, Math.max(span, page.minSpan)))
}

/**
 * Row spans survive until the page is a single column, at which point they are
 * meaningless — a nav rail told it is five rows tall has nothing left to sit
 * beside, and honouring it would open four empty rows below it.
 */
export function effectiveRowSpan(page: PageSettings, rowSpan: number): number {
  return page.minSpan >= COLUMNS ? 1 : Math.max(1, rowSpan)
}

export interface Composition {
  /** The scene this started from, shown in the toolbar. */
  name: string
  page: PageSettings
  blocks: CompositionBlock[]
}

/**
 * 720 is not arbitrary: it is the widest page whose full-span cell still lands
 * inside the width ceilings the components declare, so a full-width `Navbar` or
 * `Footer` fills its row instead of stopping short with a gap beside it.
 */
export const DEFAULT_PAGE: PageSettings = {
  background: '#f6f7f9',
  width: 720,
  padding: 24,
  gap: 20,
  minSpan: 1,
}

/**
 * Block ids only have to be unique within one composition and stable across a
 * render, so a counter beats anything involving randomness — it also keeps the
 * ids readable in the URL hash.
 */
let nextId = 0

export function blockId(): string {
  nextId += 1
  return `b${nextId}`
}

/**
 * A block as a scene declares it — everything optional but the component, so a
 * scene reads as a layout rather than as a wall of prop assignments.
 */
export interface BlockSpec {
  component: string
  span?: number
  rowSpan?: number
  props?: PropValues
  children?: string
  slots?: Record<string, { props?: PropValues; children?: string }>
}

export function createBlock(
  manifest: ComponentManifest,
  spec: BlockSpec = { component: manifest.name },
): CompositionBlock {
  const values = defaultValues(manifest)

  // Only keys the manifest still declares are applied, so a scene written
  // against an older version of a component degrades to that component's
  // defaults instead of injecting props it no longer has.
  for (const [key, value] of Object.entries(spec.props ?? {})) {
    if (key in values.props) values.props[key] = value
  }
  if (spec.children !== undefined) values.children = spec.children

  for (const [name, override] of Object.entries(spec.slots ?? {})) {
    const slot = values.slots[name]
    if (!slot) continue
    for (const [key, value] of Object.entries(override.props ?? {})) {
      if (key in slot.props) slot.props[key] = value
    }
    if (override.children !== undefined) slot.children = override.children
  }

  return {
    id: blockId(),
    component: manifest.name,
    values,
    span: Math.min(COLUMNS, Math.max(1, spec.span ?? COLUMNS)),
    rowSpan: Math.max(1, spec.rowSpan ?? 1),
    // A scene that pinned a width meant it; anything else fits its cell.
    fit: !(spec.props && 'width' in spec.props),
  }
}

/**
 * The pixel width of a cell spanning `span` columns.
 *
 * The grid is a known width rather than a measured one, so this needs no layout
 * pass and stays correct on the first render — no flash of a wrongly sized
 * component while a ResizeObserver catches up.
 */
/**
 * The page with the theme's spacing folded in.
 *
 * The margin round the page and the gutter between blocks are the same decision
 * as the space inside a component — asking for zero padding and getting a 24px
 * frame round the whole thing is the setting not being obeyed, just one level
 * up. Everything that measures the page goes through here so the canvas, the
 * fitted widths and the generated code cannot disagree about how wide a cell is.
 */
export function effectivePage(
  page: PageSettings,
  theme: { tokens: { padding: number; gap: number }; enabled: { padding: boolean; gap: boolean } } | null,
): PageSettings {
  if (!theme) return page

  const padding = theme.enabled.padding
    ? Math.round(page.padding * theme.tokens.padding)
    : page.padding
  const gap = theme.enabled.gap ? Math.round(page.gap * theme.tokens.gap) : page.gap

  return padding === page.padding && gap === page.gap ? page : { ...page, padding, gap }
}

export function cellWidth(page: PageSettings, span: number): number {
  const content = page.width - page.padding * 2
  const column = (content - page.gap * (COLUMNS - 1)) / COLUMNS
  // The floor is applied here rather than at each call site, so a fitted block
  // can never be sized for a cell narrower than the one it is placed in.
  const columns = effectiveSpan(page, span)
  return Math.round(column * columns + page.gap * (columns - 1))
}

/* ------------------------------------------------------------------ *
 * Edits. All pure — the caller holds the state.
 * ------------------------------------------------------------------ */

export function addBlock(
  composition: Composition,
  block: CompositionBlock,
  after?: string,
): Composition {
  const blocks = [...composition.blocks]
  const index = after ? blocks.findIndex((entry) => entry.id === after) : -1

  if (index === -1) blocks.push(block)
  else blocks.splice(index + 1, 0, block)

  return { ...composition, blocks }
}

export function removeBlock(composition: Composition, id: string): Composition {
  return {
    ...composition,
    blocks: composition.blocks.filter((block) => block.id !== id),
  }
}

/** Moves a block one position, clamped — the ends are not wrapped around. */
export function moveBlock(
  composition: Composition,
  id: string,
  delta: number,
): Composition {
  const blocks = [...composition.blocks]
  const from = blocks.findIndex((block) => block.id === id)
  if (from === -1) return composition

  const to = from + delta
  if (to < 0 || to >= blocks.length) return composition

  const [moved] = blocks.splice(from, 1)
  blocks.splice(to, 0, moved)
  return { ...composition, blocks }
}

export function updateBlock(
  composition: Composition,
  id: string,
  update: (values: PlaygroundValues) => PlaygroundValues,
): Composition {
  return {
    ...composition,
    blocks: composition.blocks.map((block) =>
      block.id === id ? { ...block, values: update(block.values) } : block,
    ),
  }
}

/** Shared shape for the small per-block setters below. */
function patchBlock(
  composition: Composition,
  id: string,
  patch: Partial<CompositionBlock>,
): Composition {
  return {
    ...composition,
    blocks: composition.blocks.map((block) =>
      block.id === id ? { ...block, ...patch } : block,
    ),
  }
}

export function setSpan(
  composition: Composition,
  id: string,
  span: number,
): Composition {
  return patchBlock(composition, id, {
    span: Math.min(COLUMNS, Math.max(1, span)),
  })
}

export function setRowSpan(
  composition: Composition,
  id: string,
  rowSpan: number,
): Composition {
  return patchBlock(composition, id, { rowSpan: Math.max(1, rowSpan) })
}

export function setFit(
  composition: Composition,
  id: string,
  fit: boolean,
): Composition {
  return patchBlock(composition, id, { fit })
}

export function duplicateBlock(
  composition: Composition,
  id: string,
): { composition: Composition; id: string } | null {
  const source = composition.blocks.find((block) => block.id === id)
  if (!source) return null

  const copy: CompositionBlock = {
    ...source,
    id: blockId(),
    // Deep enough: props and children are flat, slots are one level.
    values: {
      props: { ...source.values.props },
      children: source.values.children,
      slots: Object.fromEntries(
        Object.entries(source.values.slots).map(([name, slot]) => [
          name,
          { props: { ...slot.props }, children: slot.children },
        ]),
      ),
    },
  }

  return { composition: addBlock(composition, copy, id), id: copy.id }
}

/**
 * Drops blocks whose component is no longer registered.
 *
 * A folder renamed while the dev server is running would otherwise strand the
 * canvas on a component that cannot be resolved.
 */
export function pruneBlocks(composition: Composition): Composition {
  const blocks = composition.blocks.filter((block) => {
    if (getManifest(block.component)) return true
    console.warn(
      `[compose] dropping block for unregistered component "${block.component}".`,
    )
    return false
  })

  return blocks.length === composition.blocks.length
    ? composition
    : { ...composition, blocks }
}

/** Span presets offered in the block toolbar, as fractions of the grid. */
export const SPAN_PRESETS = [
  { label: '¼', span: 3 },
  { label: '⅓', span: 4 },
  { label: '½', span: 6 },
  { label: '⅔', span: 8 },
  { label: '1', span: COLUMNS },
] as const
