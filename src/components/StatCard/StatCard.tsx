import type { CSSProperties, ReactNode } from 'react'
import styles from './StatCard.module.css'

export interface StatCardProps {
  /** The metric itself — compose a `<Stat />` here. */
  stat?: ReactNode
  /** Trend line — compose a `<Sparkline />` here. */
  chart?: ReactNode
  /** Corner label — compose a `<Badge />` here. */
  badge?: ReactNode
  caption?: string
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  shadow?: boolean
  chartPosition?: 'below' | 'right'
  background?: string
  borderColor?: string
  captionColor?: string
  captionSize?: number
}

/**
 * Card chrome around a metric. It owns no metric rendering of its own — the
 * number, the trend line and the label are each a real component.
 */
export default function StatCard({
  stat,
  chart,
  badge,
  caption = '',
  width = 260,
  padding = 18,
  gap = 14,
  radius = 12,
  borderWidth = 1,
  bordered = true,
  shadow = false,
  chartPosition = 'below',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  captionColor = '#9aa1ab',
  captionSize = 12,
}: StatCardProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
    boxShadow: shadow ? '0 4px 14px rgba(15, 23, 42, 0.10)' : undefined,
  }

  return (
    <div className={styles.card} style={root}>
      {badge && <span className={styles.badge}>{badge}</span>}

      <div
        className={`${styles.body} ${chartPosition === 'right' ? styles.row : ''}`}
        style={{ gap }}
      >
        {stat && <span className={styles.stat}>{stat}</span>}
        {chart && <span className={styles.chart}>{chart}</span>}
      </div>

      {caption && (
        <span style={{ fontSize: captionSize, color: captionColor }}>{caption}</span>
      )}
    </div>
  )
}
