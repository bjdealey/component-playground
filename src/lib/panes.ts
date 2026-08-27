import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Resizable panes.
 *
 * The layout has always been three fixed numbers — a 344px controls column, a
 * 168px code window, a theme panel capped at 58% — and every one of them is a
 * guess about what you are doing. Reading a generated page wants a tall code
 * window; nudging a slider and watching the canvas wants a short one. The
 * numbers are still the defaults, they are just no longer the only option.
 *
 * Sizes live in `localStorage` rather than the URL hash. The hash is the
 * composition and the theme — the thing you share — and a link that also
 * dragged the recipient's panels around would be overstepping.
 */

export type PaneAxis = 'x' | 'y'

export interface PaneOptions {
  /** Size in px before anyone has dragged it. */
  initial: number
  min: number
  /** A function when the ceiling depends on the window. */
  max: number | (() => number)
  /**
   * Whether dragging along the axis grows the pane.
   *
   * A panel docked to the right or the bottom grows as the handle moves *back*
   * along its axis, so it is -1. One docked to the top grows as the handle
   * moves forward, so it is 1.
   */
  direction: 1 | -1
  axis: PaneAxis
}

const PREFIX = 'playground:pane:'

/** Storage is allowed to be unavailable — private windows, and disabled by policy. */
function read(key: string): number | null {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw === null) return null
    const value = Number(raw)
    return Number.isFinite(value) ? value : null
  } catch {
    return null
  }
}

function write(key: string, value: number): void {
  try {
    window.localStorage.setItem(PREFIX + key, String(value))
  } catch {
    // A pane that forgets its size is a far smaller problem than one that
    // throws on every drag.
  }
}

function clear(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    // As above.
  }
}

export interface Pane {
  size: number
  /** True once this pane has been sized by hand, so defaults can still adapt. */
  custom: boolean
  axis: PaneAxis
  dragging: boolean
  /** Spread onto the Splitter. */
  handleProps: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void
    onDoubleClick: () => void
    'aria-valuenow': number
    'aria-valuemin': number
    'aria-valuemax': number
  }
}

const STEP = 16
const COARSE_STEP = 48

/**
 * Keeps a size in range, floor winning over ceiling.
 *
 * A window small enough to push the ceiling under the floor would otherwise
 * invert the range and pin the pane at a size it can never be dragged out of.
 */
export function clampSize(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, max), Math.max(min, value))
}

/**
 * Where a drag lands.
 *
 * `direction` is what makes one handle feel like every other: the controls
 * column is docked right, so dragging left has to *widen* it, while the theme
 * panel is docked top and grows the way the pointer moves.
 */
export function dragTo(
  startSize: number,
  delta: number,
  direction: 1 | -1,
  min: number,
  max: number,
): number {
  return clampSize(startSize + delta * direction, min, max)
}

export function usePane(key: string, options: PaneOptions): Pane {
  const { initial, min, direction, axis } = options

  const [size, setSize] = useState(() => read(key) ?? initial)
  const [custom, setCustom] = useState(() => read(key) !== null)
  const [dragging, setDragging] = useState(false)

  // Held in a ref so the pointer-move closure and the resize listener always
  // see the live values rather than the ones captured when the drag started.
  const latest = useRef(options)
  latest.current = options

  const resolveMax = useCallback(() => {
    const { max } = latest.current
    return typeof max === 'function' ? max() : max
  }, [])

  const clamp = useCallback(
    (value: number) => clampSize(value, latest.current.min, resolveMax()),
    [resolveMax],
  )

  /**
   * The cursor and the selection block belong to the document, not the handle.
   *
   * The grab area is seven pixels and a drag routinely runs well outside it —
   * without this the cursor flickers back to an arrow the moment you move with
   * any speed, and the pointer sweeping across the canvas selects every label
   * it crosses. Pointer capture keeps the *events* coming; this is what makes
   * it look like a drag while they do.
   */
  useEffect(() => {
    if (!dragging) return

    const { cursor, userSelect } = document.body.style
    document.body.style.cursor = axis === 'x' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'

    return () => {
      document.body.style.cursor = cursor
      document.body.style.userSelect = userSelect
    }
  }, [axis, dragging])

  // A window narrow enough to invalidate a stored size would otherwise leave a
  // pane wider than the screen with no way back to it.
  useEffect(() => {
    function onResize() {
      setSize((current) => clamp(current))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clamp])

  const commit = useCallback(
    (value: number) => {
      setSize(value)
      setCustom(true)
      write(key, value)
    },
    [key],
  )

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return
      // Stops the drag from selecting the text either side of the handle.
      event.preventDefault()

      const node = event.currentTarget
      const from = axis === 'x' ? event.clientX : event.clientY
      const startSize = size
      node.setPointerCapture(event.pointerId)
      setDragging(true)

      let live = startSize

      const move = (moveEvent: PointerEvent) => {
        const now = axis === 'x' ? moveEvent.clientX : moveEvent.clientY
        live = dragTo(startSize, now - from, direction, latest.current.min, resolveMax())
        setSize(live)
      }

      const finish = () => {
        node.removeEventListener('pointermove', move)
        node.removeEventListener('pointerup', finish)
        node.removeEventListener('pointercancel', finish)
        setDragging(false)
        setCustom(true)
        write(key, live)
      }

      node.addEventListener('pointermove', move)
      node.addEventListener('pointerup', finish)
      node.addEventListener('pointercancel', finish)
    },
    [axis, clamp, direction, key, size],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const back = axis === 'x' ? 'ArrowLeft' : 'ArrowUp'
      const forward = axis === 'x' ? 'ArrowRight' : 'ArrowDown'
      const step = event.shiftKey ? COARSE_STEP : STEP

      let next: number | null = null
      if (event.key === back) next = size - step * direction
      else if (event.key === forward) next = size + step * direction
      // Home and End are the extremes of the *pane*, not of the axis — the
      // direction is already accounted for in which key grows it.
      else if (event.key === 'Home') next = min
      else if (event.key === 'End') next = resolveMax()
      if (next === null) return

      event.preventDefault()
      commit(clamp(next))
    },
    [axis, clamp, commit, direction, min, resolveMax, size],
  )

  const onDoubleClick = useCallback(() => {
    setSize(clamp(initial))
    setCustom(false)
    clear(key)
  }, [clamp, initial, key])

  return {
    size,
    custom,
    axis,
    dragging,
    handleProps: {
      onPointerDown,
      onKeyDown,
      onDoubleClick,
      'aria-valuenow': Math.round(size),
      'aria-valuemin': min,
      'aria-valuemax': Math.round(resolveMax()),
    },
  }
}

/** The visible thickness of a splitter, shared by the CSS and the grid maths. */
export const SPLITTER = 7
