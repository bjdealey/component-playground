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

const PIXELATE_KEY = 'playground:pixelate'
const PIXELATE_MAX = 10

/** A local preference, like the panes — remembered, never shared in the hash. */
function readPixelate(): number {
  try {
    const raw = Number(window.localStorage.getItem(PIXELATE_KEY))
    return Number.isFinite(raw) ? Math.min(PIXELATE_MAX, Math.max(0, Math.round(raw))) : 0
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

  // How blocky the preview renders, in pixels. Zero is off.
  const [pixelate, setPixelate] = useState(readPixelate)
  useEffect(() => {
    try {
      window.localStorage.setItem(PIXELATE_KEY, String(pixelate))
    } catch {
      // A forgotten preference is a smaller problem than a throw on every drag.
    }
  }, [pixelate])

  // The SVG pixelate filter samples one point per cell and grows it to fill the
  // cell — a real mosaic of the live DOM, sized by the slider. The sample dot
  // never drops below 2px: a 1px flood renders to nothing at some cell sizes,
  // which blanks the preview instead of pixelating it.
  const cell = pixelate
  const dot = Math.max(2, Math.round(cell * 0.34))
  const sample = Math.max(0, Math.round((cell - dot) / 2))
  const grow = Math.max(1, Math.ceil(cell / 2))

  return (
    <section className={styles.wrapper} aria-label="Preview">
      <div className={styles.toolbar}>
        <span className={styles.label}>Preview</span>

        <div className={styles.tools}>
          <label className={styles.pixelate} title="Pixelate the preview — drag to set how blocky">
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
              max={PIXELATE_MAX}
              step={1}
              value={pixelate}
              aria-label="Pixelation amount"
              onChange={(event) => setPixelate(Number(event.target.value))}
            />
            <span className={styles.pixelValue}>{pixelate === 0 ? 'Off' : `${pixelate}px`}</span>
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
        <div
          className={styles.canvas}
          style={pixelate > 0 ? { filter: 'url(#preview-pixelate)' } : undefined}
        >
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
      {pixelate > 0 && (
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
