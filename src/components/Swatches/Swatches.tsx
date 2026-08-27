import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Swatches.module.css'

export interface SwatchesProps {
  /** Comma-separated hex values. */
  colors?: string
  selectedIndex?: number
  columns?: number
  size?: number
  gap?: number
  radius?: number
  ringWidth?: number
  ringOffset?: number
  ringColor?: string
  borderWidth?: number
  borderColor?: string
  showLabels?: boolean
  labelSize?: number
  labelColor?: string
  /**
   * How far the swatch lifts under the pointer. 1 is no lift. The swatch keeps
   * its colour either way — a tint would misrepresent the colour on offer.
   */
  hoverScale?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

export default function Swatches({
  colors = '#4f46e5, #0ea5e9, #15803d, #d97706, #dc2626, #db2777, #7c3aed, #0f172a',
  selectedIndex = 0,
  columns = 4,
  size = 34,
  gap = 8,
  radius = 8,
  ringWidth = 2,
  ringOffset = 2,
  ringColor = '#17191c',
  borderWidth = 1,
  borderColor = 'rgba(15,23,42,0.1)',
  showLabels = false,
  labelSize = 10,
  labelColor = '#9aa1ab',
  hoverScale = 1.06,
  hovered = false,
  onSelect,
  onHoverChange,
}: SwatchesProps) {
  const swatches = colors
    .split(',')
    .map((color) => color.trim())
    .filter((color) => color.length > 0)

  return (
    <div
      className={styles.grid}
      style={{ gap, gridTemplateColumns: `repeat(${Math.max(1, columns)}, auto)` }}
      role="radiogroup"
      aria-label="Colour swatches"
    >
      {swatches.map((color, index) => {
        const selected = index === selectedIndex

        const swatch: CSSProperties = {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: color,
          borderWidth,
          borderColor,
          // Ring sits outside the swatch so it never shrinks the colour area.
          boxShadow: selected
            ? `0 0 0 ${ringOffset}px #ffffff, 0 0 0 ${ringOffset + ringWidth}px ${ringColor}`
            : undefined,
        }

        return (
          <button
            key={`${color}-${index}`}
            type="button"
            className={styles.item}
            // The scale sits on the button and inherits down to the swatch,
            // which is where the rule that reads it applies.
            style={{ gap: gap / 2, ...hoverStyle('swatches', { scale: hoverScale }) }}
            role="radio"
            aria-checked={selected}
            aria-label={color}
            title={color}
            onClick={() => onSelect?.(index)}
            // Pinning the whole grid would lift every swatch at once, so the
            // first one stands in for the rest.
            {...hoverable(hovered && index === 0, onHoverChange)}
          >
            <span className={styles.swatch} style={swatch} />
            {showLabels && (
              <span className={styles.label} style={{ fontSize: labelSize, color: labelColor }}>
                {color}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
