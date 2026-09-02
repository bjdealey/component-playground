import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Table.module.css'

export interface TableProps {
  /** Comma-separated column headers. Leave empty to omit the header row. */
  headers?: string
  /** Rows separated by `;`, cells within a row separated by `,`. */
  rows?: string
  /** A `<caption>` title above the table. Empty omits it. */
  caption?: string
  /** A summary row rendered in `<tfoot>`, cells `,`-separated. Empty omits it. */
  footerRow?: string
  width?: number
  align?: 'left' | 'center' | 'right'
  /** Per-column overrides, one entry per header, `,`-separated. A blank entry
   *  inherits. `columnAlign` beats `align`; `columnTypes` is
   *  `text` | `number` | `status` | `mono`; `columnWidths` is `auto` or px. */
  columnAlign?: string
  columnWidths?: string
  columnTypes?: string
  /** Headers become click/keyboard sort triggers. Controlled: the component
   *  reads `sort` and reports the next state through `onSortChange`. */
  sortable?: boolean
  /** `"<columnIndex>:<asc|desc>"`, or empty for unsorted. */
  sort?: string
  /** Adds a leading checkbox column with a select-all in the header. */
  selectable?: boolean
  /** Comma-separated body-row indices in the *original* row order. */
  selected?: string
  /** Header stays put while the body scrolls (pair with `maxHeight`). */
  stickyHeader?: boolean
  /** Caps the scrolling body; 0 leaves it unbounded. */
  maxHeight?: number
  striped?: boolean
  bordered?: boolean
  compact?: boolean
  /** Hairline rules between columns. */
  columnDividers?: boolean
  radius?: number
  borderWidth?: number
  fontSize?: number
  headerSize?: number
  headerWeight?: number
  background?: string
  headerBackground?: string
  stripeColor?: string
  borderColor?: string
  textColor?: string
  headerColor?: string
  /** Drives the active sort caret and the selection checkbox tint. */
  accentColor?: string
  /** Fill of a selected row, layered over the stripe and under hover. */
  selectedBackground?: string
  uppercaseHeaders?: boolean
  /** Empty keeps the row's own fill — stripe or not; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Receives the body-row index in original order, ignoring the header. */
  onRowClick?: (index: number) => void
  /** Reports the next `sort` string when a header is activated. */
  onSortChange?: (sort: string) => void
  /** Reports the next `selected` string when a checkbox is toggled. */
  onSelectionChange?: (selected: string) => void
  onHoverChange?: (hovered: boolean) => void
}

function splitCells(row: string): string[] {
  return row.split(',').map((cell) => cell.trim())
}

// Keyword → colour for a `status` cell. Every hue is a documented DESIGN.md
// status token (success / warn / danger), so a status column adds no palette
// drift; an unmatched word falls back to the neutral header ink.
const STATUS_COLORS: Array<[RegExp, string]> = [
  [/^(healthy|ok|active|online|success|passed|done|up|live|ready|complete|enabled|paid)$/i, '#15803d'],
  [/^(degraded|warning|warn|pending|slow|paused|partial|queued|retrying|draft)$/i, '#b45309'],
  [/^(down|error|failed|offline|critical|blocked|stopped|disabled|expired|overdue)$/i, '#dc2626'],
]

function statusColor(value: string): string | null {
  const v = value.trim()
  for (const [pattern, color] of STATUS_COLORS) if (pattern.test(v)) return color
  return null
}

interface SortState {
  col: number
  dir: 'asc' | 'desc'
}

// Empty (or malformed) reads as unsorted rather than "column 0 asc" — Number('')
// is 0, so the guard on an empty index is load-bearing.
function parseSort(sort: string): SortState | null {
  const trimmed = sort.trim()
  if (!trimmed) return null
  const [rawCol, rawDir] = trimmed.split(':').map((part) => part.trim())
  const col = Number(rawCol)
  if (rawCol === '' || !Number.isInteger(col) || col < 0) return null
  return { col, dir: rawDir === 'desc' ? 'desc' : 'asc' }
}

// asc → desc → cleared, so a third activation returns to the source order.
function nextSort(col: number, current: SortState | null): string {
  if (!current || current.col !== col) return `${col}:asc`
  return current.dir === 'asc' ? `${col}:desc` : ''
}

// parseFloat reads a leading number, so "42ms" sorts as 42; a blank cell sorts
// last in ascending order rather than poisoning the comparison with NaN.
function leadingNumber(value: string): number {
  const n = parseFloat(value.replace(/[,$%\s]/g, ''))
  return Number.isNaN(n) ? Infinity : n
}

function columnIsNumeric(cells: string[]): boolean {
  const filled = cells.filter((cell) => cell.trim() !== '')
  return filled.length > 0 && filled.every((cell) => leadingNumber(cell) !== Infinity)
}

function justify(align: string): CSSProperties['justifyContent'] {
  return align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'
}

