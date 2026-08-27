import type { CSSProperties } from 'react'
import styles from './Kbd.module.css'

export interface KbdProps {
  /** Comma-separated keys, rendered as separate caps. */
  keys?: string
  separator?: string
  size?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  borderWidth?: number
  gap?: number
  minWidth?: number
  shadow?: boolean
  background?: string
  textColor?: string
  borderColor?: string
  separatorColor?: string
}

export default function Kbd({
  keys = '⌘, K',
  separator = '+',
  size = 12,
  paddingX = 7,
  paddingY = 4,
  radius = 5,
  borderWidth = 1,
  gap = 5,
  minWidth = 22,
  shadow = true,
  background = '#ffffff',
  textColor = '#3f434a',
  borderColor = '#d3d8de',
  separatorColor = '#9aa1ab',
}: KbdProps) {
  const items = keys
    .split(',')
    .map((key) => key.trim())
    .filter((key) => key.length > 0)

  const cap: CSSProperties = {
    minWidth,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
    color: textColor,
    fontSize: size,
    boxShadow: shadow ? `0 1.5px 0 ${borderColor}` : undefined,
  }

  return (
    <span className={styles.group} style={{ gap }}>
      {items.map((key, index) => (
        <span key={`${key}-${index}`} className={styles.item} style={{ gap }}>
          <kbd className={styles.cap} style={cap}>
            {key}
          </kbd>
          {separator && index < items.length - 1 && (
            <span style={{ fontSize: size, color: separatorColor }} aria-hidden="true">
              {separator}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}
