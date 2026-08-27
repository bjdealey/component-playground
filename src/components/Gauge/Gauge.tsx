import styles from './Gauge.module.css'

export interface GaugeProps {
  value?: number
  max?: number
  size?: number
  thickness?: number
  /** Degrees of arc. 360 is a full ring; 240 leaves a gap at the bottom. */
  sweep?: number
  rounded?: boolean
  trackColor?: string
  fillColor?: string
  showValue?: boolean
  suffix?: string
  label?: string
  valueSize?: number
  labelSize?: number
  valueColor?: string
  labelColor?: string
}

export default function Gauge({
  value = 72,
  max = 100,
  size = 120,
  thickness = 10,
  sweep = 270,
  rounded = true,
  trackColor = '#e6e8ec',
  fillColor = '#4f46e5',
  showValue = true,
  suffix = '%',
  label = '',
  valueSize = 26,
  labelSize = 12,
  valueColor = '#17191c',
  labelColor = '#6b7280',
}: GaugeProps) {
  const safeMax = max > 0 ? max : 100
  const ratio = Math.min(1, Math.max(0, value / safeMax))
  const arc = Math.min(360, Math.max(1, sweep))

  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * (arc / 360)

  // Rotate so the arc is centred at the top, leaving its gap at the bottom.
  const rotation = 90 + (360 - arc) / 2

  return (
    <div className={styles.gauge} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg} aria-hidden="true">
        <g transform={`rotate(${rotation} ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={thickness}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap={rounded ? 'round' : 'butt'}
          />
          <circle
            className={styles.fill}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={thickness}
            strokeDasharray={`${arcLength * ratio} ${circumference}`}
            strokeLinecap={rounded ? 'round' : 'butt'}
          />
        </g>
      </svg>

      <div
        className={styles.center}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        {showValue && (
          <span className={styles.value} style={{ fontSize: valueSize, color: valueColor }}>
            {Math.round(ratio * safeMax)}
            {suffix && <span className={styles.suffix}>{suffix}</span>}
          </span>
        )}
        {label && (
          <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
        )}
      </div>
    </div>
  )
}
