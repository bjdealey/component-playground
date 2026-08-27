import Input from '../Input/Input'
import Swatches from '../Swatches/Swatches'
import styles from './ColorField.module.css'

export interface ColorFieldProps {
  label?: string
  /** Comma-separated hex values to choose from. */
  colors?: string
  selectedIndex?: number
  helperText?: string
  showSwatches?: boolean
  columns?: number
  swatchSize?: number
  width?: number
  gap?: number
  radius?: number
  onSelect?: (index: number) => void
}

/**
 * A hex field backed by a swatch grid.
 *
 * `Input` and `Swatches` arrive by import because they share one value — picking
 * a swatch rewrites the field, so neither can be configured independently.
 */
export default function ColorField({
  label = 'Accent colour',
  colors = '#4f46e5, #0284c7, #15803d, #d97706, #db2777, #7c3aed, #dc2626, #0f172a',
  selectedIndex = 0,
  helperText = '',
  showSwatches = true,
  columns = 8,
  swatchSize = 30,
  width = 300,
  gap = 10,
  radius = 8,
  onSelect,
}: ColorFieldProps) {
  const palette = colors
    .split(',')
    .map((color) => color.trim())
    .filter((color) => color.length > 0)

  const index = Math.min(Math.max(0, selectedIndex), Math.max(0, palette.length - 1))
  const current = palette[index] ?? '#000000'

  return (
    <div className={styles.field} style={{ width, gap }}>
      <span className={styles.row} style={{ gap }}>
        <span
          className={styles.preview}
          style={{ backgroundColor: current, borderRadius: radius, width: 38, height: 38 }}
          aria-hidden="true"
        />
        <span className={styles.input}>
          <Input
            label={label}
            value={current}
            placeholder="#000000"
            helperText={helperText}
            fullWidth
            radius={radius}
            focusColor={current}
          />
        </span>
      </span>

      {showSwatches && (
        <Swatches
          colors={colors}
          selectedIndex={index}
          columns={columns}
          size={swatchSize}
          gap={gap * 0.7}
          radius={radius - 2}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}
