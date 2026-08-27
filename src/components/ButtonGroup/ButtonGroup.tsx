import type { CSSProperties } from 'react'
import Button from '../Button/Button'
import styles from './ButtonGroup.module.css'

export interface ButtonGroupProps {
  /** Comma-separated labels. */
  items?: string
  activeIndex?: number
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
  activeVariant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
  radius?: number
  paddingX?: number
  paddingY?: number
  fontSize?: number
  fullWidth?: boolean
  onSelect?: (index: number) => void
}

/**
 * Real `Button`s joined into one control.
 *
 * Button exposes a single `radius`, so the rounding is done by a clipping
 * wrapper per seat rather than by asking Button for per-corner radii.
 */
export default function ButtonGroup({
  items = 'Left, Centre, Right',
  activeIndex = 0,
  variant = 'secondary',
  activeVariant = 'primary',
  radius = 6,
  paddingX = 14,
  paddingY = 8,
  fontSize = 13,
  fullWidth = false,
  onSelect,
}: ButtonGroupProps) {
  const labels = items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const seat = (index: number): CSSProperties => {
    const first = index === 0
    const last = index === labels.length - 1
    return {
      borderRadius: `${first ? radius : 0}px ${last ? radius : 0}px ${last ? radius : 0}px ${first ? radius : 0}px`,
      // Collapse the shared edge so neighbours read as one control.
      marginLeft: first ? 0 : -1,
      flex: fullWidth ? 1 : undefined,
    }
  }

  return (
    <div className={styles.group} style={{ width: fullWidth ? '100%' : undefined }} role="group">
      {labels.map((label, index) => (
        <span key={`${label}-${index}`} className={styles.seat} style={seat(index)}>
          <Button
            variant={index === activeIndex ? activeVariant : variant}
            radius={0}
            paddingX={paddingX}
            paddingY={paddingY}
            fontSize={fontSize}
            fullWidth={fullWidth}
            onClick={() => onSelect?.(index)}
          >
            {label}
          </Button>
        </span>
      ))}
    </div>
  )
}
