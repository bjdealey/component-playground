import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Table.module.css'

export interface TableProps {
  /** Comma-separated column headers. Leave empty to omit the header row. */
  headers?: string
  /** Rows separated by `;`, cells within a row separated by `,`. */
  rows?: string
  width?: number
  align?: 'left' | 'center' | 'right'
  striped?: boolean
  bordered?: boolean
  compact?: boolean
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
  uppercaseHeaders?: boolean
  /** Empty keeps the row's own fill — stripe or not; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Receives the body-row index, ignoring the header. */
  onRowClick?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

function splitCells(row: string): string[] {
  return row.split(',').map((cell) => cell.trim())
}

export default function Table({
  headers = 'Service, Status, Latency',
  rows = 'api, healthy, 42ms; web, healthy, 18ms; worker, degraded, 310ms',
  width = 400,
  align = 'left',
  striped = true,
  bordered = true,
  compact = false,
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
  uppercaseHeaders = true,
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onRowClick,
  onHoverChange,
}: TableProps) {
  const columns = headers.trim() ? splitCells(headers) : []
  const body = rows
    .split(';')
    .map((row) => row.trim())
    .filter((row) => row.length > 0)
    .map(splitCells)

  const padding = compact ? '6px 10px' : '10px 14px'

  const root: CSSProperties = {
    width,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
    fontSize,
    color: textColor,
  }

  return (
    <div className={styles.frame} style={root}>
      <table className={styles.table}>
        {columns.length > 0 && (
          <thead>
            <tr style={{ backgroundColor: headerBackground }}>
              {columns.map((column, index) => (
                <th
                  key={`${column}-${index}`}
                  style={{
                    padding,
                    textAlign: align,
                    fontSize: headerSize,
                    fontWeight: headerWeight,
                    color: headerColor,
                    textTransform: uppercaseHeaders ? 'uppercase' : 'none',
                    letterSpacing: uppercaseHeaders ? '0.06em' : 0,
                    borderBottomWidth: borderWidth,
                    borderBottomColor: borderColor,
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {body.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              // Only a clickable row has a hover state to show, so the class that
              // carries it is gated on the handler.
              className={onRowClick ? styles.clickableRow : undefined}
              style={{
                // Routed through a custom property, not set directly: an inline
                // background would outrank the :hover rule and kill the state.
                ['--table-background' as string]:
                  striped && rowIndex % 2 === 1 ? stripeColor : 'transparent',
                ...hoverStyle('table', {
                  background: hoverBackground,
                  brightness: hoverBrightness,
                }),
              }}
              {...clickable(
                onRowClick ? () => onRowClick(rowIndex) : undefined,
                // A `tr` is already a row; overwriting that would cost more in
                // screen-reader terms than the button role buys.
                { role: false },
              )}
              // Pinning every row at once would just repaint the whole table, so
              // the first one stands in for the rest.
              {...hoverable(hovered && rowIndex === 0, onHoverChange)}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    padding,
                    textAlign: align,
                    borderTopWidth: rowIndex === 0 && columns.length === 0 ? 0 : borderWidth,
                    borderTopColor: borderColor,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
