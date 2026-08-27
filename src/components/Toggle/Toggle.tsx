import type { CSSProperties } from 'react'
import styles from './Toggle.module.css'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps {
  checked?: boolean
  size?: ToggleSize
  disabled?: boolean
  label?: string
  labelPosition?: 'left' | 'right'
  labelSize?: number
  labelColor?: string
  gap?: number
  /** Track width as a multiple of its height. 1.75 is a classic pill. */
  ratio?: number
  trackRadius?: number
  knobRadius?: number
  knobInset?: number
  borderWidth?: number
  borderColor?: string
  onColor?: string
  offColor?: string
  knobColor?: string
  /** Omitted by the playground — `checked` is driven by the controls panel. */
  onChange?: (checked: boolean) => void
}

const HEIGHTS: Record<ToggleSize, number> = { sm: 18, md: 26, lg: 34 }

export default function Toggle({
  checked = false,
  size = 'md',
  disabled = false,
  label = '',
  labelPosition = 'right',
  labelSize = 13,
  labelColor = '#17191c',
  gap = 10,
  ratio = 1.75,
  trackRadius = 999,
  knobRadius = 999,
  knobInset = 3,
  borderWidth = 0,
  borderColor = '',
  onColor = '#4f46e5',
  offColor = '#cbd2da',
  knobColor = '#ffffff',
  onChange,
}: ToggleProps) {
  const height = HEIGHTS[size] ?? HEIGHTS.md
  const width = Math.round(height * ratio)
  const knob = Math.max(0, height - knobInset * 2)

  const track: CSSProperties = {
    width,
    height,
    borderRadius: trackRadius,
    backgroundColor: checked ? onColor : offColor,
    borderWidth,
    borderColor: borderColor || 'transparent',
  }

  const knobStyle: CSSProperties = {
    width: knob,
    height: knob,
    margin: knobInset,
    borderRadius: knobRadius,
    backgroundColor: knobColor,
    transform: checked ? `translateX(${width - knob - knobInset * 2}px)` : undefined,
  }

  const text = label ? (
    <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
  ) : null

  return (
    <span className={styles.wrapper} style={{ gap }}>
      {labelPosition === 'left' && text}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
        disabled={disabled}
        className={styles.toggle}
        style={track}
        onClick={() => onChange?.(!checked)}
      >
        <span className={styles.knob} style={knobStyle} />
      </button>
      {labelPosition === 'right' && text}
    </span>
  )
}
