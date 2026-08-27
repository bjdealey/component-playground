import type { CSSProperties } from 'react'
import styles from './Input.module.css'

export interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  helperText?: string
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  width?: number
  gap?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  labelSize?: number
  helperSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  labelColor?: string
  focusColor?: string
  invalidColor?: string
}

export default function Input({
  label = 'Email',
  placeholder = 'you@example.com',
  value = '',
  onChange,
  helperText = '',
  invalid = false,
  disabled = false,
  required = false,
  fullWidth = false,
  width = 280,
  gap = 6,
  paddingX = 12,
  paddingY = 9,
  radius = 6,
  borderWidth = 1,
  fontSize = 14,
  labelSize = 13,
  helperSize = 12,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  labelColor = '#17191c',
  focusColor = '#4f46e5',
  invalidColor = '#dc2626',
}: InputProps) {
  const edge = invalid ? invalidColor : borderColor

  const wrapper: CSSProperties = {
    width: fullWidth ? '100%' : width,
    gap,
    // Border colors travel as custom properties rather than inline styles on the
    // input: an inline border-color would outrank the stylesheet's :focus rule,
    // leaving the focus state with nothing to change.
    ['--input-border' as string]: edge,
    ['--focus-color' as string]: invalid ? invalidColor : focusColor,
  }

  const field: CSSProperties = {
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: radius,
    borderWidth,
    backgroundColor: background,
    color: textColor,
    fontSize,
  }

  return (
    <label className={styles.wrapper} style={wrapper}>
      {label && (
        <span className={styles.label} style={{ fontSize: labelSize, color: labelColor }}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      )}

      <input
        type="text"
        className={styles.input}
        style={field}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        // Always a function, so React never warns about a value with no handler.
        onChange={(event) => onChange?.(event.target.value)}
      />

      {helperText && (
        <span
          className={styles.helper}
          style={{ fontSize: helperSize, color: invalid ? invalidColor : '#6b7280' }}
        >
          {helperText}
        </span>
      )}
    </label>
  )
}
