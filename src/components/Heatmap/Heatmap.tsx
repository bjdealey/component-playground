import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Heatmap.module.css'

export interface HeatmapProps {
  /** Rows separated by `;`, cells within a row separated by `,`. */
  data?: string
  /** Comma-separated row labels. */
  rowLabels?: string
  /** Comma-separated column labels. */
  columnLabels?: string
  /**
   * Comma-separated ramp, light → dark. Sequential data reads as one hue that
   * only changes in lightness — a multi-hue ramp encodes magnitude as identity.
   */
  ramp?: string
  emptyColor?: string
  max?: number
  cellSize?: number
  gap?: number
  radius?: number
  showRowLabels?: boolean
  showColumnLabels?: boolean
  showLegend?: boolean
  legendLabel?: string
  labelSize?: number
  labelColor?: string
  /** Receives the cell's row and column — a flat index would lose an axis. */
  onSelectCell?: (row: number, column: number) => void
  /**
   * Marks keep their series colour on hover — a recolour would make one mark
   * read as a different series. Brightness preserves identity while still
   * signalling the target.
   */
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onHoverChange?: (hovered: boolean) => void
}

const FALLBACK_RAMP = ['#dcfce7', '#a7e8bd', '#5fce8c', '#2fa85f', '#15803d']

function splitList(value: string, delimiter: string): string[] {
  return value
    .split(delimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export default function Heatmap({
  data = '0,1,2,1,0,3,2;1,3,4,2,1,0,0;2,4,4,3,2,1,1;0,0,1,4,3,2,0',
  rowLabels = 'W1, W2, W3, W4',
  columnLabels = 'M, T, W, T, F, S, S',
  ramp = '#dcfce7, #a7e8bd, #5fce8c, #2fa85f, #15803d',
  emptyColor = '#eceef1',
  max = 4,
  cellSize = 16,
  gap = 3,
  radius = 3,
  showRowLabels = true,
  showColumnLabels = true,
  showLegend = true,
  legendLabel = 'Deploys',
  labelSize = 10.5,
  labelColor = '#9aa1ab',
  onSelectCell,
  hoverBrightness = 0.88,
  hovered = false,
  onHoverChange,
}: HeatmapProps) {
  const rows = splitList(data, ';').map((row) =>
    row.split(',').map((cell) => Number(cell.trim())),
  )
  const steps = splitList(ramp, ',')
  const scale = steps.length > 0 ? steps : FALLBACK_RAMP
  const rowNames = splitList(rowLabels, ',')
  const colNames = splitList(columnLabels, ',')
  const ceiling = max > 0 ? max : 1

  const colorFor = (value: number): string => {
    if (!Number.isFinite(value) || value <= 0) return emptyColor
    const ratio = Math.min(1, value / ceiling)
    const index = Math.min(scale.length - 1, Math.ceil(ratio * scale.length) - 1)
    return scale[Math.max(0, index)]
  }

  const labelWidth = showRowLabels ? Math.max(18, labelSize * 2.2) : 0

  return (
    <div className={styles.heatmap} style={{ gap: gap + 2 }}>
      {showColumnLabels && colNames.length > 0 && (
        <div className={styles.columns} style={{ gap, paddingLeft: labelWidth + (showRowLabels ? gap : 0) }}>
          {colNames.map((name, index) => (
            <span
              key={index}
              className={styles.columnLabel}
              style={{ width: cellSize, fontSize: labelSize, color: labelColor }}
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row} style={{ gap }}>
          {showRowLabels && (
            <span
              className={styles.rowLabel}
              style={{ width: labelWidth, height: cellSize, fontSize: labelSize, color: labelColor }}
            >
              {rowNames[rowIndex] ?? ''}
            </span>
          )}

          {row.map((value, cellIndex) => (
            <span
              key={cellIndex}
              className={styles.cell}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: radius,
                backgroundColor: colorFor(value),
                ...hoverStyle('heatmap', { brightness: hoverBrightness }),
              }}
              // Per-cell hover readout — the tooltip layer a matrix should ship.
              title={`${rowNames[rowIndex] ?? rowIndex + 1} · ${colNames[cellIndex] ?? cellIndex + 1}: ${value}`}
              {...clickable(
                onSelectCell ? () => onSelectCell(rowIndex, cellIndex) : undefined,
              )}
              // Pinning every cell would just redraw the whole matrix darker, so
              // the pin lands on one cell you can compare against its neighbours.
              {...hoverable(hovered && rowIndex === 0 && cellIndex === 0, onHoverChange)}
            />
          ))}
        </div>
      ))}

      {showLegend && (
        <div className={styles.legend} style={{ gap, marginTop: gap, fontSize: labelSize, color: labelColor }}>
          {legendLabel && <span>{legendLabel}</span>}
          <span className={styles.legendSteps} style={{ gap: Math.max(2, gap - 1) }}>
            <span
              className={styles.cell}
              style={{ width: cellSize * 0.75, height: cellSize * 0.75, borderRadius: radius, backgroundColor: emptyColor }}
            />
            {scale.map((step, index) => (
              <span
                key={index}
                className={styles.cell}
                style={{ width: cellSize * 0.75, height: cellSize * 0.75, borderRadius: radius, backgroundColor: step }}
              />
            ))}
          </span>
          <span>{ceiling}+</span>
        </div>
      )}
    </div>
  )
}
