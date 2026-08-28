// Pixel-art corner stepping — technique ported from todari/react-pixel-ui (MIT).
//
// The earlier approach laid one SVG mosaic filter over the whole preview, which
// re-ran on every repaint (slow) and squared corners off. react-pixel-ui does
// something smarter and cheaper: it reads each element's *real* border-radius
// and swaps it for a `clip-path` polygon whose corners are a pixel-grid
// staircase. The curve stair-steps into pixels, every other edit (colour, size,
// border, layout) is untouched, and because it's a static clip there is nothing
// to recompute frame to frame.
//
// We keep react-pixel-ui's staircase geometry verbatim and adapt only the
// application: instead of one ref'd element, we walk the preview subtree and
// step every rounded box we find. Pixel-gradient PNGs and hard shadows (the
// library's other two tricks, both needing a canvas/parser) are intentionally
// left out — the corners are the headline.

interface Point {
  x: number
  y: number
}

export interface Radii {
  topLeft: number
  topRight: number
  bottomRight: number
  bottomLeft: number
}

function sanitize(pixelSize: number): number {
  return Math.max(1, Math.floor(pixelSize || 4))
}

/** A quarter-circle rasterised onto the pixel grid: cell is on if its centre
 *  falls inside the circle of `radius` centred at (radius, radius). */
function buildCornerGrid(radius: number, ps: number): boolean[][] {
  const n = Math.ceil(radius / ps)
  const grid: boolean[][] = []
  for (let row = 0; row < n; row++) {
    grid[row] = []
    for (let col = 0; col < n; col++) {
      const dx = col * ps + ps / 2 - radius
      const dy = row * ps + ps / 2 - radius
      grid[row][col] = dx * dx + dy * dy <= radius * radius
    }
  }
  return grid
}

/** Trace the top-left corner's staircase, from the top edge down to the left
 *  edge, following the on/off boundary of the rasterised quarter-circle. */
function traceCorner(grid: boolean[][], ps: number): Point[] {
  const n = grid.length
  if (n === 0) return []
  const points: Point[] = []
  let prevX = -1
  for (let row = 0; row < n; row++) {
    let col = -1
    for (let c = 0; c < n; c++) {
      if (grid[row][c]) {
        col = c
        break
      }
    }
    if (col === -1) continue
    const x = col * ps
    const y = row * ps
    if (x !== prevX) {
      if (prevX !== -1) points.push({ x: prevX, y }) // horizontal tread
      points.push({ x, y }) // vertical riser
      prevX = x
    }
  }
  if (prevX > 0) {
    const lastY = n * ps
    points.push({ x: prevX, y: lastY })
    points.push({ x: 0, y: lastY })
  } else if (prevX === 0) {
    points.push({ x: 0, y: n * ps })
  }
  return points
}

function cornerBoundary(radius: number, ps: number): Point[] {
  if (radius <= 0) return []
  // Choose a whole number of even steps — about one per pixel cell (finer at
  // high resolution), but never fewer than two so a corner always reads as
  // rounded rather than a single hard chamfer. Sizing the cell to radius / steps
  // lands the staircase exactly on the radius: no overshoot past the corner (which
  // could overlap on a short element), and no ballooning of the real value.
  const steps = Math.max(2, Math.round(radius / ps))
  const cell = radius / steps
  const b = traceCorner(buildCornerGrid(radius, cell), cell)
  return b.length ? b : [{ x: 0, y: 0 }]
}

/** The staircased perimeter of a box as points, clockwise. The four corners
 *  reuse the top-left boundary, mirrored/reversed. Empty when nothing rounds. */
function staircasePoints(width: number, height: number, radii: Radii, ps: number): Point[] {
  const { topLeft, topRight, bottomRight, bottomLeft } = radii
  if (!topLeft && !topRight && !bottomRight && !bottomLeft) return []

  const points: Point[] = []

  if (topLeft > 0) points.push(...[...cornerBoundary(topLeft, ps)].reverse())
  else points.push({ x: 0, y: 0 })

  if (topRight > 0)
    points.push(...cornerBoundary(topRight, ps).map((p) => ({ x: width - p.x, y: p.y })))
  else points.push({ x: width, y: 0 })

  if (bottomRight > 0)
    points.push(
      ...[...cornerBoundary(bottomRight, ps)]
        .reverse()
        .map((p) => ({ x: width - p.x, y: height - p.y })),
    )
  else points.push({ x: width, y: height })

  if (bottomLeft > 0)
    points.push(...cornerBoundary(bottomLeft, ps).map((p) => ({ x: p.x, y: height - p.y })))
  else points.push({ x: 0, y: height })

  return points
}

