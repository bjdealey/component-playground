import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Banner.module.css'

export interface BannerProps {
  message?: string
  /** Leading mark — compose an `<IconBadge />` here. */
  icon?: ReactNode
  /** Trailing action — compose a `<Button />` here. */
  action?: ReactNode
  dismissible?: boolean
  dismissed?: boolean
  align?: 'left' | 'center'
  width?: number
  paddingX?: number
  paddingY?: number
  gap?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  onDismiss?: (dismissed: boolean) => void
}

export default function Banner({
  message = 'Scheduled maintenance on Sunday 02:00–04:00 UTC.',
  icon,
  action,
  dismissible = true,
  dismissed = false,
  align = 'left',
  width = 520,
  paddingX = 14,
  paddingY = 10,
  gap = 12,
  radius = 8,
  borderWidth = 1,
  fontSize = 13,
  background = '#eef2ff',
  textColor = '#1e3a8a',
  borderColor = '#c7d2fe',
  onDismiss,
}: BannerProps) {
  if (dismissed) return null

  const root: CSSProperties = {
    width,
    padding: `${paddingY}px ${paddingX}px`,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
    color: textColor,
    fontSize,
    justifyContent: align === 'center' ? 'center' : 'flex-start',
  }

  return (
    <div className={styles.banner} style={root} role="status">
      {icon && <span className={styles.icon}>{icon}</span>}
      {message && <span className={styles.message}>{message}</span>}
      {action && <span className={styles.action}>{action}</span>}
      {dismissible && (
        <IconButton
          glyph="×"
          label="Dismiss"
          size={20}
          color="currentColor"
          fontScale={0.85}
          onClick={() => onDismiss?.(true)}
        />
      )}
    </div>
  )
}
