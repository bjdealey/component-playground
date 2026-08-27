import type { CSSProperties, ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  children?: ReactNode
  /** Preset colors. Any explicit color prop overrides the preset. */
  tone?: BadgeTone
  dot?: boolean
  paddingX?: number
  paddingY?: number
  gap?: number
  radius?: number
  dotSize?: number
  borderWidth?: number
  fontSize?: number
  fontWeight?: number
  letterSpacing?: number
  uppercase?: boolean
  /** Empty string means "inherit from `tone`". */
  background?: string
  textColor?: string
  borderColor?: string
  dotColor?: string
}

interface Palette {
  background: string
  text: string
}

const TONES: Record<BadgeTone, Palette> = {
  neutral: { background: '#eceef1', text: '#3f434a' },
  info: { background: '#e0edff', text: '#1d4ed8' },
  success: { background: '#dcfce7', text: '#15803d' },
  warning: { background: '#fef3c7', text: '#b45309' },
  danger: { background: '#fee2e2', text: '#b91c1c' },
}

/**
 * Pick black or white text for a background, so a custom color stays legible at
 * either end of the range. Perceived-brightness weights, no dependency needed.
 */
function readableTextOn(hex: string): string {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) return '#ffffff'

  const digits = match[1]
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map((char) => char + char)
          .join('')
      : digits

  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return brightness > 0.6 ? '#17191c' : '#ffffff'
}

export default function Badge({
  children,
  tone = 'neutral',
  dot = false,
  paddingX = 10,
  paddingY = 5,
  gap = 6,
  radius = 999,
  dotSize = 6,
  borderWidth = 0,
  fontSize = 12,
  fontWeight = 600,
  letterSpacing = 0.1,
  uppercase = false,
  background = '',
  textColor = '',
  borderColor = '',
  dotColor = '',
}: BadgeProps) {
  const preset = TONES[tone] ?? TONES.neutral

  // A custom background needs matching text unless one was given explicitly,
  // otherwise the tone's text color can land unreadably on it.
  const resolvedText =
    textColor || (background ? readableTextOn(background) : preset.text)

  const style: CSSProperties = {
    backgroundColor: background || preset.background,
    color: resolvedText,
    borderColor: borderColor || 'transparent',
    borderWidth,
    padding: `${paddingY}px ${paddingX}px`,
    gap,
    borderRadius: radius,
    fontSize,
    fontWeight,
    letterSpacing,
    textTransform: uppercase ? 'uppercase' : 'none',
  }

  return (
    <span className={styles.badge} style={style}>
      {dot && (
        <span
          className={styles.dot}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor || 'currentColor',
          }}
        />
      )}
      {children}
    </span>
  )
}
