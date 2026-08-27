import type { CSSProperties } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Chip.module.css'

export interface ChipProps {
  label?: string
  selected?: boolean
  removable?: boolean
  removed?: boolean
  dot?: boolean
  paddingX?: number
  paddingY?: number
  gap?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  fontWeight?: number
  background?: string
  textColor?: string
  borderColor?: string
  selectedBackground?: string
  selectedTextColor?: string
  selectedBorderColor?: string
  dotColor?: string
  onToggle?: (selected: boolean) => void
  onRemove?: (removed: boolean) => void
}

export default function Chip({
  label = 'TypeScript',
  selected = false,
  removable = false,
  removed = false,
  dot = false,
  paddingX = 11,
  paddingY = 6,
  gap = 7,
  radius = 999,
  borderWidth = 1,
  fontSize = 13,
  fontWeight = 500,
  background = '#ffffff',
  textColor = '#3f434a',
  borderColor = '#d3d8de',
  selectedBackground = '#eef2ff',
  selectedTextColor = '#4f46e5',
  selectedBorderColor = '#4f46e5',
  dotColor = '',
  onToggle,
  onRemove,
}: ChipProps) {
  if (removed) return null

  const style: CSSProperties = {
    padding: `${paddingY}px ${paddingX}px`,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor: selected ? selectedBorderColor : borderColor,
    backgroundColor: selected ? selectedBackground : background,
    color: selected ? selectedTextColor : textColor,
    fontSize,
    fontWeight,
  }

  return (
    <span className={styles.chip} style={style} data-selected={selected || undefined}>
      <button
        type="button"
        className={styles.body}
        style={{ gap }}
        aria-pressed={selected}
        onClick={() => onToggle?.(!selected)}
      >
        {dot && (
          <span
            className={styles.dot}
            style={{ backgroundColor: dotColor || 'currentColor' }}
          />
        )}
        {label}
      </button>

      {removable && (
        <IconButton
          glyph="×"
          label={`Remove ${label}`}
          size={Math.round(fontSize * 1.15)}
          shape="circle"
          color="currentColor"
          fontScale={1}
          onClick={() => onRemove?.(true)}
        />
      )}
    </span>
  )
}
