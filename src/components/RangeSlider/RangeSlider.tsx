import type { CSSProperties } from 'react'
import styles from './RangeSlider.module.css'

export interface RangeSliderProps {
  label?: string
  low?: number
  high?: number
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  showValues?: boolean
  disabled?: boolean
  width?: number
  trackHeight?: number
  thumbSize?: number
  radius?: number
  gap?: number
  trackColor?: string
  fillColor?: string
  thumbColor?: string
  thumbBorderColor?: string
  thumbBorderWidth?: number
  labelSize?: number
  labelColor?: string
  onLowChange?: (low: number) => void
  onHighChange?: (high: number) => void
}

export default function RangeSlider({
  label = 'Price range',
  low = 25,
  high = 70,
  min = 0,
  max = 100,
  step = 1,
  prefix = '$',
  suffix = '',
  showValues = true,
  disabled = false,
  width = 280,
  trackHeight = 6,
  thumbSize = 18,
  radius = 999,
  gap = 8,
  trackColor = '#e3e6ea',
  fillColor = '#4f46e5',
  thumbColor = '#ffffff',
  thumbBorderColor = '#4f46e5',
  thumbBorderWidth = 2,
  labelSize = 13,
  labelColor = '#17191c',
  onLowChange,
  onHighChange,
}: RangeSliderProps) {
  const span = max - min || 1
  // Keep the pair ordered no matter which thumb was dragged past the other.
  const lo = Math.min(low, high)
  const hi = Math.max(low, high)

  const loRatio = Math.min(1, Math.max(0, (lo - min) / span))
  const hiRatio = Math.min(1, Math.max(0, (hi - min) / span))

  const thumb = (ratio: number): CSSProperties => ({
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
    borderColor: thumbBorderColor,
    borderWidth: thumbBorderWidth,
    left: `calc(${ratio * 100}% - ${thumbSize * ratio}px)`,
  })

  return (
    <div className={styles.wrapper} style={{ width, gap }}>
      {(label || showValues) && (
        <div className={styles.header} style={{ fontSize: labelSize, color: labelColor }}>
          {label && <span>{label}</span>}
          {showValues && (
            <span className={styles.values}>
              {prefix}
              {lo}
              {suffix} – {prefix}
              {hi}
              {suffix}
            </span>
          )}
        </div>
      )}

      <div
        className={`${styles.control} ${disabled ? styles.disabled : ''}`}
        style={{ height: Math.max(trackHeight, thumbSize) }}
      >
        {/*
          Two stacked range inputs. Each only accepts pointer events near its own
          thumb, so the pair can be dragged independently without one swallowing
          the other's hit area.
        */}
        <input
          type="range"
          className={`${styles.input} ${styles.lowInput}`}
          min={min}
          max={max}
          step={step}
          value={lo}
          disabled={disabled}
          aria-label={`${label || 'Range'} minimum`}
          onChange={(event) => onLowChange?.(Math.min(Number(event.target.value), hi))}
        />
        <input
          type="range"
          className={`${styles.input} ${styles.highInput}`}
          min={min}
          max={max}
          step={step}
          value={hi}
          disabled={disabled}
          aria-label={`${label || 'Range'} maximum`}
          onChange={(event) => onHighChange?.(Math.max(Number(event.target.value), lo))}
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
            left: `${loRatio * 100}%`,
            width: `${(hiRatio - loRatio) * 100}%`,
          }}
        />
        <span className={styles.thumb} style={thumb(loRatio)} />
        <span className={styles.thumb} style={thumb(hiRatio)} />
      </div>
    </div>
  )
}
