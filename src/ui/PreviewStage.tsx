import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ComponentManifest, ControlValue, PlaygroundValues } from '../lib/types'
import { pixelateSubtree, restorePixelArt, type Applied } from '../lib/pixelate'
import PreviewBoundary from './PreviewBoundary'
import ComponentRender, { type EventReporter } from './ComponentRender'
import styles from './PreviewStage.module.css'

export type StageTheme = 'light' | 'dark'

interface PreviewStageProps {
  manifest: ComponentManifest
  values: PlaygroundValues
  theme: StageTheme
  onThemeChange: (theme: StageTheme) => void
  onPropChange: (name: string, value: ControlValue) => void
  /** Called whenever a handler the playground supplied actually fires. */
  onEvent: EventReporter
}

const THEMES: StageTheme[] = ['light', 'dark']

const PIXEL_KEY = 'playground:pixel'
const PIXEL_MAX = 4

// Slider notch → pixel-grid size in CSS px. Bigger = chunkier steps. Index 0 is
// off and never read. react-pixel-ui defaults to 4; this spans fine to coarse.
const PIXEL_PX = [0, 3, 5, 8, 12]

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
  onThemeChange,
  onPropChange,
  onEvent,
}: PreviewStageProps) {
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
      restorePixelArt(appliedRef.current)
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
      restorePixelArt(appliedRef.current)
      appliedRef.current = []
    }
  }, [pixel, manifest.name, values, theme])

  return (
    <section className={styles.wrapper} aria-label="Preview">
      <div className={styles.toolbar}>
        <span className={styles.label}>Preview</span>

        <div className={styles.tools}>
          <label className={styles.pixelate} title="Pixel-art mode — drag to intensify">
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
              aria-label="Pixel-art intensity"
              onChange={(event) => setPixel(Number(event.target.value))}
            />
            <span className={styles.pixelValue}>{pixel === 0 ? 'Off' : pixel}</span>
          </label>

          <div className={styles.themeToggle} role="group" aria-label="Stage background">
            {THEMES.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.themeButton} ${theme === option ? styles.themeActive : ''}`}
                aria-pressed={theme === option}
                onClick={() => onThemeChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
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
