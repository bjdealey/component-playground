import type { CSSProperties } from 'react'
import styles from './List.module.css'

export interface ListProps {
  /** One row per line, `primary | secondary | trailing` (extra parts optional). */
  items?: string
  leading?: 'none' | 'bullet' | 'number'
  showSecondary?: boolean
  showTrailing?: boolean
  showDividers?: boolean
  /** Rows become buttons that report their index. */
  interactive?: boolean
  /** Highlights one row; -1 for none. */
  selectedIndex?: number
  width?: number
  radius?: number
  borderWidth?: number
  padding?: number
  gap?: number
  fontSize?: number
  background?: string
  textColor?: string
  descriptionColor?: string
  metaColor?: string
  dividerColor?: string
  borderColor?: string
  selectedBackground?: string
  selectedColor?: string
  accentColor?: string
  onSelect?: (index: number) => void
}

interface Row {
  primary: string
  secondary: string
  trailing: string
}

function parseRows(items: string): Row[] {
  return items
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split('|').map((part) => part.trim())
      return { primary: parts[0] ?? '', secondary: parts[1] ?? '', trailing: parts[2] ?? '' }
    })
}

const DEFAULT_ITEMS = [
  'Inbox | Unread and recent | 12',
  'Starred | Flagged threads | 3',
  "Sent | Everything you've sent |",
  'Archive | Older conversations | 1,204',
].join('\n')

export default function List({
  items = DEFAULT_ITEMS,
  leading = 'none',
  showSecondary = true,
  showTrailing = true,
  showDividers = true,
  interactive = true,
  selectedIndex = 0,
  width = 340,
  radius = 10,
  borderWidth = 1,
  padding = 11,
  gap = 12,
  fontSize = 14,
  background = '#ffffff',
  textColor = '#17191c',
  descriptionColor = '#6b7280',
  metaColor = '#6b7280',
  dividerColor = '#e3e6ea',
  borderColor = '#e3e6ea',
  selectedBackground = '#eef2ff',
  selectedColor = '#4f46e5',
  accentColor = '#4f46e5',
  onSelect,
}: ListProps) {
  const rows = parseRows(items)

  const container: CSSProperties = {
    width,
    background,
    borderColor,
    borderWidth,
    borderStyle: borderWidth > 0 ? 'solid' : undefined,
    borderRadius: radius,
  }

  return (
    <ul className={styles.list} style={container}>
      {rows.map((row, index) => {
        const selected = index === selectedIndex

        const rowStyle: CSSProperties = {
          padding: `${padding}px 14px`,
          gap,
          borderTopColor: dividerColor,
          borderTopWidth: showDividers && index > 0 ? 1 : 0,
          borderTopStyle: 'solid',
          background: selected ? selectedBackground : undefined,
          ['--list-hover' as string]: `color-mix(in srgb, ${textColor} 6%, transparent)`,
        }

        const content = (
          <>
            {leading !== 'none' && (
              <span className={styles.leading} style={{ color: accentColor, fontSize: fontSize - 1 }}>
                {leading === 'bullet' ? (
                  <span className={styles.bullet} style={{ background: accentColor }} />
                ) : (
                  index + 1
                )}
              </span>
            )}

            <span className={styles.text}>
              <span
                className={styles.primary}
                style={{ color: selected ? selectedColor : textColor, fontSize }}
              >
                {row.primary}
              </span>
              {showSecondary && row.secondary && (
                <span
                  className={styles.secondary}
                  style={{ color: descriptionColor, fontSize: fontSize - 2 }}
                >
                  {row.secondary}
                </span>
              )}
            </span>

            {showTrailing && row.trailing && (
              <span
                className={styles.trailing}
                style={{ color: selected ? selectedColor : metaColor, fontSize: fontSize - 1.5 }}
              >
                {row.trailing}
              </span>
            )}
          </>
        )

        return (
          <li key={index} className={styles.item}>
            {interactive ? (
              <button
                type="button"
                className={styles.row}
                style={rowStyle}
                data-interactive="true"
                data-selected={selected || undefined}
                aria-current={selected || undefined}
                onClick={() => onSelect?.(index)}
              >
                {content}
              </button>
            ) : (
              <div className={styles.row} style={rowStyle} data-selected={selected || undefined}>
                {content}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
