import IconBadge from '../IconBadge/IconBadge'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Legend.module.css'

export interface LegendProps {
  /** Series separated by `;`, each `label|value`. */
  items?: string
  /** Comma-separated swatch colours, assigned in fixed order. */
  palette?: string
  orientation?: 'vertical' | 'horizontal'
  swatchSize?: number
  swatchRadius?: number
  gap?: number
  rowGap?: number
  showValues?: boolean
  fontSize?: number
  labelColor?: string
  valueColor?: string
  width?: number
  /** Empty keeps `labelColor`. */
  hoverTextColor?: string
  /** The underline is what says "this row does something"; off leaves it to colour. */
  hoverUnderline?: boolean
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Receives the series index — a legend's usual job is showing and hiding. */
  onToggle?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

/** Swatches are real `IconBadge`s with no glyph — no fresh coloured square. */
export default function Legend({
  items = 'Direct|42%;Search|27%;Social|18%;Referral|13%',
  palette = '#4f46e5, #0284c7, #15803d, #d97706, #db2777, #7c3aed',
  orientation = 'vertical',
  swatchSize = 10,
  swatchRadius = 3,
  gap = 8,
  rowGap = 6,
  showValues = true,
  fontSize = 12.5,
  labelColor = '#3f434a',
  valueColor = '#9aa1ab',
  width = 180,
  hoverTextColor = '',
  hoverUnderline = true,
  hovered = false,
  onToggle,
  onHoverChange,
}: LegendProps) {
  const rows = items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [label = '', value = ''] = chunk.split('|')
      return { label: label.trim(), value: value.trim() }
    })

  const colors = palette
    .split(',')
    .map((color) => color.trim())
    .filter((color) => color.length > 0)

  return (
    <div
      className={`${styles.legend} ${orientation === 'horizontal' ? styles.horizontal : ''}`}
      style={{ gap: rowGap, width: orientation === 'vertical' ? width : undefined }}
    >
      {rows.map((row, index) => (
        <span
          key={index}
          // Only a togglable row has a hover state to show, so the class that
          // carries it is gated on the handler.
          className={`${styles.item} ${onToggle ? styles.interactive : ''}`}
          // The hover properties sit on the row and inherit down to the label,
          // which is where the rule that reads them applies.
          style={{
            gap,
            fontSize,
            // Not a colour, so it travels beside `hoverStyle` rather than through it.
            ['--legend-label-hover-decoration' as string]: hoverUnderline
              ? 'underline'
              : 'none',
            ...hoverStyle('legend-label', { color: hoverTextColor }),
          }}
          {...clickable(onToggle ? () => onToggle(index) : undefined)}
          // Pinning every row would underline the whole legend, so the first
          // series stands in for the rest.
          {...hoverable(hovered && index === 0, onHoverChange)}
        >
          <IconBadge
            glyph=""
            size={swatchSize}
            shape="rounded"
            radius={swatchRadius}
            background={colors[index % Math.max(1, colors.length)] ?? '#4f46e5'}
          />
          <span
            className={styles.label}
            // Routed through a custom property, not set directly: an inline
            // colour would outrank the :hover rule and kill the state.
            style={{ ['--legend-label-color' as string]: labelColor }}
          >
            {row.label}
          </span>
          {showValues && row.value && (
            <span className={styles.value} style={{ color: valueColor }}>
              {row.value}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
