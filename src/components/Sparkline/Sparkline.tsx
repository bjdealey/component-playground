import styles from './Sparkline.module.css'

export interface SparklineProps {
  /** Comma-separated numbers. */
  data?: string
  width?: number
  height?: number
  strokeWidth?: number
  color?: string
  area?: boolean
  areaOpacity?: number
  /** Marks the most recent point — the sparkline's "where it ended" reference. */
  showLastPoint?: boolean
  pointSize?: number
  pointColor?: string
  showBaseline?: boolean
  baselineColor?: string
  label?: string
}

export function parseSeries(data: string): number[] {
  return data
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value))
}

export default function Sparkline({
  data = '4, 7, 5, 9, 8, 12, 10, 15, 13, 18, 16, 21',
  width = 180,
  height = 48,
  strokeWidth = 2,
  color = '#4f46e5',
  area = true,
  areaOpacity = 0.12,
  showLastPoint = true,
  pointSize = 8,
  pointColor = '',
  showBaseline = false,
  baselineColor = '#e3e6ea',
  label = '',
}: SparklineProps) {
  const series = parseSeries(data)

  if (series.length < 2) {
    return <span className={styles.empty} style={{ width, height }} />
  }

  const min = Math.min(...series)
  const max = Math.max(...series)
  const span = max - min || 1

  // Inset by half the stroke and the marker radius so nothing clips at the edges.
  const pad = Math.max(strokeWidth / 2, showLastPoint ? pointSize / 2 : 0)
  const innerW = width - pad * 2
  const innerH = height - pad * 2

  const points = series.map((value, index) => {
    const x = pad + (index / (series.length - 1)) * innerW
    const y = pad + (1 - (value - min) / span) * innerH
    return [x, y] as const
  })

  const line = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const last = points[points.length - 1]

  const areaPath = `M ${points[0][0].toFixed(2)},${height - pad} L ${line
    .split(' ')
    .join(' L ')} L ${last[0].toFixed(2)},${height - pad} Z`

  return (
    <svg
      width={width}
      height={height}
      className={styles.sparkline}
      role="img"
      aria-label={label || `Sparkline, ${series.length} points, ending at ${series[series.length - 1]}`}
    >
      {/* Native tooltip — the hover layer a chart should ship with, no dependency. */}
      <title>{label || `${min} – ${max} (latest ${series[series.length - 1]})`}</title>

      {showBaseline && (
        <line
          x1={0}
          y1={height - pad}
          x2={width}
          y2={height - pad}
          stroke={baselineColor}
          strokeWidth={1}
        />
      )}

      {area && <path d={areaPath} fill={color} opacity={areaOpacity} />}

      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showLastPoint && (
        <circle cx={last[0]} cy={last[1]} r={pointSize / 2} fill={pointColor || color} />
      )}
    </svg>
  )
}
