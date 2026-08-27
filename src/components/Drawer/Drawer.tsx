import type { CSSProperties } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Drawer.module.css'

export type Side = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open?: boolean
  side?: Side
  title?: string
  body?: string
  /** Comma-separated rows shown as a simple list. */
  items?: string
  showClose?: boolean
  showOverlay?: boolean
  /** Thickness of the panel — width for left/right, height for top/bottom. */
  size?: number
  frameWidth?: number
  frameHeight?: number
  padding?: number
  gap?: number
  radius?: number
  overlayOpacity?: number
  titleSize?: number
  bodySize?: number
  overlayColor?: string
  background?: string
  titleColor?: string
  bodyColor?: string
  frameColor?: string
  onClose?: (open: boolean) => void
}

export default function Drawer({
  open = true,
  side = 'right',
  title = 'Deploy settings',
  body = '',
  items = 'Environment, Build command, Output directory, Node version',
  showClose = true,
  showOverlay = true,
  size = 200,
  frameWidth = 420,
  frameHeight = 250,
  padding = 16,
  gap = 10,
  radius = 12,
  overlayOpacity = 0.4,
  titleSize = 14,
  bodySize = 13,
  overlayColor = '#0f172a',
  background = '#ffffff',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  frameColor = '#e3e6ea',
  onClose,
}: DrawerProps) {
  const rows = items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const horizontal = side === 'left' || side === 'right'

  const panel: CSSProperties = {
    padding,
    gap,
    backgroundColor: background,
    ...(horizontal
      ? { width: Math.min(size, frameWidth - 40), top: 0, bottom: 0 }
      : { height: Math.min(size, frameHeight - 40), left: 0, right: 0 }),
    [side]: 0,
    // Slide the panel out along its own axis when closed.
    transform: open
      ? 'translate(0, 0)'
      : side === 'left'
        ? 'translateX(-100%)'
        : side === 'right'
          ? 'translateX(100%)'
          : side === 'top'
            ? 'translateY(-100%)'
            : 'translateY(100%)',
  }

  return (
    <div
      className={styles.frame}
      style={{ width: frameWidth, height: frameHeight, borderRadius: radius, borderColor: frameColor }}
    >
      {showOverlay && open && (
        <span
          className={styles.overlay}
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
          onClick={() => onClose?.(false)}
        />
      )}

      <div className={styles.panel} style={panel} role="dialog" aria-hidden={!open}>
        <div className={styles.header}>
          {title && (
            <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
              {title}
            </span>
          )}
          {showClose && (
            <IconButton
              glyph="×"
              label="Close"
              size={22}
              radius={5}
              color="#9aa1ab"
              fontScale={0.78}
              onClick={() => onClose?.(false)}
            />
          )}
        </div>

        {body && <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.5 }}>{body}</span>}

        <div className={styles.list} style={{ gap: gap * 0.6 }}>
          {rows.map((row, index) => (
            <span key={index} style={{ fontSize: bodySize, color: bodyColor }}>
              {row}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
