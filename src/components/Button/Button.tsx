import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Button.module.css'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'success'

export type Shadow = 'none' | 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children?: ReactNode
  /** Preset colors. Any explicit color prop overrides the preset. */
  variant?: ButtonVariant
  icon?: string
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  paddingX?: number
  paddingY?: number
  gap?: number
  radius?: number
  borderWidth?: number
  shadow?: Shadow
  fontSize?: number
  fontWeight?: number
  letterSpacing?: number
  uppercase?: boolean
  /** Empty string means "inherit from `variant`". */
  background?: string
  textColor?: string
  borderColor?: string
  /** Empty keeps the button's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  onHoverChange?: (hovered: boolean) => void
}

interface Palette {
  background: string
  text: string
  border: string
}

const VARIANTS: Record<ButtonVariant, Palette> = {
  primary: { background: '#4f46e5', text: '#ffffff', border: '#4f46e5' },
  secondary: { background: '#ffffff', text: '#17191c', border: '#d3d8de' },
  ghost: { background: 'transparent', text: '#4f46e5', border: 'transparent' },
  outline: { background: 'transparent', text: '#4f46e5', border: '#4f46e5' },
  danger: { background: '#dc2626', text: '#ffffff', border: '#dc2626' },
  success: { background: '#15803d', text: '#ffffff', border: '#15803d' },
}

export const SHADOWS: Record<Shadow, string> = {
  none: 'none',
  sm: '0 1px 2px rgba(15, 23, 42, 0.14)',
  md: '0 2px 8px rgba(15, 23, 42, 0.16)',
  lg: '0 10px 24px rgba(15, 23, 42, 0.22)',
}

export default function Button({
  children,
  variant = 'primary',
  icon = '',
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  paddingX = 16,
  paddingY = 10,
  gap = 8,
  radius = 6,
  borderWidth = 1,
  shadow = 'none',
  fontSize = 14,
  fontWeight = 500,
  letterSpacing = 0,
  uppercase = false,
  background = '',
  textColor = '',
  borderColor = '',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.93,
  hovered = false,
  onClick,
  onHoverChange,
}: ButtonProps) {
  const preset = VARIANTS[variant] ?? VARIANTS.primary

  const style: CSSProperties = {
    borderColor: borderColor || preset.border,
    borderWidth,
    padding: `${paddingY}px ${paddingX}px`,
    gap,
    borderRadius: radius,
    boxShadow: SHADOWS[shadow] ?? 'none',
    fontSize,
    fontWeight,
    letterSpacing,
    textTransform: uppercase ? 'uppercase' : 'none',
    width: fullWidth ? '100%' : undefined,
    // Routed through custom properties, not set directly: an inline
    // declaration would outrank the :hover rule and kill the state.
    ['--button-background' as string]: background || preset.background,
    ['--button-color' as string]: textColor || preset.text,
    ...hoverStyle('button', {
      background: hoverBackground,
      color: hoverTextColor,
      brightness: hoverBrightness,
    }),
  }

  const glyph = icon ? <span className={styles.icon}>{icon}</span> : null

  return (
    <button
      type="button"
      className={styles.button}
      style={style}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...hoverable(hovered, onHoverChange)}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {iconPosition === 'left' && glyph}
      {children}
      {iconPosition === 'right' && glyph}
    </button>
  )
}
