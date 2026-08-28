import type { Control, PropValues } from './types'

/**
 * A component-level "Effects" layer — elevation shadow, top highlight, colour
 * gradient — offered on every component's controls without each one wiring up a
 * prop. The values live in `PlaygroundValues.effects` and are applied
 * post-render to the component's root element (see PreviewStage), the same way
 * pixel mode works: no wrapper, so no layout shift, and the shadow/overlay
 * follow the component's real shape (including the stepped one in pixel mode).
 * Because they're applied to the DOM rather than passed as props, they stay out
 * of the component and out of the generated JSX. Zero on each means off.
 */
export const EFFECT_CONTROLS: Control[] = [
  { name: 'shadow', kind: 'number', default: 0, min: 0, max: 5, step: 1, group: 'Effects' },
  { name: 'highlight', kind: 'number', default: 0, min: 0, max: 100, step: 1, group: 'Effects' },
  { name: 'gradient', kind: 'number', default: 0, min: 0, max: 100, step: 1, group: 'Effects' },
  { name: 'gradientColor', kind: 'color', default: '#4f46e5', group: 'Effects' },
  { name: 'gradientAngle', kind: 'number', default: 135, min: 0, max: 360, step: 5, group: 'Effects' },
]

export function effectDefaults(): PropValues {
  const out: PropValues = {}
  for (const control of EFFECT_CONTROLS) out[control.name] = control.default
  return out
}

const num = (e: PropValues, key: string, fallback = 0): number =>
  typeof e[key] === 'number' ? (e[key] as number) : fallback

/** True when any effect is turned up from its default — the applier's on switch. */
export function hasEffects(e: PropValues | undefined): boolean {
  if (!e) return false
  return num(e, 'shadow') > 0 || num(e, 'highlight') > 0 || num(e, 'gradient') > 0
}

/** #rgb / #rrggbb → rgba() at the given alpha. Falls back to a neutral tint. */
function rgba(hex: string, alpha: number): string {
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = Number.parseInt(h, 16)
  if (h.length !== 6 || Number.isNaN(n)) return `rgba(79, 70, 229, ${alpha})`
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/** Two-layer elevation shadow, tighter over softer, that follows the silhouette. */
function shadowFilter(level: number): string {
  if (level <= 0) return ''
  return (
    `drop-shadow(0 ${level}px ${level * 1.5}px rgba(15, 23, 42, ${0.05 + level * 0.02})) ` +
    `drop-shadow(0 ${level * 2}px ${level * 4}px rgba(15, 23, 42, ${0.04 + level * 0.03}))`
  )
}

export interface AppliedEffects {
  root: HTMLElement
  prevFilter: string
  prevPosition: string
  overlay: HTMLElement | null
}

/**
 * Apply the effects to a component's root element. Shadow goes on the root as a
 * composed `filter`; highlight and gradient go on an overlay layered over the
 * component, matching its rounded corners (or, in pixel mode, clipped to the
 * stepped shape as a child of the clipped root). Returns what restoreEffects needs.
 */
export function applyEffects(root: HTMLElement, e: PropValues): AppliedEffects {
  const shadow = num(e, 'shadow')
  const highlight = num(e, 'highlight')
  const gradient = num(e, 'gradient')
  const color =
    typeof e.gradientColor === 'string' && e.gradientColor ? e.gradientColor : '#4f46e5'
  const angle = num(e, 'gradientAngle', 135)

  const rec: AppliedEffects = {
    root,
    prevFilter: root.style.filter,
    prevPosition: root.style.position,
    overlay: null,
  }

  // Shadow — compose with any existing inline filter rather than drop it.
  const filter = shadowFilter(shadow)
  if (filter) {
    const prev = rec.prevFilter && rec.prevFilter !== 'none' ? `${rec.prevFilter} ` : ''
    root.style.filter = prev + filter
  }

  // Highlight + gradient — one overlay over the component. A gradient tint plus
  // a top sheen; the overlay matches the root's corners so it never overhangs.
  const layers: string[] = []
  if (gradient > 0) {
    layers.push(`linear-gradient(${angle}deg, ${rgba(color, (gradient / 100) * 0.85)}, transparent)`)
  }
  if (highlight > 0) {
    layers.push(
      `linear-gradient(180deg, rgba(255, 255, 255, ${(highlight / 100) * 0.6}) 0%, rgba(255, 255, 255, 0) 48%)`,
    )
  }
  if (layers.length) {
    if (getComputedStyle(root).position === 'static') root.style.position = 'relative'
    const radius = getComputedStyle(root).borderRadius
    const overlay = document.createElement('div')
    overlay.setAttribute('data-fx-overlay', '')
    overlay.style.cssText =
      `position:absolute;inset:0;pointer-events:none;border-radius:${radius};` +
      `background:${layers.join(', ')};`
    root.appendChild(overlay)
    rec.overlay = overlay
  }

  return rec
}

/** Undo applyEffects: drop the overlay and put the root's filter/position back. */
export function restoreEffects(rec: AppliedEffects | null): void {
  if (!rec) return
  rec.overlay?.remove()
  rec.root.style.filter = rec.prevFilter
  rec.root.style.position = rec.prevPosition
}
