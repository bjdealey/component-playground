import type { CSSProperties, MouseEventHandler } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './IconButton.module.css'

export interface IconButtonProps {
  glyph?: string
  label?: string
  size?: number
  shape?: 'circle' | 'rounded' | 'square'
  radius?: number
  background?: string
  color?: string
  /** Empty keeps the button's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  borderWidth?: number
  borderColor?: string
  fontScale?: number
  shadow?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  onHoverChange?: (hovered: boolean) => void
}

/**
 * A square hit target holding a single glyph.
 *
 * Extracted because the dismiss ×, the carousel arrows and the number stepper
 * were seven separate implementations of the same thing. `label` is required in
 * spirit — an icon-only control needs an accessible name.
 */
export default function IconButton({
  glyph = '×',
  label = 'Close',
  size = 24,
  shape = 'rounded',
  radius = 6,
  background = 'transparent',
  color = '#6b7280',
  hoverBackground = 'rgba(15, 23, 42, 0.07)',
  hoverTextColor = '',
  hoverBrightness = 1,
  hovered = false,
  borderWidth = 0,
  borderColor = 'transparent',
  fontScale = 0.72,
  shadow = false,
  disabled = false,
  onClick,
  onHoverChange,
}: IconButtonProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? 0 : radius,
    borderWidth,
    borderColor,
    fontSize: Math.max(9, Math.round(size * fontScale)),
    boxShadow: shadow ? '0 1px 4px rgba(15, 23, 42, 0.2)' : undefined,
    // Routed through custom properties, not set directly: an inline
    // declaration would outrank the :hover rule and kill the state.
    ['--iconbutton-background' as string]: background,
    ['--iconbutton-color' as string]: color,
    ...hoverStyle('iconbutton', {
      background: hoverBackground,
      color: hoverTextColor,
      brightness: hoverBrightness,
    }),
  }

  return (
    <button
      type="button"
      className={styles.button}
      style={style}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      {...hoverable(hovered, onHoverChange)}
    >
      {glyph}
    </button>
  )
}
