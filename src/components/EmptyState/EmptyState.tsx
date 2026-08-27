import type { CSSProperties, ReactNode } from 'react'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  /** Medallion mark — compose an `<IconBadge />` here. */
  glyph?: ReactNode
  title?: string
  body?: string
  /** Call to action — compose a `<Button />` here. */
  action?: ReactNode
  showAction?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  dashed?: boolean
  titleSize?: number
  bodySize?: number
  background?: string
  borderColor?: string
  titleColor?: string
  bodyColor?: string
}

export default function EmptyState({
  glyph,
  title = 'No deployments yet',
  body = 'Push to a branch and your first preview will show up here.',
  action,
  showAction = true,
  width = 340,
  padding = 32,
  gap = 10,
  radius = 12,
  borderWidth = 1,
  dashed = true,
  titleSize = 15,
  bodySize = 13,
  background = 'transparent',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
}: EmptyStateProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderStyle: dashed ? 'dashed' : 'solid',
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.empty} style={root}>
      {glyph && (
        <span className={styles.glyph} style={{ marginBottom: gap / 2 }}>
          {glyph}
        </span>
      )}

      {title && (
        <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
          {title}
        </span>
      )}

      {body && (
        <span className={styles.body} style={{ fontSize: bodySize, color: bodyColor }}>
          {body}
        </span>
      )}

      {showAction && action && (
        <span className={styles.action} style={{ marginTop: gap / 2 }}>
          {action}
        </span>
      )}
    </div>
  )
}
