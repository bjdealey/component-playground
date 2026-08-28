import { useEffect, useRef, useState } from 'react'
import type { ComponentManifest, ControlValue, PlaygroundValues } from '../lib/types'
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

  // Pixel-art mode: a bitmap font plus a crisp mosaic laid over the *real*
  // component — its rounded corners and every other edit are kept, just rendered
  // as pixels, so a curve stair-steps rather than squaring off. Zero is off.
  const [pixel, setPixel] = useState(readPixel)
  useEffect(() => {
    try {
      window.localStorage.setItem(PIXEL_KEY, String(pixel))
    } catch {
      // A forgotten preference is a smaller problem than a throw on every drag.
    }
  }, [pixel])

  // Cell size grows with the slider. The sample dot never drops below 2px: a 1px
  // flood renders to nothing at some sizes and would blank the preview.
  const cell = pixel * 2 + 1
  const dot = Math.max(2, Math.round(cell * 0.34))
  const sample = Math.max(0, Math.round((cell - dot) / 2))
  const grow = Math.max(1, Math.ceil(cell / 2))

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
        <div className={`${styles.canvas} ${pixel > 0 ? styles.pixelArt : ''}`}>
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

      {/* Rebuilt from the slider each render; the canvas above references it. */}
      {pixel > 0 && (
        <svg className={styles.pixelDefs} aria-hidden="true">
          <defs>
            <filter id="preview-pixelate" x="0" y="0" width="100%" height="100%">
              <feFlood x={sample} y={sample} width={dot} height={dot} />
              <feComposite width={cell} height={cell} />
              <feTile result="a" />
              <feComposite in="SourceGraphic" in2="a" operator="in" />
              <feMorphology operator="dilate" radius={grow} />
            </filter>
          </defs>
        </svg>
      )}
    </section>
  )
}
