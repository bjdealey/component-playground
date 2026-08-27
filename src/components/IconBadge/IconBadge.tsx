import type { CSSProperties } from 'react'
import styles from './IconBadge.module.css'

export interface IconBadgeProps {
  glyph?: string
  size?: number
  shape?: 'circle' | 'rounded' | 'square'
  radius?: number
  background?: string
  color?: string
  borderWidth?: number
  borderColor?: string
  /** Glyph size as a fraction of the badge, so it scales with `size`. */
  fontScale?: number
  bold?: boolean
}

/**
 * A glyph in a circle or rounded square.
 *
 * Extracted because Alert, Toast, Steps and EmptyState each drew their own —
 * same shape, same props, four implementations. Registered like any other
 * component, so its controls are defined once.
 */
export default function IconBadge({
  glyph = 'i',
  size = 20,
  shape = 'circle',
  radius = 6,
  background = '#4f46e5',
  color = '#ffffff',
  borderWidth = 0,
  borderColor = 'transparent',
  fontScale = 0.6,
  bold = true,
}: IconBadgeProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? 0 : radius,
    backgroundColor: background,
    color,
    borderWidth,
    borderColor,
    fontSize: Math.max(8, Math.round(size * fontScale)),
    fontWeight: bold ? 700 : 500,
  }

  return (
    <span className={styles.badge} style={style} aria-hidden="true">
      {glyph}
    </span>
  )
}
