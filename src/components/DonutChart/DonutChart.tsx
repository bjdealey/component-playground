import { parsePalette } from '../../lib/palette'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './DonutChart.module.css'

export interface DonutChartProps {
  /** Comma-separated numbers, one per slice. */
  data?: string
  /** Comma-separated slice names, positionally matched to `data`. */
  labels?: string
  /** Comma-separated hues, assigned in fixed order. */
  palette?: string
  size?: number
  thickness?: number
  /** Surface-coloured gap between slices, so neighbours never merge. */
  sliceGap?: number
  gapColor?: string
  rounded?: boolean
  centerValue?: string
  centerLabel?: string
  showCenter?: boolean
  showLegend?: boolean
  legendGap?: number
  valueSize?: number
  labelSize?: number
  legendSize?: number
  valueColor?: string
  labelColor?: string
  legendColor?: string
  /** Receives the index of the mark that was activated. */
  onSelect?: (index: number) => void
  /**
   * Marks keep their series colour on hover — recolouring one would make it read
   * as a different series. Brightness signals the target without moving it.
   */
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onHoverChange?: (hovered: boolean) => void
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export default function DonutChart({
  data = '42, 27, 18, 13',
  labels = 'Direct, Search, Social, Referral',
  palette = '',
  size = 150,
  thickness = 22,
  sliceGap = 2,
  gapColor = '#ffffff',
  rounded = false,
  centerValue = '100',
  centerLabel = 'sessions',
  showCenter = true,
  showLegend = true,
  legendGap = 6,
  valueSize = 24,
  labelSize = 11,
  legendSize = 12,
  valueColor = '#17191c',
  labelColor = '#9aa1ab',
  legendColor = '#3f434a',
  onSelect,
  hoverBrightness = 0.88,
  hovered = false,
  onHoverChange,
}: DonutChartProps) {
  const values = splitList(data).map(Number).filter((value) => Number.isFinite(value) && value > 0)
  const names = splitList(labels)
  const colors = parsePalette(palette)

  const total = values.reduce((sum, value) => sum + value, 0)
  if (total <= 0) return <div style={{ width: size, height: size }} />

  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius

  let offset = 0
  const slices = values.map((value, index) => {
    const fraction = value / total
    const length = circumference * fraction
    const slice = {
      // A surface-coloured gap keeps adjacent slices from reading as one.
      dash: `${Math.max(0, length - sliceGap)} ${circumference - Math.max(0, length - sliceGap)}`,
      rotation: (offset / circumference) * 360,
      color: colors[index % colors.length],
      name: names[index] ?? `Slice ${index + 1}`,
      value,
      percent: Math.round(fraction * 100),
    }
    offset += length
    return slice
  })

  return (
    <div className={styles.chart} style={{ gap: legendGap + 6 }}>
      <div className={styles.donut} style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gapColor}
            strokeWidth={thickness}
          />
          {slices.map((slice, index) => (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={thickness}
              strokeDasharray={slice.dash}
              strokeLinecap={rounded ? 'round' : 'butt'}
              // Start at 12 o'clock rather than 3 o'clock.
              transform={`rotate(${slice.rotation - 90} ${size / 2} ${size / 2})`}
              style={{
                cursor: onSelect ? 'pointer' : undefined,
                ...hoverStyle('donut', { brightness: hoverBrightness }),
              }}
              aria-label={onSelect ? `${slice.name}: ${slice.percent}%` : undefined}
              {...clickable(onSelect ? () => onSelect(index) : undefined)}
              // A pinned ring would darken every slice at once, so it lands on
              // the first — the one the legend reads top-down.
              {...hoverable(hovered && index === 0, onHoverChange)}
            >
              <title>{`${slice.name}: ${slice.value} (${slice.percent}%)`}</title>
            </circle>
          ))}
        </svg>

        {showCenter && (
          <div className={styles.center}>
            {centerValue && (
              <span className={styles.value} style={{ fontSize: valueSize, color: valueColor }}>
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span style={{ fontSize: labelSize, color: labelColor }}>{centerLabel}</span>
            )}
          </div>
        )}
      </div>

      {/* Two or more series always carry a legend — identity is never colour alone. */}
      {showLegend && (
        <div className={styles.legend} style={{ gap: legendGap }}>
          {slices.map((slice, index) => (
            <span key={index} className={styles.legendItem} style={{ fontSize: legendSize }}>
              <span className={styles.dot} style={{ backgroundColor: slice.color }} />
              <span style={{ color: legendColor }}>{slice.name}</span>
              <span className={styles.percent} style={{ color: labelColor }}>
                {slice.percent}%
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
