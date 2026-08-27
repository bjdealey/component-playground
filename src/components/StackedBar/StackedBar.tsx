import { parsePalette } from '../../lib/palette'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './StackedBar.module.css'

export interface StackedBarProps {
  /** Comma-separated numbers, one per segment. */
  data?: string
  /** Comma-separated segment names, positionally matched to `data`. */
  labels?: string
  /** Comma-separated hues, assigned in fixed order. */
  palette?: string
  width?: number
  height?: number
  radius?: number
  borderWidth?: number
  borderColor?: string
  background?: string
  padding?: number
  titleWeight?: number
  /** Surface-coloured gap between segments. */
  segmentGap?: number
  gapColor?: string
  title?: string
  total?: string
  showHeader?: boolean
  showLegend?: boolean
  legendColumns?: number
  legendGap?: number
  showPercent?: boolean
  titleSize?: number
  legendSize?: number
  titleColor?: string
  legendColor?: string
  mutedColor?: string
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

export default function StackedBar({
  data = '46, 24, 18, 12',
  labels = 'Build, Test, Upload, Deploy',
  palette = '',
  width = 320,
  height = 14,
  radius = 999,
  borderWidth = 0,
  borderColor = '#e3e6ea',
  background = '#ffffff',
  padding = 0,
  titleWeight = 600,
  segmentGap = 2,
  gapColor = '#ffffff',
  title = 'Pipeline time',
  total = '4m 12s',
  showHeader = true,
  showLegend = true,
  legendColumns = 2,
  legendGap = 7,
  showPercent = true,
  titleSize = 13,
  legendSize = 12,
  titleColor = '#17191c',
  legendColor = '#3f434a',
  mutedColor = '#9aa1ab',
  onSelect,
  hoverBrightness = 0.88,
  hovered = false,
  onHoverChange,
}: StackedBarProps) {
  const values = splitList(data).map(Number).filter((value) => Number.isFinite(value) && value > 0)
  const names = splitList(labels)
  const colors = parsePalette(palette)
  const sum = values.reduce((acc, value) => acc + value, 0)

  if (sum <= 0) return <div style={{ width, height }} />

  const segments = values.map((value, index) => ({
    value,
    percent: Math.round((value / sum) * 100),
    fraction: value / sum,
    color: colors[index % colors.length],
    name: names[index] ?? `Segment ${index + 1}`,
  }))

  return (
    <div
      className={styles.wrapper}
      style={{
        width,
        gap: legendGap + 2,
        borderWidth,
        borderColor,
        borderStyle: borderWidth > 0 ? 'solid' : undefined,
        backgroundColor: background,
        borderRadius: radius,
        padding,
        boxSizing: 'border-box',
      }}
    >
      {showHeader && (title || total) && (
        <div className={styles.header} style={{ fontSize: titleSize }}>
          {title && <span style={{ color: titleColor, fontWeight: titleWeight }}>{title}</span>}
          {total && <span style={{ color: mutedColor }}>{total}</span>}
        </div>
      )}

      <div
        className={styles.bar}
        style={{ height, borderRadius: radius, gap: segmentGap, backgroundColor: gapColor }}
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            className={styles.segment}
            style={{
              width: `${segment.fraction * 100}%`,
              backgroundColor: segment.color,
              ...hoverStyle('stackedbar', { brightness: hoverBrightness }),
            }}
            title={`${segment.name}: ${segment.value} (${segment.percent}%)`}
            {...clickable(onSelect ? () => onSelect(index) : undefined)}
            // One pinned segment reads as a highlight; pinning all of them just
            // redraws the whole bar darker.
            {...hoverable(hovered && index === 0, onHoverChange)}
          />
        ))}
      </div>

      {/* Legend is mandatory for two or more series. */}
      {showLegend && (
        <div
          className={styles.legend}
          style={{
            gap: legendGap,
            gridTemplateColumns: `repeat(${Math.max(1, legendColumns)}, minmax(0, 1fr))`,
          }}
        >
          {segments.map((segment, index) => (
            <span key={index} className={styles.item} style={{ fontSize: legendSize }}>
              <span className={styles.dot} style={{ backgroundColor: segment.color }} />
              <span className={styles.name} style={{ color: legendColor }}>
                {segment.name}
              </span>
              {showPercent && (
                <span style={{ color: mutedColor }}>{segment.percent}%</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
