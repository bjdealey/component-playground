import type { CSSProperties } from 'react'
import styles from './Slider.module.css'

export interface SliderProps {
  label?: string
  value?: number
  min?: number
  max?: number
  step?: number
  width?: number
  trackHeight?: number
  thumbSize?: number
  radius?: number
  gap?: number
  showValue?: boolean
  disabled?: boolean
  trackColor?: string
  fillColor?: string
  thumbColor?: string
  thumbBorderColor?: string
  thumbBorderWidth?: number
  labelSize?: number
  labelColor?: string
  onChange?: (value: number) => void
}

export default function Slider({
  label = 'Concurrency',
  value = 40,
  min = 0,
  max = 100,
  step = 1,
  width = 280,
  trackHeight = 6,
  thumbSize = 18,
  radius = 999,
  gap = 8,
  showValue = true,
  disabled = false,
  trackColor = '#e3e6ea',
  fillColor = '#4f46e5',
  thumbColor = '#ffffff',
  thumbBorderColor = '#4f46e5',
  thumbBorderWidth = 2,
  labelSize = 13,
  labelColor = '#17191c',
  onChange,
}: SliderProps) {
  const span = max - min
  const ratio = span > 0 ? Math.min(1, Math.max(0, (value - min) / span)) : 0

  const thumb: CSSProperties = {
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
    borderColor: thumbBorderColor,
    borderWidth: thumbBorderWidth,
    // Keep the thumb inside the track at both ends rather than hanging off.
    left: `calc(${ratio * 100}% - ${thumbSize * ratio}px)`,
  }

  return (
    <div className={styles.wrapper} style={{ width, gap }}>
      {(label || showValue) && (
        <div className={styles.header} style={{ fontSize: labelSize, color: labelColor }}>
          {label && <span>{label}</span>}
          {showValue && <span className={styles.value}>{value}</span>}
        </div>
      )}

      <div
        className={`${styles.control} ${disabled ? styles.disabled : ''}`}
        style={{ height: Math.max(trackHeight, thumbSize) }}
      >
        {/*
          The native input comes first so `~ .thumb` can style the focus ring.
          The visuals below it are pointer-events: none, so drags and clicks
          still land on the input.
        */}
        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          aria-label={label || 'Slider'}
          onChange={(event) => onChange?.(Number(event.target.value))}
        />

        <span
          className={styles.track}
          style={{ height: trackHeight, borderRadius: radius, backgroundColor: trackColor }}
        />
        <span
          className={styles.fill}
          style={{
            height: trackHeight,
            borderRadius: radius,
            backgroundColor: fillColor,
            width: `${ratio * 100}%`,
          }}
        />
        <span className={styles.thumb} style={thumb} />
      </div>
    </div>
  )
}
