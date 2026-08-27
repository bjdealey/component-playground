import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './BarChart.module.css'

export interface BarChartProps {
  /** Comma-separated numbers. */
  data?: string
  /** Comma-separated labels, positionally matched to `data`. */
  labels?: string
  width?: number
  height?: number
  gap?: number
  /** Rounds the data-end only — bars stay anchored to the baseline. */
  radius?: number
  color?: string
  /** Singles out one bar; -1 highlights none. */
  highlightIndex?: number
  highlightColor?: string
  /** Direct-labels the highlighted bar only, rather than every bar. */
  labelHighlighted?: boolean
  showAllValues?: boolean
  showLabels?: boolean
  showBaseline?: boolean
  baselineColor?: string
  labelSize?: number
  labelColor?: string
  valueColor?: string
  /** Empty keeps the bar's own colour; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

function parseList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export default function BarChart({
  data = '12, 19, 8, 22, 16, 27, 21',
  labels = 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
  width = 260,
  height = 120,
  gap = 6,
  radius = 4,
  color = '#4f46e5',
  highlightIndex = -1,
  highlightColor = '#0ea5e9',
  labelHighlighted = true,
  showAllValues = false,
  showLabels = true,
  showBaseline = true,
  baselineColor = '#e3e6ea',
  labelSize = 11,
  labelColor = '#9aa1ab',
  valueColor = '#6b7280',
  hoverBackground = '',
  hoverBrightness = 0.9,
  hovered = false,
  onSelect,
  onHoverChange,
}: BarChartProps) {
  const values = parseList(data)
    .map(Number)
    .filter((value) => Number.isFinite(value))
  const names = parseList(labels)

  if (values.length === 0) return <div style={{ width, height }} />

  const max = Math.max(...values, 1)

  return (
    <div className={styles.chart} style={{ width }}>
      <div
        className={styles.plot}
        style={{
          height,
          gap: Math.max(2, gap),
          borderBottomWidth: showBaseline ? 1 : 0,
          borderBottomColor: baselineColor,
        }}
      >
        {values.map((value, index) => {
          const highlighted = index === highlightIndex
          const showValue = showAllValues || (labelHighlighted && highlighted)

          const bar: CSSProperties = {
            height: `${(value / max) * 100}%`,
            // Routed through a custom property, not set directly: an inline fill
            // would outrank the :hover rule and kill the state.
            ['--bar-chart-background' as string]: highlighted ? highlightColor : color,
            // Rounded data-end only; the baseline end stays square.
            borderRadius: `${radius}px ${radius}px 0 0`,
          }

          return (
            <button
              key={index}
              type="button"
              className={styles.column}
              // The hover properties sit on the column and inherit down to the
              // bar, which is where the rule that reads them applies.
              style={{
                cursor: onSelect ? 'pointer' : 'default',
                ...hoverStyle('bar-chart', {
                  background: hoverBackground,
                  brightness: hoverBrightness,
                }),
              }}
              title={`${names[index] ?? index + 1}: ${value}`}
              onClick={() => onSelect?.(index)}
              // Pinning every column would light up the whole series, so the
              // first bar stands in for the rest.
              {...hoverable(hovered && index === 0, onHoverChange)}
            >
              {showValue && (
                <span
                  className={styles.value}
                  style={{ fontSize: labelSize, color: valueColor }}
                >
                  {value}
                </span>
              )}
              <span className={styles.bar} style={bar} />
            </button>
          )
        })}
      </div>

      {showLabels && names.length > 0 && (
        <div className={styles.labels} style={{ gap: Math.max(2, gap) }}>
          {values.map((_, index) => (
            <span
              key={index}
              className={styles.label}
              style={{ fontSize: labelSize, color: labelColor }}
            >
              {names[index] ?? ''}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
