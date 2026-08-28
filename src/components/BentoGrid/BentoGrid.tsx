import type { CSSProperties } from 'react'
import styles from './BentoGrid.module.css'

export interface BentoGridProps {
  /**
   * One tile per line: `Title | Body | WxH`. `WxH` is the column×row span
   * (e.g. `2x1`). Prefix the title with `*` to feature it in the accent tint.
   */
  items?: string
  columns?: number
  rowHeight?: number
  width?: number
  gap?: number
  padding?: number
  radius?: number
  borderWidth?: number
  titleSize?: number
  bodySize?: number
  background?: string
  titleColor?: string
  bodyColor?: string
  accentColor?: string
  borderColor?: string
  onSelect?: (index: number) => void
}

interface Tile {
  title: string
  body: string
  colSpan: number
  rowSpan: number
  featured: boolean
}

function parseSpan(token: string): { colSpan: number; rowSpan: number } {
  const match = token.toLowerCase().match(/^(\d)\s*x\s*(\d)$/)
  if (!match) return { colSpan: 1, rowSpan: 1 }
  return {
    colSpan: Math.min(4, Math.max(1, Number(match[1]))),
    rowSpan: Math.min(4, Math.max(1, Number(match[2]))),
  }
}

function parseTiles(items: string): Tile[] {
  return items
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [rawTitle = '', body = '', span = '1x1'] = line.split('|').map((part) => part.trim())
      const featured = rawTitle.startsWith('*')
      const title = featured ? rawTitle.slice(1).trim() : rawTitle
      return { title, body, featured, ...parseSpan(span) }
    })
}

const DEFAULT_ITEMS = [
  '*Zero-config | Drop a folder in and it registers itself — no wiring, no build step. | 2x2',
  'Offline | Runs on a plane. | 1x1',
  'Themeable | One shared theme retints everything. | 1x1',
  'Dependency-light | Plain React and CSS Modules, nothing else. | 2x1',
].join('\n')

export default function BentoGrid({
  items = DEFAULT_ITEMS,
  columns = 3,
  rowHeight = 116,
  width = 640,
  gap = 14,
  padding = 18,
  radius = 16,
  borderWidth = 1,
  titleSize = 15,
  bodySize = 13,
  background = '#ffffff',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  accentColor = '#4f46e5',
  borderColor = '#e3e6ea',
  onSelect,
}: BentoGridProps) {
  const tiles = parseTiles(items)
  const cols = Math.max(1, Math.round(columns))

  const grid: CSSProperties = {
    width,
    gap,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridAutoRows: rowHeight,
  }

  return (
    <div className={styles.grid} style={grid}>
      {tiles.map((tile, index) => {
        const style: CSSProperties = {
          padding,
          borderRadius: radius,
          borderColor,
          borderWidth,
          borderStyle: borderWidth > 0 ? 'solid' : undefined,
          gridColumn: `span ${Math.min(cols, tile.colSpan)}`,
          gridRow: `span ${tile.rowSpan}`,
          background: tile.featured
            ? `color-mix(in srgb, ${accentColor} 12%, ${background})`
            : background,
        }
        const content = (
          <>
            <span
              className={styles.title}
              style={{ fontSize: titleSize, color: tile.featured ? accentColor : titleColor }}
            >
              {tile.title}
            </span>
            {tile.body && (
              <span className={styles.body} style={{ fontSize: bodySize, color: bodyColor }}>
                {tile.body}
              </span>
            )}
          </>
        )

        return onSelect ? (
          <button
            key={index}
            type="button"
            className={styles.tile}
            style={style}
            data-featured={tile.featured || undefined}
            onClick={() => onSelect(index)}
          >
            {content}
          </button>
        ) : (
          <div key={index} className={styles.tile} style={style} data-featured={tile.featured || undefined}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
