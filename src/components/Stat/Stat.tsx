import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Stat.module.css'

export type Trend = 'none' | 'up' | 'down'

export interface StatProps {
  label?: string
  value?: string
  delta?: string
  trend?: Trend
  caption?: string
  align?: 'left' | 'center' | 'right'
  gap?: number
  labelSize?: number
  valueSize?: number
  deltaSize?: number
  valueWeight?: number
  labelColor?: string
  valueColor?: string
  captionColor?: string
  upColor?: string
  downColor?: string
  uppercaseLabel?: boolean
  /** A stat paints no background of its own, so this is the whole of the tint. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Makes the whole surface a keyboard-operable click target. */
  onClick?: () => void
  onHoverChange?: (hovered: boolean) => void
}

const ARROWS: Record<Exclude<Trend, 'none'>, string> = { up: '↑', down: '↓' }

export default function Stat({
  label = 'Deploys this week',
  value = '128',
  delta = '12%',
  trend = 'up',
  caption = '',
  align = 'left',
  gap = 4,
  labelSize = 12,
  valueSize = 30,
  deltaSize = 12.5,
  valueWeight = 700,
  labelColor = '#6b7280',
  valueColor = '#17191c',
  captionColor = '#9aa1ab',
  upColor = '#15803d',
  downColor = '#dc2626',
  uppercaseLabel = true,
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onClick,
  onHoverChange,
}: StatProps) {
  const trendColor = trend === 'up' ? upColor : downColor

  const root: CSSProperties = {
    gap,
    textAlign: align,
    alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    // The stat paints nothing of its own, but the base still has to travel as a
    // custom property for the :hover rule's fallback to land on.
    ['--stat-background' as string]: 'transparent',
    ...hoverStyle('stat', { background: hoverBackground, brightness: hoverBrightness }),
  }

  return (
    <div
      className={styles.stat}
      style={root}
      {...clickable(onClick)}
      {...hoverable(hovered, onHoverChange)}
    >
      {label && (
        <span
          className={styles.label}
          style={{
            fontSize: labelSize,
            color: labelColor,
            textTransform: uppercaseLabel ? 'uppercase' : 'none',
            letterSpacing: uppercaseLabel ? '0.06em' : 0,
          }}
        >
          {label}
        </span>
      )}

      <span className={styles.row}>
        <span
          className={styles.value}
          style={{ fontSize: valueSize, fontWeight: valueWeight, color: valueColor }}
        >
          {value}
        </span>

        {trend !== 'none' && delta && (
          <span className={styles.delta} style={{ fontSize: deltaSize, color: trendColor }}>
            {ARROWS[trend]} {delta}
          </span>
        )}
      </span>

      {caption && (
        <span style={{ fontSize: labelSize, color: captionColor }}>{caption}</span>
      )}
    </div>
  )
}
