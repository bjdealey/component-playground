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
  const b = traceCorner(buildCornerGrid(radius, ps), ps)
  return b.length ? b : [{ x: 0, y: 0 }]
}

/** Build a `polygon(...)` clip-path for a box whose corners are staircased.
 *  The four corners reuse the top-left boundary, mirrored/reversed so the
 *  perimeter runs clockwise. Returns 'none' when there is nothing to round. */
export function staircasePolygon(
  width: number,
  height: number,
  radii: Radii,
  pixelSize: number,
): string {
  const ps = sanitize(pixelSize)
  const { topLeft, topRight, bottomRight, bottomLeft } = radii
  if (!topLeft && !topRight && !bottomRight && !bottomLeft) return 'none'

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

  return `polygon(${points.map((p) => `${p.x}px ${p.y}px`).join(', ')})`
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

/** Snap a radius to the pixel grid so steps line up, clamped like CSS does. */
function snapRadius(r: number, ps: number, w: number, h: number): number {
  if (r <= 0) return 0
  return Math.min(Math.max(ps, Math.round(r / ps) * ps), Math.min(w, h) / 2)
}

export interface Applied {
  el: HTMLElement
  clip: string
  radius: string
}

/** Walk `root`'s subtree and staircase every rounded box. Reads first, writes
 *  second (no layout thrash). Returns what to hand back to restorePixelArt. */
export function pixelateSubtree(root: HTMLElement, pixelSize: number): Applied[] {
  const ps = sanitize(pixelSize)
  const all: HTMLElement[] = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))]

  const jobs: { el: HTMLElement; clip: string }[] = []
  for (const el of all) {
    if (!(el instanceof HTMLElement)) continue // skips SVG internals etc.
    const w = el.offsetWidth
    const h = el.offsetHeight
    if (!w || !h) continue
    const cs = getComputedStyle(el)
    const radii: Radii = {
      topLeft: snapRadius(resolveRadius(cs.borderTopLeftRadius, w, h), ps, w, h),
      topRight: snapRadius(resolveRadius(cs.borderTopRightRadius, w, h), ps, w, h),
      bottomRight: snapRadius(resolveRadius(cs.borderBottomRightRadius, w, h), ps, w, h),
      bottomLeft: snapRadius(resolveRadius(cs.borderBottomLeftRadius, w, h), ps, w, h),
    }
    if (!radii.topLeft && !radii.topRight && !radii.bottomRight && !radii.bottomLeft) continue
    const clip = staircasePolygon(w, h, radii, ps)
    if (clip === 'none') continue
    jobs.push({ el, clip })
  }

  const applied: Applied[] = []
  for (const { el, clip } of jobs) {
    applied.push({ el, clip: el.style.clipPath, radius: el.style.borderRadius })
    el.style.clipPath = clip
    el.style.borderRadius = '0' // the clip owns the corner shape now
  }
  return applied
}

/** Undo pixelateSubtree, restoring each element's original inline values. */
export function restorePixelArt(applied: Applied[]): void {
  for (const { el, clip, radius } of applied) {
    el.style.clipPath = clip
    el.style.borderRadius = radius
  }
}
