import type { Composition, CompositionBlock, PageSettings } from './composition'
import { DEFAULT_PAGE, blockId } from './composition'
import type {
  Theme,
  ThemeColors,
  ThemeMode,
  ThemeTokenName,
  ToggleToken,
} from './theme'
import { defaultTheme, deriveColors } from './theme'
import { lightnessOf } from './color'
import { COMPOSE_ROUTE, decodePayload, encodePayload } from './urlState'
import { defaultValues } from './values'
import { getManifest } from './registry'
import type { PropValues } from './types'

/**
 * Compose mode in the URL hash.
 *
 * Same bargain as the single-component hash: a reload keeps your page, and a
 * configuration is a link. Only differences from each component's manifest
 * defaults are stored — a page of untouched components encodes as little more
 * than its layout, which matters when a scene holds a dozen blocks.
 */

interface EncodedBlock {
  /** Component name. */
  c: string
  span: number
  /** Omitted when 1, which is the overwhelmingly common case. */
  rows?: number
  /** Omitted when true. */
  fit?: boolean
  props?: Record<string, unknown>
  children?: string
  slots?: Record<string, { props?: Record<string, unknown>; children?: string }>
}

interface EncodedComposition {
  scene: string
  page: PageSettings
  theme: Theme
  blocks: EncodedBlock[]
}

function diffProps(base: PropValues, live: PropValues): Record<string, unknown> {
  const diff: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(live)) {
    if (base[key] !== value) diff[key] = value
  }
  return diff
}

function encodeBlock(block: CompositionBlock): EncodedBlock {
  const manifest = getManifest(block.component)
  const encoded: EncodedBlock = { c: block.component, span: block.span }

  if (block.rowSpan > 1) encoded.rows = block.rowSpan
  if (!block.fit) encoded.fit = false
  if (!manifest) return encoded

  const base = defaultValues(manifest)

  const props = diffProps(base.props, block.values.props)
  if (Object.keys(props).length > 0) encoded.props = props

  if (block.values.children !== base.children) {
    encoded.children = block.values.children
  }

  const slots: NonNullable<EncodedBlock['slots']> = {}
  for (const [name, slot] of Object.entries(block.values.slots)) {
    const baseSlot = base.slots[name]
    if (!baseSlot) continue

    const entry: { props?: Record<string, unknown>; children?: string } = {}
    const slotProps = diffProps(baseSlot.props, slot.props)
    if (Object.keys(slotProps).length > 0) entry.props = slotProps
    if (slot.children !== baseSlot.children) entry.children = slot.children
    if (Object.keys(entry).length > 0) slots[name] = entry
  }
  if (Object.keys(slots).length > 0) encoded.slots = slots

  return encoded
}

export function writeComposeUrl(composition: Composition, theme: Theme): void {
  const payload: EncodedComposition = {
    scene: composition.name,
    page: composition.page,
    theme,
    blocks: composition.blocks.map(encodeBlock),
  }

  const hash = `#${COMPOSE_ROUTE}/${encodePayload(payload)}`
  if (window.location.hash === hash) return
  // replaceState, so dragging a density slider doesn't fill the back button.
  window.history.replaceState(null, '', hash)
}

/**
 * Rebuilds a block from its encoded form.
 *
 * Every stored key is checked against the manifest as it stands now, and type
 * mismatches are dropped, so a link made before a component's props changed
 * degrades to that component's current defaults rather than injecting values it
 * can no longer render.
 */
function decodeBlock(encoded: EncodedBlock): CompositionBlock | null {
  const manifest = getManifest(encoded.c)
  if (!manifest) {
    console.warn(`[compose] link refers to unregistered component "${encoded.c}".`)
    return null
  }

  const values = defaultValues(manifest)

  for (const control of manifest.props) {
    const value = encoded.props?.[control.name]
    if (typeof value === typeof control.default) {
      values.props[control.name] = value as never
    }
  }
  if (typeof encoded.children === 'string') values.children = encoded.children

  for (const slot of manifest.slots ?? []) {
    const stored = encoded.slots?.[slot.name]
    const target = values.slots[slot.name]
    if (!stored || !target) continue

    for (const [key, value] of Object.entries(stored.props ?? {})) {
      if (key in target.props && typeof value === typeof target.props[key]) {
        target.props[key] = value as never
      }
    }
    if (typeof stored.children === 'string') target.children = stored.children
  }

  return {
    id: blockId(),
    component: encoded.c,
    values,
    span: Math.min(12, Math.max(1, Number(encoded.span) || 12)),
    rowSpan: Math.max(1, Number(encoded.rows) || 1),
    fit: encoded.fit !== false,
  }
}

/** Fills in anything a stored theme is missing, so an older link still loads. */
function reviveTheme(stored: unknown, page: string): Theme {
  const fallback = defaultTheme()
  if (!stored || typeof stored !== 'object') return fallback

  const candidate = stored as Partial<Theme>
  const tokens = { ...fallback.tokens }
  const enabled = { ...fallback.enabled }

  // `density` drove padding and gap together before they were separated. A link
  // made then still means something exact, so it is read rather than dropped.
  const legacy = (candidate.tokens as Record<string, unknown> | undefined)?.density
  if (typeof legacy === 'number') {
    tokens.padding = legacy
    tokens.gap = legacy
  }

  for (const key of Object.keys(fallback.tokens) as ThemeTokenName[]) {
    const value = candidate.tokens?.[key]
    if (typeof value === typeof fallback.tokens[key]) {
      tokens[key] = value as never
    }
  }

  // Walked separately from the tokens: `gradientAngle` has a value but no
  // switch of its own, so the two maps are no longer keyed the same.
  for (const key of Object.keys(fallback.enabled) as ToggleToken[]) {
    const flag = candidate.enabled?.[key]
    if (typeof flag === 'boolean') enabled[key] = flag
  }

  // A link made before the variants existed carries one set of colors. Which
  // variant it *is* can be read off the surface, and the other one derived, so
  // an old link opens with a working toggle rather than a broken one.
  const mode: ThemeMode =
    candidate.mode === 'dark' || candidate.mode === 'light'
      ? candidate.mode
      : lightnessOf(tokens.surface) < 0.5
        ? 'dark'
        : 'light'

  const derived = deriveColors({ ...tokens, page } as ThemeColors, other(mode))
  const saved = candidate.alternate
  const alternate: ThemeColors =
    saved && typeof saved === 'object' && typeof saved.surface === 'string'
      ? { ...derived, ...saved }
      : derived

  return { tokens, enabled, mode, alternate }
}

function other(mode: ThemeMode): ThemeMode {
  return mode === 'light' ? 'dark' : 'light'
}

export interface ParsedComposeUrl {
  composition: Composition
  theme: Theme
}

/** Null when the hash is not a compose hash, or cannot be read. */
export function readComposeUrl(): ParsedComposeUrl | null {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw.startsWith(COMPOSE_ROUTE)) return null

  const encoded = raw.slice(COMPOSE_ROUTE.length).replace(/^\//, '')
  if (!encoded) return null

  const payload = decodePayload<EncodedComposition>(encoded)
  if (!payload || !Array.isArray(payload.blocks)) return null

  const blocks = payload.blocks
    .map(decodeBlock)
    .filter((block): block is CompositionBlock => block !== null)

  const page: PageSettings = { ...DEFAULT_PAGE, ...(payload.page ?? {}) }

  return {
    composition: {
      name: typeof payload.scene === 'string' ? payload.scene : 'Custom',
      page,
      blocks,
    },
    theme: reviveTheme(payload.theme, page.background),
  }
}
