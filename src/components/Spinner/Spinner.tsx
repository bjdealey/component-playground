import type { CSSProperties } from 'react'
import styles from './Spinner.module.css'

export interface SpinnerProps {
  size?: number
  thickness?: number
  speed?: number
  color?: string
  trackColor?: string
  label?: string
  labelSize?: number
  labelColor?: string
  labelPosition?: 'right' | 'bottom'
  gap?: number
}

export default function Spinner({
  size = 28,
  thickness = 3,
  speed = 0.7,
  color = '#4f46e5',
  trackColor = '#e3e6ea',
  label = '',
  labelSize = 13,
  labelColor = '#6b7280',
  labelPosition = 'right',
  gap = 10,
}: SpinnerProps) {
  const ring: CSSProperties = {
    width: size,
    height: size,
    borderWidth: thickness,
    borderColor: trackColor,
    borderTopColor: color,
    animationDuration: `${speed}s`,
  }

  return (
    <span
      className={`${styles.wrapper} ${labelPosition === 'bottom' ? styles.column : ''}`}
      style={{ gap }}
      role="status"
      aria-label={label || 'Loading'}
    >
      <span className={styles.ring} style={ring} />
      {label && (
        <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>
      )}
    </span>
  )
}