/** Build a `polygon(...)` clip-path for a box whose corners are staircased.
 *  Returns 'none' when there is nothing to round. */
export function staircasePolygon(
  width: number,
  height: number,
  radii: Radii,
  pixelSize: number,
): string {
  const points = staircasePoints(width, height, radii, sanitize(pixelSize))
  if (!points.length) return 'none'
  return `polygon(${points.map((p) => `${p.x}px ${p.y}px`).join(', ')})`
}

function toPath(points: Point[]): string {
  return `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`
}

/** A `path(evenodd, …)` clip that fills the ring between the outer staircase and
 *  an inner one inset by `bw` — i.e. a border of width `bw` that follows the
 *  stepped corners exactly. A plain CSS border can't: with the radius zeroed for
 *  the steps, it draws square corners that the outer clip then slices off. Used
 *  for the overlay that redraws the border in pixel mode. */
export function staircaseRingPath(
  width: number,
  height: number,
  radii: Radii,
  bw: number,
  pixelSize: number,
): string {
  const ps = sanitize(pixelSize)
  const outer = staircasePoints(width, height, radii, ps)
  if (!outer.length) return 'none'

  const iw = width - 2 * bw
  const ih = height - 2 * bw
  // Border thicker than the box leaves no hole — a solid stepped shape.
  if (iw <= 0 || ih <= 0) return `path("${toPath(outer)}")`

  const innerRadii: Radii = {
    topLeft: Math.max(0, radii.topLeft - bw),
    topRight: Math.max(0, radii.topRight - bw),
    bottomRight: Math.max(0, radii.bottomRight - bw),
    bottomLeft: Math.max(0, radii.bottomLeft - bw),
  }
  const inner = staircasePoints(iw, ih, innerRadii, ps).map((p) => ({ x: p.x + bw, y: p.y + bw }))
  const hole = inner.length ? ` ${toPath(inner)}` : ''
  return `path(evenodd, "${toPath(outer)}${hole}")`
}

/** Resolve one computed border-*-radius longhand to a px number. Computed
 *  values are usually px, but `50%` stays a percentage (resolved against the
 *  box) and elliptical radii have two components — take the smaller. */
function resolveRadius(value: string, w: number, h: number): number {
  if (!value) return 0
  const parts = value.trim().split(/\s+/).slice(0, 2)
  const nums = parts.map((part, i) => {
    const n = parseFloat(part)
    if (!Number.isFinite(n)) return 0
    if (part.endsWith('%')) {
      const ref = parts.length === 1 ? Math.min(w, h) : i === 0 ? w : h
      return (n / 100) * ref
    }
    return n
  })
  return Math.max(0, Math.min(...nums))
}

/** Clamp a radius to the element like CSS (at most half the shorter side). We
 *  keep the real value rather than snapping it to the grid: the step size is
 *  chosen per corner (cornerBoundary), so a small radius stays its true size
 *  instead of ballooning up to a full cell or vanishing to a square. */
function clampRadius(r: number, w: number, h: number): number {
  if (r <= 0) return 0
  return Math.min(r, Math.min(w, h) / 2)
}

export interface Applied {
  el: HTMLElement
  clip: string
  /** Border-ring overlay we appended (bordered elements only). */
  overlay?: HTMLElement
  /** Inline position we set to anchor the overlay, to put back on restore. */
  prevPosition?: string
}

/** Class that zeroes CSS corner-rounding for display (see global.css). We toggle
 *  it rather than writing `border-radius` on each element, because a component's
 *  radius is an inline style React owns — writing over it, then restoring a
 *  stale value, froze the corner. Off while we measure, on for display. */
const STEP_CLASS = 'pixel-stepping'

/** Replaced/void elements render natively and ignore appended children, so they
 *  can't host the border-ring overlay. A bordered one is left alone (the CSS zero
 *  squares its corner and its own border matches) rather than clipped. */
const NO_CHILD = new Set([
  'INPUT', 'TEXTAREA', 'SELECT', 'IMG', 'VIDEO', 'CANVAS', 'IFRAME',
  'EMBED', 'OBJECT', 'HR', 'BR', 'WBR', 'PROGRESS', 'METER',
])

