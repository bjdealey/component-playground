import type { CSSProperties } from 'react'
import styles from './Select.module.css'

export interface SelectProps {
  label?: string
  /** Comma-separated options — manifest props are primitives. */
  options?: string
  selectedIndex?: number
  helperText?: string
  invalid?: boolean
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  gap?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  labelSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  focusColor?: string
  labelColor?: string
  chevronColor?: string
  /** Omitted by the playground — `selectedIndex` is driven by the controls panel. */
  onSelect?: (index: number) => void
}

export default function Select({
  label = 'Environment',
  options = 'Production, Staging, Preview',
  selectedIndex = 0,
  helperText = '',
  invalid = false,
  disabled = false,
  fullWidth = false,
  width = 260,
  gap = 6,
  paddingX = 12,
  paddingY = 9,
  radius = 6,
  borderWidth = 1,
  fontSize = 14,
  labelSize = 13,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  labelColor = '#17191c',
  chevronColor = '#6b7280',
  onSelect,
}: SelectProps) {
  const items = options
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const index = Math.min(Math.max(0, selectedIndex), Math.max(0, items.length - 1))

  const wrapper: CSSProperties = {
    width: fullWidth ? '100%' : width,
    gap,
    // See Input: border color travels as a custom property so :focus can win.
    ['--select-border' as string]: invalid ? '#dc2626' : borderColor,
    ['--focus-color' as string]: invalid ? '#dc2626' : focusColor,
  }

  const field: CSSProperties = {
    padding: `${paddingY}px ${paddingX}px`,
    paddingRight: paddingX + 20,
    borderRadius: radius,
    borderWidth,
    backgroundColor: background,
    color: textColor,
    fontSize,
  }

  return (
    <label className={styles.wrapper} style={wrapper}>
      {label && (
        <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
      )}

      <span className={styles.field}>
        <select
          className={styles.select}
          style={field}
          value={items[index] ?? ''}
          disabled={disabled}
          onChange={(event) => onSelect?.(items.indexOf(event.target.value))}
        >
          {items.map((item, i) => (
            <option key={`${item}-${i}`} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span
          className={styles.chevron}
          style={{ borderTopColor: chevronColor, right: paddingX }}
          aria-hidden="true"
        />
      </span>

      {helperText && (
        <span
          className={styles.helper}
          style={{ color: invalid ? '#dc2626' : '#6b7280' }}
        >
          {helperText}
        </span>
      )}
    </label>
  )
}
