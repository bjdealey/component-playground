import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ComponentManifest, ControlValue, PlaygroundValues } from '../lib/types'
import { pixelateSubtree, restorePixelArt, type Applied } from '../lib/pixelate'
import { applyEffects, restoreEffects, hasEffects, type AppliedEffects } from '../lib/effects'
import PreviewBoundary from './PreviewBoundary'
import ComponentRender, { type EventReporter } from './ComponentRender'
import styles from './PreviewStage.module.css'

export type StageTheme = 'light' | 'dark'

interface PreviewStageProps {
  manifest: ComponentManifest
  values: PlaygroundValues
  /** Light/dark for the stage backdrop — driven by the site-wide header toggle. */
  theme: StageTheme
  onPropChange: (name: string, value: ControlValue) => void
  /** Called whenever a handler the playground supplied actually fires. */
  onEvent: EventReporter
}

const PIXEL_KEY = 'playground:pixel'

// The slider reads like a display resolution: higher = more pixels = finer. The
// shown number (PIXEL_RES) climbs 4→64; the actual grid cell (PIXEL_PX) is its
// inverse — 64px blocks (blockiest) down to 4px (near-original) — so dragging
// right adds detail. res × cell ≈ 256. Index 0 is off and never read.
const PIXEL_RES = [0, 4, 8, 16, 32, 64]
const PIXEL_PX = [0, 64, 32, 16, 8, 4]
const PIXEL_MAX = PIXEL_PX.length - 1

/** A local preference, like the panes — remembered, never shared in the hash. */
function readPixel(): number {
  try {
    const raw = Number(window.localStorage.getItem(PIXEL_KEY))
    return Number.isFinite(raw) ? Math.min(PIXEL_MAX, Math.max(0, Math.round(raw))) : 0
  } catch {
    return 0
  }
}

export default function PreviewStage({
  manifest,
  values,
  theme,
  onPropChange,
  onEvent,
}: PreviewStageProps) {
  // `values` already has the global design folded in (App passes the resolved
  // values), so this stage just renders and instruments what it is given.

  // Same reasoning as the controls panel: a new component starts at the top of
  // the stage rather than inheriting the previous one's scroll offset.
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (stageRef.current) stageRef.current.scrollTop = 0
  }, [manifest.name])

  // Pixel-art mode: a bitmap font plus per-element staircase clip-paths that
  // step each rounded corner onto the pixel grid (see lib/pixelate, the
  // react-pixel-ui technique). Every edit — colour, size, border, layout —
  // survives; only the corners change, and the clips are static so nothing
  // recomputes per frame. Zero is off.
  const [pixel, setPixel] = useState(readPixel)
  useEffect(() => {
    try {
      window.localStorage.setItem(PIXEL_KEY, String(pixel))
    } catch {
      // A forgotten preference is a smaller problem than a throw on every drag.
    }
  }, [pixel])

  // Re-walk the preview subtree whenever the component, its props, the theme, or
  // the intensity change — every path that swaps DOM under us. A ResizeObserver
  // catches width changes (splitter, 100%-wide components) since the clip
  // polygon is sized in px. All work is one-shot per change, never per frame.
  const canvasRef = useRef<HTMLDivElement>(null)
  const appliedRef = useRef<Applied[]>([])
  useLayoutEffect(() => {
    const root = canvasRef.current
    if (!root || pixel === 0) return
    const px = PIXEL_PX[pixel]
    let raf = 0
    const apply = () => {
      restorePixelArt(appliedRef.current, root)
      appliedRef.current = pixelateSubtree(root, px)
    }
    apply()
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    })
    observer.observe(root)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      restorePixelArt(appliedRef.current, root)
      appliedRef.current = []
    }
  }, [pixel, manifest.name, values, theme])

  // Component-level effects (shadow / highlight / gradient) applied to the
  // rendered root — the first element the boundary renders. Runs after the pixel
  // effect so, in pixel mode, the overlay is a child of the already-clipped root
  // and the shadow follows the stepped silhouette. `pixel` is a dep so it
  // re-applies when the root's clip/overlay structure changes underneath it.
  const fxRef = useRef<AppliedEffects | null>(null)
  useLayoutEffect(() => {
    restoreEffects(fxRef.current)
    fxRef.current = null
    const root = canvasRef.current?.firstElementChild
    if (!(root instanceof HTMLElement) || !values.effects || !hasEffects(values.effects)) return
    fxRef.current = applyEffects(root, values.effects)
    return () => {
      restoreEffects(fxRef.current)
      fxRef.current = null
    }
  }, [values, manifest.name, theme, pixel])

  return (
    <section className={styles.wrapper} aria-label="Preview">
      <div className={styles.toolbar}>
        <span className={styles.label}>Preview</span>

        <div className={styles.tools}>
          <label className={styles.pixelate} title="Pixel-art resolution — higher is finer">
            <svg className={styles.pixelIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
            </svg>
            <input
              type="range"
              className={styles.pixelRange}
              min={0}
              max={PIXEL_MAX}
              step={1}
              value={pixel}
              aria-label="Pixel-art resolution"
              onChange={(event) => setPixel(Number(event.target.value))}
            />
            <span className={styles.pixelValue}>{pixel === 0 ? 'Off' : PIXEL_RES[pixel]}</span>
          </label>
        </div>
      </div>

      <div className={styles.stage} data-theme={theme} ref={stageRef}>
        <div ref={canvasRef} className={`${styles.canvas} ${pixel > 0 ? styles.pixelArt : ''}`}>
          <PreviewBoundary resetKey={manifest.name} retryOn={values}>
            <ComponentRender
              manifest={manifest}
              values={values}
              onEvent={onEvent}
              onPropChange={onPropChange}
            />
          </PreviewBoundary>
        </div>
      </div>
    </section>
  )
}
