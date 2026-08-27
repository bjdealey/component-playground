import styles from './Meter.module.css'

export interface MeterProps {
  value?: number
  max?: number
  segments?: number
  label?: string
  /** Comma-separated tier names, low → high. */
  tiers?: string
  showTier?: boolean
  showValue?: boolean
  width?: number
  height?: number
  gap?: number
  radius?: number
  /** Fraction below which the low colour applies. */
  lowThreshold?: number
  /** Fraction below which the medium colour applies. */
  midThreshold?: number
  lowColor?: string
  midColor?: string
  highColor?: string
  trackColor?: string
  labelSize?: number
  labelColor?: string
}

export default function Meter({
  value = 68,
  max = 100,
  segments = 10,
  label = 'Password strength',
  tiers = 'Weak, Fair, Strong',
  showTier = true,
  showValue = false,
  width = 260,
  height = 8,
  gap = 3,
  radius = 3,
  lowThreshold = 0.34,
  midThreshold = 0.67,
  lowColor = '#dc2626',
  midColor = '#d97706',
  highColor = '#15803d',
  trackColor = '#e6e8ec',
  labelSize = 12.5,
  labelColor = '#6b7280',
}: MeterProps) {
  const ceiling = max > 0 ? max : 100
  const ratio = Math.min(1, Math.max(0, value / ceiling))
  const count = Math.max(1, Math.round(segments))
  const filled = Math.round(ratio * count)

  const tierNames = tiers
    .split(',')
    .map((tier) => tier.trim())
    .filter((tier) => tier.length > 0)

  const level = ratio <= lowThreshold ? 0 : ratio <= midThreshold ? 1 : 2
  const color = [lowColor, midColor, highColor][level]

  return (
    <div className={styles.meter} style={{ width, gap: 6 }}>
      {(label || showTier || showValue) && (
        <div className={styles.header} style={{ fontSize: labelSize, color: labelColor }}>
          {label && <span>{label}</span>}
          <span className={styles.readout}>
            {showValue && <span>{Math.round(ratio * 100)}%</span>}
            {showTier && tierNames[level] && (
              <span style={{ color, fontWeight: 600 }}>{tierNames[level]}</span>
            )}
          </span>
        </div>
      )}

      <div
        className={styles.track}
        style={{ gap }}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={ceiling}
      >
        {Array.from({ length: count }, (_, index) => (
          <span
            key={index}
            className={styles.segment}
            style={{
              height,
              borderRadius: radius,
              backgroundColor: index < filled ? color : trackColor,
            }}
          />
        ))}
      </div>
    </div>
  )
}
