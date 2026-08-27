import type { CSSProperties } from 'react'
import styles from './PinInput.module.css'

export interface PinInputProps {
  value?: string
  length?: number
  label?: string
  placeholder?: string
  masked?: boolean
  disabled?: boolean
  invalid?: boolean
  boxWidth?: number
  boxHeight?: number
  gap?: number
  groupAfter?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  labelSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  focusColor?: string
  filledBorderColor?: string
  invalidColor?: string
  labelColor?: string
  onChange?: (value: string) => void
}

export default function PinInput({
  value = '',
  length = 6,
  label = 'Verification code',
  placeholder = '·',
  masked = false,
  disabled = false,
  invalid = false,
  boxWidth = 40,
  boxHeight = 46,
  gap = 8,
  groupAfter = 3,
  radius = 8,
  borderWidth = 1,
  fontSize = 18,
  labelSize = 13,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  filledBorderColor = '#9aa1ab',
  invalidColor = '#dc2626',
  labelColor = '#17191c',
  onChange,
}: PinInputProps) {
  const count = Math.max(1, Math.round(length))
  const chars = value.slice(0, count).split('')

  function setChar(index: number, char: string) {
    const next = value.slice(0, count).padEnd(count, ' ').split('')
    next[index] = char.slice(-1) || ' '
    onChange?.(next.join('').replace(/\s+$/, ''))
  }

  const box = (index: number): CSSProperties => ({
    width: boxWidth,
    height: boxHeight,
    borderRadius: radius,
    borderWidth,
    backgroundColor: background,
    color: textColor,
    fontSize,
    // Filled boxes read slightly stronger than empty ones.
    ['--box-border' as string]: invalid
      ? invalidColor
      : chars[index] && chars[index] !== ' '
        ? filledBorderColor
        : borderColor,
  })

  return (
    <div
      className={styles.wrapper}
      style={{ gap: 8, ['--focus-color' as string]: invalid ? invalidColor : focusColor }}
    >
      {label && (
        <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
      )}

      <div className={`${styles.boxes} ${disabled ? styles.disabled : ''}`} style={{ gap }}>
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className={styles.slot} style={{ marginRight: groupAfter > 0 && (index + 1) % groupAfter === 0 && index < count - 1 ? gap : 0 }}>
            <input
              type={masked ? 'password' : 'text'}
              inputMode="numeric"
              className={styles.box}
              style={box(index)}
              maxLength={1}
              disabled={disabled}
              aria-label={`Digit ${index + 1}`}
              aria-invalid={invalid || undefined}
              placeholder={placeholder}
              value={(chars[index] ?? '').trim()}
              onChange={(event) => setChar(index, event.target.value)}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