export default function Table({
  headers = 'Service, Status, Latency',
  rows = 'api, healthy, 42ms; web, healthy, 18ms; worker, degraded, 310ms',
  caption = '',
  footerRow = '',
  width = 400,
  align = 'left',
  columnAlign = '',
  columnWidths = '',
  columnTypes = 'text, status, number',
  sortable = true,
  sort = '',
  selectable = false,
  selected = '',
  stickyHeader = false,
  maxHeight = 0,
  striped = true,
  bordered = true,
  compact = false,
  columnDividers = false,
  radius = 8,
  borderWidth = 1,
  fontSize = 13,
  headerSize = 11.5,
  headerWeight = 600,
  background = '#ffffff',
  headerBackground = '#fbfbfc',
  stripeColor = '#fafafb',
  borderColor = '#e3e6ea',
  textColor = '#3f434a',
  headerColor = '#6b7280',
  accentColor = '#4f46e5',
  selectedBackground = '#eef2ff',
  uppercaseHeaders = true,
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onRowClick,
  onSortChange,
  onSelectionChange,
  onHoverChange,
}: TableProps) {
  const columns = headers.trim() ? splitCells(headers) : []

  // Carry the original index so click and selection stay bound to a row's
  // identity even after a sort reorders what is on screen.
  const bodyRows = rows
    .split(';')
    .map((row) => row.trim())
    .filter((row) => row.length > 0)
    .map((row, index) => ({ cells: splitCells(row), index }))

  const aligns = splitCells(columnAlign)
  const widths = splitCells(columnWidths)
  const types = splitCells(columnTypes)
  const hasFixedWidths = widths.some((w) => w !== '' && w !== 'auto')

  const columnType = (index: number): string => types[index] || 'text'
  const columnAlignAt = (index: number): 'left' | 'center' | 'right' => {
    const explicit = aligns[index]
    if (explicit === 'left' || explicit === 'center' || explicit === 'right') return explicit
    // Numbers read right-aligned so a column of figures lines up on the ones.
    if (columnType(index) === 'number') return 'right'
    return align
  }

  const sortState = sortable ? parseSort(sort) : null
  let orderedRows = bodyRows
  if (sortState) {
    const col = sortState.col
    const numeric = columnType(col) === 'number' || columnIsNumeric(bodyRows.map((r) => r.cells[col] ?? ''))
    const factor = sortState.dir === 'desc' ? -1 : 1
    orderedRows = [...bodyRows].sort((a, b) => {
      const av = a.cells[col] ?? ''
      const bv = b.cells[col] ?? ''
      const delta = numeric ? leadingNumber(av) - leadingNumber(bv) : av.localeCompare(bv)
      return factor * delta
    })
  }

  const selectedSet = new Set(
    selectable
      ? splitCells(selected)
          .filter((value) => value !== '')
          .map(Number)
          .filter((n) => Number.isInteger(n) && n >= 0)
      : [],
  )
  const allSelected = selectable && bodyRows.length > 0 && bodyRows.every((r) => selectedSet.has(r.index))
  const someSelected = selectable && bodyRows.some((r) => selectedSet.has(r.index))

  const emitSelection = (next: Set<number>) => {
    onSelectionChange?.([...next].sort((a, b) => a - b).join(','))
  }
  const toggleRow = (index: number) => {
    const next = new Set(selectedSet)
    next.has(index) ? next.delete(index) : next.add(index)
    emitSelection(next)
  }
  const toggleAll = () => {
    emitSelection(allSelected ? new Set() : new Set(bodyRows.map((r) => r.index)))
  }

  const padding = compact ? '6px 10px' : '10px 14px'
  const checkboxWidth = compact ? 34 : 40
  const scrollable = maxHeight > 0

  // The first body row sits under the header's own bottom border, so it skips a
  // top border only when there is no header to butt against.
  const topBorder = (visualIndex: number) => (visualIndex === 0 && columns.length === 0 ? 0 : borderWidth)

  const root: CSSProperties = {
    width,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
    fontSize,
    color: textColor,
    ['--table-accent' as string]: accentColor,
    ['--table-divider' as string]: borderColor,
    ['--table-divider-w' as string]: `${borderWidth}px`,
  }

  const tableClass = [
    styles.table,
    hasFixedWidths ? styles.fixed : '',
    columnDividers ? styles.dividers : '',
    stickyHeader ? styles.sticky : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.frame} style={root}>
      <div
        className={styles.scroll}
        style={scrollable ? { maxHeight } : undefined}
        // A capped, scrolling body is its own focusable region so a keyboard can
        // reach the rows below the fold.
        tabIndex={scrollable ? 0 : undefined}
        role={scrollable ? 'group' : undefined}
        aria-label={scrollable ? caption.trim() || 'Table' : undefined}
      >
        <table className={tableClass}>
          {caption.trim() && (
            <caption className={styles.caption} style={{ color: headerColor, padding }}>
              {caption}
            </caption>
          )}

          {hasFixedWidths && (
            <colgroup>
              {selectable && <col style={{ width: checkboxWidth }} />}
              {columns.map((_, index) => {
                const w = widths[index]
                const value = !w || w === 'auto' ? undefined : /^\d+$/.test(w) ? `${w}px` : w
                return <col key={index} style={{ width: value }} />
              })}
            </colgroup>
          )}

          {columns.length > 0 && (
            <thead>
              <tr style={{ backgroundColor: headerBackground }}>
                {selectable && (
                  <th
                    className={styles.checkCell}
                    style={{
                      padding,
                      backgroundColor: headerBackground,
                      borderBottomWidth: borderWidth,
                      borderBottomColor: borderColor,
                    }}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      style={{ accentColor }}
                      checked={allSelected}
                      // The tri-state select-all can't be expressed in JSX; a ref
                      // is the only way to set the DOM's `indeterminate`.
                      ref={(el) => {
                        if (el) el.indeterminate = !allSelected && someSelected
                      }}
                      onChange={toggleAll}
                      aria-label={allSelected ? 'Deselect all rows' : 'Select all rows'}
                    />
                  </th>
                )}
                {columns.map((column, index) => {
                  const active = sortState?.col === index ? sortState : null
                  const cellAlign = columnAlignAt(index)
                  const sortProps = sortable ? clickable(() => onSortChange?.(nextSort(index, sortState)), { role: false }) : {}
                  return (
                    <th
                      key={`${column}-${index}`}
                      className={sortable ? styles.sortable : undefined}
                      style={{
                        padding,
                        textAlign: cellAlign,
                        fontSize: headerSize,
                        fontWeight: headerWeight,
                        color: active ? accentColor : headerColor,
                        backgroundColor: headerBackground,
                        textTransform: uppercaseHeaders ? 'uppercase' : 'none',
                        letterSpacing: uppercaseHeaders ? '0.06em' : 0,
                        borderBottomWidth: borderWidth,
                        borderBottomColor: borderColor,
                      }}
                      aria-sort={active ? (active.dir === 'asc' ? 'ascending' : 'descending') : sortable ? 'none' : undefined}
                      {...sortProps}
                    >
                      {sortable ? (
                        <span className={styles.headerInner} style={{ justifyContent: justify(cellAlign) }}>
                          {column}
                          <span
                            className={[styles.caret, active ? styles.caretActive : '', active?.dir === 'asc' ? styles.caretUp : '']
                              .filter(Boolean)
                              .join(' ')}
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        column
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}

          <tbody>
            {orderedRows.map((row, visualIndex) => {
              const isSelected = selectable && selectedSet.has(row.index)
              const base = isSelected
                ? selectedBackground
                : striped && visualIndex % 2 === 1
                  ? stripeColor
                  : 'transparent'
              return (
                <tr
                  key={row.index}
                  className={onRowClick ? styles.clickableRow : undefined}
                  style={{
                    // Routed through a custom property, not set directly: an
                    // inline background would outrank the :hover rule and kill the
                    // state. Selection rides the same channel, above the stripe.
                    ['--table-background' as string]: base,
                    ...hoverStyle('table', { background: hoverBackground, brightness: hoverBrightness }),
                  }}
                  {...clickable(onRowClick ? () => onRowClick(row.index) : undefined, { role: false })}
                  // Pinning every row at once would just repaint the whole table,
                  // so the first one stands in for the rest.
                  {...hoverable(hovered && visualIndex === 0, onHoverChange)}
                >
                  {selectable && (
                    <td
                      className={styles.checkCell}
                      style={{ padding, borderTopWidth: topBorder(visualIndex), borderTopColor: borderColor }}
                      // Keep a checkbox toggle from also firing the row's onRowClick.
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        style={{ accentColor }}
                        checked={isSelected}
                        onChange={() => toggleRow(row.index)}
                        aria-label={`Select ${row.cells[0] || `row ${row.index + 1}`}`}
                      />
                    </td>
                  )}
                  {row.cells.map((cell, cellIndex) => {
                    const type = columnType(cellIndex)
                    const status = type === 'status' ? statusColor(cell) : null
                    return (
                      <td
                        key={cellIndex}
                        className={type === 'number' ? styles.numberCell : type === 'mono' ? styles.monoCell : undefined}
                        style={{
                          padding,
                          textAlign: columnAlignAt(cellIndex),
                          borderTopWidth: topBorder(visualIndex),
                          borderTopColor: borderColor,
                        }}
                      >
                        {type === 'status' ? (
                          <span className={styles.status}>
                            <span className={styles.dot} style={{ backgroundColor: status || headerColor }} aria-hidden="true" />
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>

          {footerRow.trim() && (
            <tfoot>
              <tr className={styles.footerRow} style={{ backgroundColor: headerBackground }}>
                {selectable && (
                  <td className={styles.checkCell} style={{ padding, borderTopWidth: borderWidth, borderTopColor: borderColor }} />
                )}
                {splitCells(footerRow).map((cell, index) => (
                  <td
                    key={index}
                    style={{
                      padding,
                      textAlign: columnAlignAt(index),
                      borderTopWidth: borderWidth,
                      borderTopColor: borderColor,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
