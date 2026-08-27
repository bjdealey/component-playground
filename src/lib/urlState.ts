import type { ComponentManifest, PlaygroundValues } from './types'
import { defaultValues } from './values'

/**
 * The selected component and any edits, kept in the URL hash.
 *
 * Two things fall out of that: a reload doesn't lose your work, and a
 * configuration is a link you can send someone. Only differences from the
 * manifest defaults are stored, so a fresh component leaves a clean `#/Button`.
 */
/** Hash prefix that means "compose mode", not a component name. */
export const COMPOSE_ROUTE = 'compose'

interface Encoded {
  props?: Record<string, unknown>
  children?: string
  slots?: Record<string, { props?: Record<string, unknown>; children?: string }>
}

/** URL-safe base64 of any JSON payload. Shared with the compose-mode hash. */
export function encodePayload(payload: unknown): string {
  // encodeURIComponent first so non-ASCII (the glyph defaults) survives btoa.
  return btoa(encodeURIComponent(JSON.stringify(payload)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function decodePayload<T>(encoded: string): T | null {
  try {
    const padded = encoded.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(atob(padded))) as T
  } catch {
    return null
  }
}

/** Only what differs from the defaults, so tidy states give tidy URLs. */
function diff(
  manifest: ComponentManifest,
  values: PlaygroundValues,
): Encoded | null {
  const base = defaultValues(manifest)
  const payload: Encoded = {}

  const props: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values.props)) {
    if (base.props[key] !== value) props[key] = value
  }
  if (Object.keys(props).length > 0) payload.props = props

  if (values.children !== base.children) payload.children = values.children

  const slots: NonNullable<Encoded['slots']> = {}
  for (const [slotName, slot] of Object.entries(values.slots)) {
    const baseSlot = base.slots[slotName]
    if (!baseSlot) continue

    const slotProps: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(slot.props)) {
      if (baseSlot.props[key] !== value) slotProps[key] = value
    }

    const entry: { props?: Record<string, unknown>; children?: string } = {}
    if (Object.keys(slotProps).length > 0) entry.props = slotProps
    if (slot.children !== baseSlot.children) entry.children = slot.children
    if (Object.keys(entry).length > 0) slots[slotName] = entry
  }
  if (Object.keys(slots).length > 0) payload.slots = slots

  return Object.keys(payload).length > 0 ? payload : null
}

export function writeUrl(
  manifest: ComponentManifest,
  values: PlaygroundValues,
): void {
  const payload = diff(manifest, values)
  const hash = payload
    ? `#/${manifest.name}/${encodePayload(payload)}`
    : `#/${manifest.name}`

  if (window.location.hash === hash) return
  // replaceState, so tweaking a slider doesn't fill the back button with history.
  window.history.replaceState(null, '', hash)
}

export interface ParsedUrl {
  name: string
  apply: (manifest: ComponentManifest) => PlaygroundValues
}

/**
 * Reads the hash. Returns null for an empty or unusable one — including a
 * compose-mode hash, which is a different route with its own reader and would
 * otherwise be mistaken for a component named "compose".
 */
export function readUrl(): ParsedUrl | null {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw || raw.startsWith(COMPOSE_ROUTE)) return null

  const [name, encoded] = raw.split('/')
  if (!name) return null

  return {
    name: decodeURIComponent(name),
    apply(manifest) {
      const values = defaultValues(manifest)
      const payload = encoded ? decodePayload<Encoded>(encoded) : null
      if (!payload) return values

      // Only keys the manifest still declares are applied, so a stale link
      // degrades to defaults instead of injecting props that no longer exist.
      for (const control of manifest.props) {
        const value = payload.props?.[control.name]
        if (typeof value === typeof control.default) {
          values.props[control.name] = value as never
        }
      }
      if (typeof payload.children === 'string') values.children = payload.children

      for (const slot of manifest.slots ?? []) {
        const stored = payload.slots?.[slot.name]
        const target = values.slots[slot.name]
        if (!stored || !target) continue

        for (const [key, value] of Object.entries(stored.props ?? {})) {
          if (key in target.props && typeof value === typeof target.props[key]) {
            target.props[key] = value as never
          }
        }
        if (typeof stored.children === 'string') target.children = stored.children
      }

      return values
    },
  }
}
