import Chip from '../Chip/Chip'
import styles from './ChipGroup.module.css'

export interface ChipGroupProps {
  /** Comma-separated labels. */
  items?: string
  selectedIndex?: number
  max?: number
  removable?: boolean
  gap?: number
  wrap?: boolean
  chipRadius?: number
  borderWidth?: number
  chipPaddingX?: number
  chipPaddingY?: number
  fontSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  selectedBackground?: string
  selectedTextColor?: string
  selectedBorderColor?: string
  overflowBackground?: string
  overflowTextColor?: string
  onSelect?: (index: number) => void
}

/** Real `Chip`s — repeated and data-driven, so composed by import. */
export default function ChipGroup({
  items = 'react, typescript, vite, css-modules, playground, manifests',
  selectedIndex = -1,
  max = 4,
  removable = false,
  gap = 6,
  wrap = true,
  chipRadius = 999,
  borderWidth = 1,
  chipPaddingX = 11,
  chipPaddingY = 6,
  fontSize = 13,
  background = '#ffffff',
  textColor = '#3f434a',
  borderColor = '#d3d8de',
  selectedBackground = '#eef2ff',
  selectedTextColor = '#4f46e5',
  selectedBorderColor = '#4f46e5',
  overflowBackground = '#eceef1',
  overflowTextColor = '#6b7280',
  onSelect,
}: ChipGroupProps) {
  const all = items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const limit = Math.max(1, Math.round(max))
  const shown = all.slice(0, limit)
  const hidden = all.length - shown.length

  const shared = {
    radius: chipRadius,
    paddingX: chipPaddingX,
    paddingY: chipPaddingY,
    fontSize,
    borderWidth,
  } as const

  return (
    <span className={styles.group} style={{ gap, flexWrap: wrap ? 'wrap' : 'nowrap' }}>
      {shown.map((label, index) => (
        <Chip
          key={`${label}-${index}`}
          {...shared}
          label={label}
          selected={index === selectedIndex}
          removable={removable}
          background={background}
          textColor={textColor}
          borderColor={borderColor}
          selectedBackground={selectedBackground}
          selectedTextColor={selectedTextColor}
          selectedBorderColor={selectedBorderColor}
          onToggle={() => onSelect?.(index === selectedIndex ? -1 : index)}
        />
      ))}

      {hidden > 0 && (
        <Chip
          {...shared}
          label={`+${hidden}`}
          borderWidth={0}
          background={overflowBackground}
          textColor={overflowTextColor}
        />
      )}
    </span>
  )
}
