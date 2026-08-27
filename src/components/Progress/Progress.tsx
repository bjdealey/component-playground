import type { CSSProperties } from 'react'
import { readableOn } from '../../lib/color'
import styles from './Progress.module.css'

export interface ProgressProps {
  value?: number
  max?: number
  width?: number
  height?: number
  radius?: number
  borderWidth?: number
  borderColor?: string
  gap?: number
  labelWeight?: number
  trackColor?: string
  fillColor?: string
  /** When set, the fill becomes a gradient running to this color. */
  fillColorTo?: string
  striped?: boolean
  animated?: boolean
  showLabel?: boolean
  labelPosition?: 'right' | 'top' | 'inside'
  labelSize?: number
  labelColor?: string
}

export default function Progress({
  value = 60,
  max = 100,
  width = 300,
  height = 10,
  radius = 999,
  borderWidth = 0,
  borderColor = '#e3e6ea',
  gap = 8,
  labelWeight = 500,
  trackColor = '#eceef1',
  fillColor = '#4f46e5',
  fillColorTo = '',
  striped = false,
  animated = false,
  showLabel = false,
  labelPosition = 'right',
  labelSize = 12,
  labelColor = '#6b7280',
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100
  const ratio = Math.min(1, Math.max(0, value / safeMax))
  const percent = Math.round(ratio * 100)

  const background = fillColorTo
    ? `linear-gradient(90deg, ${fillColor}, ${fillColorTo})`
    : fillColor

  const fill: CSSProperties = {
    width: `${ratio * 100}%`,
    background,
    borderRadius: radius,
  }

  const label = showLabel ? (
    <span
      className={styles.label}
      style={{
        fontSize: labelSize,
        fontWeight: labelWeight,
        // Inside the fill the label sits on the fill colour, so it follows it
        // rather than assuming the fill is dark enough for white.
        color: labelPosition === 'inside' ? readableOn(fillColor) : labelColor,
      }}
    >
      {percent}%
    </span>
  ) : null

  const bar = (
    <div
      className={styles.track}
      style={{
        height,
        borderRadius: radius,
        backgroundColor: trackColor,
        borderWidth,
        borderColor,
        borderStyle: borderWidth > 0 ? 'solid' : undefined,
        boxSizing: 'border-box',
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={safeMax}
    >
      <div
        className={`${styles.fill} ${striped ? styles.striped : ''} ${
          striped && animated ? styles.animated : ''
        }`}
        style={fill}
      >
        {labelPosition === 'inside' && label}
      </div>
    </div>
  )

  return (
    <div
      className={`${styles.wrapper} ${labelPosition === 'right' ? styles.row : styles.column}`}
      style={{ width, gap }}
    >
      {labelPosition === 'top' && label}
      {bar}
      {labelPosition === 'right' && label}
    </div>
  )
}
