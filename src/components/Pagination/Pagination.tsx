import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Pagination.module.css'

export interface PaginationProps {
  totalPages?: number
  page?: number
  siblings?: number
  showArrows?: boolean
  size?: number
  gap?: number
  paddingX?: number
  fontWeight?: number
  mutedColor?: string
  radius?: number
  borderWidth?: number
  fontSize?: number
  activeColor?: string
  activeTextColor?: string
  textColor?: string
  borderColor?: string
  background?: string
  /** Empty keeps the cell's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (page: number) => void
  onHoverChange?: (hovered: boolean) => void
}

/** Page numbers around `page`, with -1 standing in for an ellipsis. */
export function pageRange(total: number, page: number, siblings: number): number[] {
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const left = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const range: number[] = [1]

  if (left > 2) range.push(-1)
  for (let n = left; n <= right; n += 1) range.push(n)
  if (right < total - 1) range.push(-1)
  range.push(total)

  return range
}

export default function Pagination({
  totalPages = 10,
  page = 1,
  siblings = 1,
  showArrows = true,
  size = 32,
  gap = 4,
  paddingX = 8,
  fontWeight = 500,
  mutedColor = '#9aa1ab',
  radius = 6,
  borderWidth = 1,
  fontSize = 13,
  activeColor = '#4f46e5',
  activeTextColor = '#ffffff',
  textColor = '#3f434a',
  borderColor = '#e3e6ea',
  background = '#ffffff',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.95,
  hovered = false,
  onSelect,
  onHoverChange,
}: PaginationProps) {
  const total = Math.max(1, Math.round(totalPages))
  const current = Math.min(Math.max(1, page), total)
  const pages = pageRange(total, current, Math.max(0, siblings))

  const cell = (active: boolean): CSSProperties => ({
    minWidth: size,
    height: size,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    borderRadius: radius,
    borderWidth,
    borderColor: active ? activeColor : borderColor,
    fontSize,
    fontWeight,
    // Routed through custom properties, not set directly: an inline
    // declaration would outrank the :hover rule and kill the state.
    ['--pagination-background' as string]: active ? activeColor : background,
    ['--pagination-color' as string]: active ? activeTextColor : textColor,
    ...hoverStyle('pagination', {
      background: hoverBackground,
      color: hoverTextColor,
      brightness: hoverBrightness,
    }),
  })

  const arrow = (label: string, target: number, enabled: boolean) => (
    <button
      type="button"
      className={styles.cell}
      style={{ ...cell(false), opacity: enabled ? 1 : 0.4, cursor: enabled ? 'pointer' : 'not-allowed' }}
      disabled={!enabled}
      aria-label={label === '‹' ? 'Previous page' : 'Next page'}
      onClick={() => enabled && onSelect?.(target)}
      // Arrows hover like any other cell, but the pin belongs to a page number —
      // an arrow is disabled at either end of the range.
      {...hoverable(false, onHoverChange)}
    >
      {label}
    </button>
  )

  return (
    <nav className={styles.pagination} style={{ gap }} aria-label="Pagination">
      {showArrows && arrow('‹', current - 1, current > 1)}

      {pages.map((n, index) =>
        n === -1 ? (
          <span key={`gap-${index}`} className={styles.ellipsis} style={{ minWidth: size, color: mutedColor, fontSize }}>
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            className={styles.cell}
            style={cell(n === current)}
            aria-current={n === current ? 'page' : undefined}
            onClick={() => onSelect?.(n)}
            // Pinning every cell at once reads as a bug; the first page — always
            // a real number, never an ellipsis — shows the state just as well.
            {...hoverable(hovered && index === 0, onHoverChange)}
          >
            {n}
          </button>
        ),
      )}

      {showArrows && arrow('›', current + 1, current < total)}
    </nav>
  )
}
