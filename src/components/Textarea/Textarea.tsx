import type { CSSProperties } from 'react'
import styles from './Textarea.module.css'

export interface TextareaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  helperText?: string
  rows?: number
  resize?: 'none' | 'vertical' | 'both'
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
  lineHeight?: number
  labelSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  focusColor?: string
  labelColor?: string
}

export default function Textarea({
  label = 'Release notes',
  placeholder = 'What changed in this deploy?',
  value = '',
  onChange,
  helperText = '',
  rows = 4,
  resize = 'vertical',
  invalid = false,
  disabled = false,
  fullWidth = false,
  width = 320,
  gap = 6,
  paddingX = 12,
  paddingY = 10,
  radius = 6,
  borderWidth = 1,
  fontSize = 14,
  lineHeight = 1.5,
  labelSize = 13,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  labelColor = '#17191c',
}: TextareaProps) {
  const wrapper: CSSProperties = {
    width: fullWidth ? '100%' : width,
    gap,
    ['--area-border' as string]: invalid ? '#dc2626' : borderColor,
    ['--focus-color' as string]: invalid ? '#dc2626' : focusColor,
  }

  const field: CSSProperties = {
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: radius,
    borderWidth,
    backgroundColor: background,
    color: textColor,
    fontSize,
    lineHeight,
    resize,
  }

  return (
    <label className={styles.wrapper} style={wrapper}>
      {label && (
        <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
      )}

      <textarea
        className={styles.area}
        style={field}
        rows={rows}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChange?.(event.target.value)}
      />

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