interface Job {
  el: HTMLElement
  clip: string
  /** Present when the element has a visible border to redraw as a stepped ring. */
  ring?: string
  borderColor?: string
  borderWidth?: number
  staticPos?: boolean
}

/** Walk `root`'s subtree and staircase every rounded box. Reads the real radii
 *  with the zeroing class off, applies clips, then switches display zeroing on.
 *  We only ever write `clip-path` and append our own overlay node (never a style
 *  React manages), so a live radius edit stays the source of truth. Returns what
 *  to hand to restorePixelArt. */
export function pixelateSubtree(root: HTMLElement, pixelSize: number): Applied[] {
  const ps = sanitize(pixelSize)
  // Reveal each element's true border-radius before measuring.
  root.classList.remove(STEP_CLASS)

  const all: HTMLElement[] = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))]
  const jobs: Job[] = []
  for (const el of all) {
    if (!(el instanceof HTMLElement)) continue // skips SVG internals etc.
    if (el.hasAttribute('data-pxl-overlay')) continue // our own border ring
    const w = el.offsetWidth
    const h = el.offsetHeight
    if (!w || !h) continue
    const cs = getComputedStyle(el)
    const radii: Radii = {
      topLeft: clampRadius(resolveRadius(cs.borderTopLeftRadius, w, h), w, h),
      topRight: clampRadius(resolveRadius(cs.borderTopRightRadius, w, h), w, h),
      bottomRight: clampRadius(resolveRadius(cs.borderBottomRightRadius, w, h), w, h),
      bottomLeft: clampRadius(resolveRadius(cs.borderBottomLeftRadius, w, h), w, h),
    }
    if (!radii.topLeft && !radii.topRight && !radii.bottomRight && !radii.bottomLeft) continue
    const clip = staircasePolygon(w, h, radii, ps)
    if (clip === 'none') continue

    const bw = parseFloat(cs.borderTopWidth) || 0
    const bc = cs.borderTopColor
    const borderVisible =
      bw > 0 && cs.borderTopStyle !== 'none' && !!bc && bc !== 'rgba(0, 0, 0, 0)' && bc !== 'transparent'

    // A bordered replaced element can't host the ring, and its clipped square
    // border would fragment — leave it to the CSS zero (square corner, own
    // border matches) rather than clip it.
    if (borderVisible && NO_CHILD.has(el.tagName)) continue

    const job: Job = { el, clip }
    // A visible border on a rounded box needs to follow the steps too — prep a
    // stepped ring to redraw it (a plain clipped CSS border breaks at corners).
    if (borderVisible) {
      const ring = staircaseRingPath(w, h, radii, bw, ps)
      if (ring !== 'none') {
        job.ring = ring
        job.borderColor = bc
        job.borderWidth = bw
        job.staticPos = cs.position === 'static'
      }
    }
    jobs.push(job)
  }

  const applied: Applied[] = []
  for (const job of jobs) {
    const { el, clip } = job
    const rec: Applied = { el, clip: el.style.clipPath }
    el.style.clipPath = clip

    if (job.ring) {
      // Anchor the overlay if the element isn't already a positioning context.
      if (job.staticPos) {
        rec.prevPosition = el.style.position
        el.style.position = 'relative'
      }
      const overlay = document.createElement('div')
      overlay.setAttribute('data-pxl-overlay', '')
      // inset by -bw so the overlay covers the border box, not the padding box.
      overlay.style.cssText =
        `position:absolute;inset:${-job.borderWidth!}px;background:${job.borderColor};` +
        `clip-path:${job.ring};pointer-events:none;`
      el.appendChild(overlay)
      el.setAttribute('data-pxl-border', '') // CSS hides the real (broken) border
      rec.overlay = overlay
    }
    applied.push(rec)
  }

  // Now hide the CSS rounding so the staircase clip is the only corner shape.
  root.classList.add(STEP_CLASS)
  return applied
}

/** Undo pixelateSubtree: drop the clips and overlays, turn display zeroing off. */
export function restorePixelArt(applied: Applied[], root?: HTMLElement): void {
  for (const { el, clip, overlay, prevPosition } of applied) {
    el.style.clipPath = clip
    if (overlay) {
      overlay.remove()
      el.removeAttribute('data-pxl-border')
      if (prevPosition !== undefined) el.style.position = prevPosition
    }
  }
  root?.classList.remove(STEP_CLASS)
}
