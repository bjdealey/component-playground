import styles from './Rating.module.css'

export interface RatingProps {
  value?: number
  max?: number
  symbol?: string
  size?: number
  gap?: number
  filledColor?: string
  emptyColor?: string
  showValue?: boolean
  valueSize?: number
  valueColor?: string
  /** Clicking the left/right half of a symbol reports a half or whole step. */
  onChange?: (value: number) => void
}

export default function Rating({
  value = 3.5,
  max = 5,
  symbol = '★',
  size = 22,
  gap = 3,
  filledColor = '#f59e0b',
  emptyColor = '#dfe3e8',
  showValue = false,
  valueSize = 13,
  valueColor = '#6b7280',
  onChange,
}: RatingProps) {
  const count = Math.max(0, Math.round(max))

  return (
    <span className={styles.rating} style={{ gap }} role={onChange ? 'slider' : undefined}>
      {Array.from({ length: count }, (_, index) => {
        // Fraction of this symbol that should read as filled: 1, 0, or partial.
        const fill = Math.min(1, Math.max(0, value - index))

        return (
          <button
            key={index}
            type="button"
            className={styles.symbol}
            style={{ fontSize: size, color: emptyColor, cursor: onChange ? 'pointer' : 'default' }}
            aria-label={`Rate ${index + 1}`}
            onClick={(event) => {
              if (!onChange) return
              const box = event.currentTarget.getBoundingClientRect()
              const leftHalf = event.clientX - box.left < box.width / 2
              onChange(index + (leftHalf ? 0.5 : 1))
            }}
          >
            {symbol}
            <span
              className={styles.overlay}
              style={{ width: `${fill * 100}%`, color: filledColor }}
              aria-hidden="true"
            >
              {symbol}
            </span>
          </button>
        )
      })}

      {showValue && (
        <span
          className={styles.value}
          style={{ fontSize: valueSize, color: valueColor, marginLeft: gap }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </span>
  )
}
