import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Card.module.css'

export type Shadow = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps {
  eyebrow?: string
  title?: string
  body?: string
  footer?: string
  bordered?: boolean
  align?: 'left' | 'center' | 'right'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  shadow?: Shadow
  background?: string
  borderColor?: string
  titleColor?: string
  bodyColor?: string
  accentColor?: string
  titleSize?: number
  bodySize?: number
  titleWeight?: number
  /** Empty keeps the card's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Makes the whole surface a keyboard-operable click target. */
  onClick?: () => void
  onHoverChange?: (hovered: boolean) => void
}

const SHADOWS: Record<Shadow, string> = {
  none: 'none',
  sm: '0 1px 3px rgba(15, 23, 42, 0.12)',
  md: '0 4px 12px rgba(15, 23, 42, 0.12)',
  lg: '0 12px 32px rgba(15, 23, 42, 0.16)',
}

export default function Card({
  eyebrow = '',
  title = '',
  body = '',
  footer = '',
  bordered = true,
  align = 'left',
  width = 320,
  padding = 20,
  gap = 6,
  radius = 10,
  borderWidth = 1,
  shadow = 'none',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  accentColor = '#4f46e5',
  titleSize = 15,
  bodySize = 13.5,
  titleWeight = 600,
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onClick,
  onHoverChange,
}: CardProps) {
  const style: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    textAlign: align,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    boxShadow: SHADOWS[shadow] ?? 'none',
    // Routed through a custom property, not set directly: an inline declaration
    // would outrank the :hover rule and kill the state.
    ['--card-background' as string]: background,
    ...hoverStyle('card', { background: hoverBackground, brightness: hoverBrightness }),
  }

  return (
    <div
      className={styles.card}
      style={style}
      {...clickable(onClick)}
      {...hoverable(hovered, onHoverChange)}
    >
      {eyebrow && (
        <span className={styles.eyebrow} style={{ color: accentColor }}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h3
          className={styles.title}
          style={{ color: titleColor, fontSize: titleSize, fontWeight: titleWeight }}
        >
          {title}
        </h3>
      )}
      {body && (
        <p className={styles.body} style={{ color: bodyColor, fontSize: bodySize }}>
          {body}
        </p>
      )}
      {footer && (
        <span className={styles.footer} style={{ color: bodyColor }}>
          {footer}
        </span>
      )}
    </div>
  )
}
