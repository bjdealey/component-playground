import type { CSSProperties } from 'react'
import styles from './RadioGroup.module.css'

export interface RadioGroupProps {
  legend?: string
  /** Comma-separated options — manifest props are primitives. */
  options?: string
  selectedIndex?: number
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  size?: number
  dotScale?: number
  borderWidth?: number
  gap?: number
  optionGap?: number
  selectedColor?: string
  borderColor?: string
  dotColor?: string
  labelColor?: string
  legendColor?: string
  labelSize?: number
  labelWeight?: number
  legendSize?: number
  onSelect?: (index: number) => void
}

export default function RadioGroup({
  legend = 'Deploy target',
  options = 'Production, Staging, Preview',
  selectedIndex = 0,
  orientation = 'vertical',
  disabled = false,
  size = 18,
  dotScale = 0.45,
  borderWidth = 1.5,
  gap = 10,
  optionGap = 9,
  selectedColor = '#4f46e5',
  borderColor = '#cbd2da',
  dotColor = '#4f46e5',
  labelColor = '#17191c',
  legendColor = '#6b7280',
  labelSize = 14,
  labelWeight = 400,
  legendSize = 12,
  onSelect,
}: RadioGroupProps) {
  const items = options
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  return (
    <div
      className={`${styles.group} ${disabled ? styles.disabled : ''}`}
      style={{ gap }}
      role="radiogroup"
      aria-label={legend || 'Options'}
    >
      {legend && (
        <span className={styles.legend} style={{ fontSize: legendSize, color: legendColor }}>
          {legend}
        </span>
      )}

      <div
        className={`${styles.options} ${orientation === 'horizontal' ? styles.horizontal : ''}`}
        style={{ gap }}
      >
        {items.map((item, index) => {
          const checked = index === selectedIndex

          const circle: CSSProperties = {
            width: size,
            height: size,
            borderWidth,
            borderColor: checked ? selectedColor : borderColor,
          }

          const dot: CSSProperties = {
            width: size * dotScale,
            height: size * dotScale,
            backgroundColor: dotColor,
          }

          return (
            <label key={`${item}-${index}`} className={styles.option} style={{ gap: optionGap }}>
              <input
                type="radio"
                className={styles.input}
                checked={checked}
                disabled={disabled}
                onChange={() => onSelect?.(index)}
              />
              <span className={styles.circle} style={circle}>
                {checked && <span className={styles.dot} style={dot} />}
              </span>
              <span style={{ fontSize: labelSize, fontWeight: labelWeight, color: labelColor }}>{item}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
