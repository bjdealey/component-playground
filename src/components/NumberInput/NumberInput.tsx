import IconButton from '../IconButton/IconButton'
import styles from './NumberInput.module.css'

export interface NumberInputProps {
  label?: string
  value?: number
  min?: number
  max?: number
  step?: number
  suffix?: string
  disabled?: boolean
  width?: number
  height?: number
  radius?: number
  borderWidth?: number
  gap?: number
  fontSize?: number
  labelSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  buttonColor?: string
  buttonTextColor?: string
  labelColor?: string
  onChange?: (value: number) => void
}

export default function NumberInput({
  label = 'Replicas',
  value = 3,
  min = 0,
  max = 20,
  step = 1,
  suffix = '',
  disabled = false,
  width = 160,
  height = 36,
  radius = 6,
  borderWidth = 1,
  gap = 6,
  fontSize = 14,
  labelSize = 13,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  buttonColor = '#f3f4f6',
  buttonTextColor = '#3f434a',
  labelColor = '#17191c',
  onChange,
}: NumberInputProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next))
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && value < max


  return (
    <div className={styles.wrapper} style={{ gap }}>
      {label && (
        <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
      )}

      <div
        className={`${styles.control} ${disabled ? styles.disabled : ''}`}
        style={{
          width,
          height,
          borderRadius: radius,
          borderWidth,
          borderColor,
          backgroundColor: background,
        }}
      >
        <IconButton
          glyph="−"
          label="Decrease"
          shape="square"
          size={height}
          background={buttonColor}
          color={buttonTextColor}
          fontScale={(fontSize * 1.15) / height}
          disabled={!canDecrease}
          onClick={() => onChange?.(clamp(value - step))}
        />

        <span className={styles.value} style={{ fontSize, color: textColor }}>
          {value}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </span>

        <IconButton
          glyph="+"
          label="Increase"
          shape="square"
          size={height}
          background={buttonColor}
          color={buttonTextColor}
          fontScale={(fontSize * 1.15) / height}
          disabled={!canIncrease}
          onClick={() => onChange?.(clamp(value + step))}
        />
      </div>
    </div>
  )
}
