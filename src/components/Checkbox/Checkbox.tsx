import type { CSSProperties } from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: number
  radius?: number
  gap?: number
  borderWidth?: number
  glyph?: string
  checkedColor?: string
  borderColor?: string
  glyphColor?: string
  background?: string
  labelSize?: number
  labelWeight?: number
  labelColor?: string
  /** Omitted by the playground — `checked` is driven by the controls panel. */
  onChange?: (checked: boolean) => void
}

export default function Checkbox({
  label = 'Ship preview builds',
  checked = false,
  indeterminate = false,
  disabled = false,
  size = 18,
  radius = 4,
  gap = 9,
  borderWidth = 1.5,
  glyph = '✓',
  checkedColor = '#4f46e5',
  borderColor = '#cbd2da',
  glyphColor = '#ffffff',
  background = '#ffffff',
  labelSize = 14,
  labelWeight = 400,
  labelColor = '#17191c',
  onChange,
}: CheckboxProps) {
  const on = checked || indeterminate

  const box: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    borderWidth,
    borderColor: on ? checkedColor : borderColor,
    backgroundColor: on ? checkedColor : background,
    color: glyphColor,
    fontSize: Math.round(size * 0.68),
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`} style={{ gap }}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className={styles.box} style={box} aria-hidden="true">
        {indeterminate ? (
          <span className={styles.dash} style={{ backgroundColor: glyphColor }} />
        ) : (
          checked && glyph
        )}
      </span>
      {label && (
        <span style={{ fontSize: labelSize, fontWeight: labelWeight, color: labelColor }}>{label}</span>
      )}
    </label>
  )
}
