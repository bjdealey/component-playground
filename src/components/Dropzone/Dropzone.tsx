import type { CSSProperties, ReactNode } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Dropzone.module.css'

export interface DropzoneProps {
  glyph?: string
  title?: string
  hint?: string
  /** Browse affordance — compose a `<Button />` here. */
  action?: ReactNode
  showButton?: boolean
  /** Files separated by `;`, each `name|size`. */
  files?: string
  active?: boolean
  disabled?: boolean
  width?: number
  minHeight?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  dashed?: boolean
  glyphSize?: number
  titleSize?: number
  hintSize?: number
  background?: string
  activeBackground?: string
  borderColor?: string
  activeBorderColor?: string
  titleColor?: string
  hintColor?: string
  accentColor?: string
  /** Empty keeps the zone's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Clicking anywhere in the zone fires this — the file-picker path. */
  onBrowse?: () => void
  onHoverChange?: (hovered: boolean) => void
}

export default function Dropzone({
  glyph = '⬆',
  title = 'Drop files to upload',
  hint = 'PNG, JPG or PDF up to 10 MB',
  action,
  showButton = true,
  files = 'brief.pdf|248 KB;hero@2x.png|1.4 MB',
  active = false,
  disabled = false,
  width = 340,
  minHeight = 150,
  padding = 24,
  gap = 8,
  radius = 12,
  borderWidth = 2,
  dashed = true,
  glyphSize = 22,
  titleSize = 14,
  hintSize = 12.5,
  background = '#fbfbfc',
  activeBackground = '#eef2ff',
  borderColor = '#d3d8de',
  activeBorderColor = '#4f46e5',
  titleColor = '#17191c',
  hintColor = '#9aa1ab',
  accentColor = '#4f46e5',
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onBrowse,
  onHoverChange,
}: DropzoneProps) {
  const rows = files
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [name, ...rest] = chunk.split('|')
      return { name: name.trim(), size: rest.join('|').trim() }
    })

  const zone: CSSProperties = {
    width,
    minHeight,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderStyle: dashed ? 'dashed' : 'solid',
    borderColor: active ? activeBorderColor : borderColor,
    opacity: disabled ? 0.55 : 1,
    // Routed through a custom property, not set directly: an inline declaration
    // would outrank the :hover rule and kill the state.
    ['--dropzone-background' as string]: active ? activeBackground : background,
    ...hoverStyle('dropzone', { background: hoverBackground, brightness: hoverBrightness }),
  }

  // The `action` slot holds a real Button with its own handler, and that is the
  // primary affordance. So the zone only becomes a click target when there isn't
  // one: nesting an interactive element inside `role="button"` is invalid, and two
  // tab stops for a single action is a worse experience than one.
  const zoneActivates = showButton && action ? undefined : onBrowse

  return (
    <div className={styles.wrapper} style={{ width, gap: gap + 2 }}>
      <div
        className={styles.zone}
        style={zone}
        {...clickable(zoneActivates)}
        {...hoverable(hovered, onHoverChange)}
        aria-label={zoneActivates ? title || 'Choose files' : undefined}
      >
        {glyph && (
          <span
            className={styles.glyph}
            style={{ fontSize: glyphSize, color: active ? activeBorderColor : accentColor }}
          >
            {glyph}
          </span>
        )}
        {title && (
          <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
            {title}
          </span>
        )}
        {hint && (
          <span style={{ fontSize: hintSize, color: hintColor }}>{hint}</span>
        )}
        {showButton && action && <span className={styles.button}>{action}</span>}
      </div>

      {rows.length > 0 && (
        <div className={styles.files} style={{ gap: gap / 2 }}>
          {rows.map((file, index) => (
            <div
              key={index}
              className={styles.file}
              style={{ borderRadius: radius / 2, borderColor, fontSize: hintSize }}
            >
              <span className={styles.fileName} style={{ color: titleColor }}>
                {file.name}
              </span>
              <span style={{ color: hintColor }}>{file.size}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
