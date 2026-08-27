import type { CSSProperties } from 'react'
import styles from './SegmentedControl.module.css'

export interface SegmentedControlProps {
  /** Comma-separated segment labels. */
  options?: string
  selectedIndex?: number
  fullWidth?: boolean
  width?: number
  padding?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  fontSize?: number
  fontWeight?: number
  uppercase?: boolean
  trackColor?: string
  indicatorColor?: string
  activeTextColor?: string
  textColor?: string
  shadow?: boolean
  onSelect?: (index: number) => void
}

export default function SegmentedControl({
  options = 'Day, Week, Month',
  selectedIndex = 0,
  fullWidth = false,
  width = 280,
  padding = 3,
  paddingX = 14,
  paddingY = 7,
  radius = 8,
  fontSize = 13,
  fontWeight = 500,
  uppercase = false,
  trackColor = '#eceef1',
  indicatorColor = '#ffffff',
  activeTextColor = '#17191c',
  textColor = '#6b7280',
  shadow = true,
  onSelect,
}: SegmentedControlProps) {
  const items = options
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const count = Math.max(1, items.length)
  const index = Math.min(Math.max(0, selectedIndex), count - 1)

  // One segment wide, slid across by its index — the classic sliding thumb.
  const indicator: CSSProperties = {
    width: `calc((100% - ${padding * 2}px) / ${count})`,
    transform: `translateX(${index * 100}%)`,
    backgroundColor: indicatorColor,
    borderRadius: Math.max(0, radius - padding),
    boxShadow: shadow ? '0 1px 3px rgba(15, 23, 42, 0.16)' : undefined,
    top: padding,
    bottom: padding,
    left: padding,
  }

  return (
    <div
      className={styles.control}
      style={{
        width: fullWidth ? '100%' : width,
        padding,
        borderRadius: radius,
        backgroundColor: trackColor,
      }}
      role="tablist"
    >
      <span className={styles.indicator} style={indicator} aria-hidden="true" />

      {items.map((item, i) => (
        <button
          key={`${item}-${i}`}
          type="button"
          role="tab"
          aria-selected={i === index}
          className={styles.segment}
          style={{
            padding: `${paddingY}px ${paddingX}px`,
            borderRadius: Math.max(0, radius - padding),
            fontSize,
            fontWeight,
            textTransform: uppercase ? 'uppercase' : 'none',
            color: i === index ? activeTextColor : textColor,
          }}
          onClick={() => onSelect?.(i)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
