import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Alert.module.css'

export type Severity = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps {
  severity?: Severity
  title?: string
  body?: string
  /** Severity mark — compose an `<IconBadge />` here. */
  icon?: ReactNode
  showIcon?: boolean
  accentBar?: boolean
  accentWidth?: number
  dismissible?: boolean
  dismissed?: boolean
  onDismiss?: (dismissed: boolean) => void
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  /** Empty string means "inherit from `severity`". */
  background?: string
  textColor?: string
  borderColor?: string
  accentColor?: string
  titleSize?: number
  bodySize?: number
}

interface Palette {
  background: string
  text: string
  accent: string
  icon: string
}

const SEVERITIES: Record<Severity, Palette> = {
  info: { background: '#e0edff', text: '#1e3a8a', accent: '#2563eb', icon: 'i' },
  success: { background: '#dcfce7', text: '#14532d', accent: '#16a34a', icon: '✓' },
  warning: { background: '#fef3c7', text: '#78350f', accent: '#d97706', icon: '!' },
  error: { background: '#fee2e2', text: '#7f1d1d', accent: '#dc2626', icon: '×' },
}

export default function Alert({
  severity = 'info',
  title = 'Heads up',
  body = 'Your preview environment will sleep after 30 minutes of inactivity.',
  icon,
  showIcon = true,
  accentBar = false,
  accentWidth = 4,
  dismissible = false,
  dismissed = false,
  onDismiss,
  width = 380,
  padding = 14,
  gap = 10,
  radius = 8,
  borderWidth = 0,
  background = '',
  textColor = '',
  borderColor = '',
  accentColor = '',
  titleSize = 14,
  bodySize = 13,
}: AlertProps) {
  if (dismissed) return null

  const preset = SEVERITIES[severity] ?? SEVERITIES.info
  const accent = accentColor || preset.accent

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    backgroundColor: background || preset.background,
    color: textColor || preset.text,
    borderWidth,
    borderColor: borderColor || accent,
    borderLeftWidth: accentBar ? accentWidth : borderWidth,
    borderLeftColor: accentBar ? accent : borderColor || accent,
  }

  return (
    <div className={styles.alert} style={root} role="alert">
      {showIcon && icon && <span className={styles.icon}>{icon}</span>}

      <div className={styles.content} style={{ gap: Math.round(gap / 2) }}>
        {title && (
          <span className={styles.title} style={{ fontSize: titleSize }}>
            {title}
          </span>
        )}
        {body && (
          <span className={styles.body} style={{ fontSize: bodySize }}>
            {body}
          </span>
        )}
      </div>

      {dismissible && (
        <IconButton
          glyph="×"
          label="Dismiss"
          size={18}
          color="currentColor"
          fontScale={0.95}
          onClick={() => onDismiss?.(true)}
        />
      )}
    </div>
  )
}
