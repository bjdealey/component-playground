import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import Badge from '../Badge/Badge'
import styles from './SidebarNav.module.css'

export interface SidebarNavProps {
  /**
   * Rows separated by `;`, each `glyph|label|badge`. A row of `--Section` becomes
   * a section heading.
   */
  items?: string
  activeIndex?: number
  width?: number
  rowHeight?: number
  paddingX?: number
  gap?: number
  radius?: number
  showGlyphs?: boolean
  showBadges?: boolean
  fontSize?: number
  sectionSize?: number
  background?: string
  textColor?: string
  activeBackground?: string
  activeTextColor?: string
  sectionColor?: string
  badgeBackground?: string
  badgeColor?: string
  /** Empty keeps the row's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Row {
  glyph: string
  label: string
  badge: string
  section: boolean
}

export function parseRows(items: string): Row[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      if (chunk.startsWith('--')) {
        return { glyph: '', label: chunk.slice(2).trim(), badge: '', section: true }
      }
      const [glyph = '', label = '', badge = ''] = chunk.split('|')
      return { glyph: glyph.trim(), label: label.trim(), badge: badge.trim(), section: false }
    })
}

export default function SidebarNav({
  items = '--Workspace;◈|Overview|;⚡|Deploys|12;◷|Activity|;--Settings;⚙|General|;⚿|Access|3',
  activeIndex = 1,
  width = 220,
  rowHeight = 34,
  paddingX = 10,
  gap = 2,
  radius = 7,
  showGlyphs = true,
  showBadges = true,
  fontSize = 13,
  sectionSize = 10.5,
  background = 'transparent',
  textColor = '#3f434a',
  activeBackground = '#eef2ff',
  activeTextColor = '#4f46e5',
  sectionColor = '#9aa1ab',
  badgeBackground = '#eceef1',
  badgeColor = '#6b7280',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onSelect,
  onHoverChange,
}: SidebarNavProps) {
  const rows = parseRows(items)
  // Pinning every row at once reads as a bug, and a section heading isn't
  // hoverable at all — so the state lands on the first real row.
  const pinnedIndex = rows.findIndex((row) => !row.section)

  return (
    <nav className={styles.nav} style={{ width, gap, backgroundColor: background }}>
      {rows.map((row, index) => {
        if (row.section) {
          return (
            <span
              key={index}
              className={styles.section}
              style={{
                fontSize: sectionSize,
                color: sectionColor,
                padding: `10px ${paddingX}px 4px`,
              }}
            >
              {row.label}
            </span>
          )
        }

        const active = index === activeIndex

        const style: CSSProperties = {
          height: rowHeight,
          padding: `0 ${paddingX}px`,
          borderRadius: radius,
          fontSize,
          fontWeight: active ? 600 : 400,
          // Routed through custom properties, not set directly: an inline
          // declaration would outrank the :hover rule and kill the state.
          ['--sidebarnav-color' as string]: active ? activeTextColor : textColor,
          ['--sidebarnav-background' as string]: active ? activeBackground : 'transparent',
          ...hoverStyle('sidebarnav', {
            background: hoverBackground,
            color: hoverTextColor,
            brightness: hoverBrightness,
          }),
        }

        return (
          <button
            key={index}
            type="button"
            className={styles.row}
            style={style}
            aria-current={active ? 'page' : undefined}
            onClick={() => onSelect?.(index)}
            {...hoverable(hovered && index === pinnedIndex, onHoverChange)}
          >
            {showGlyphs && row.glyph && (
              <span className={styles.glyph} aria-hidden="true">
                {row.glyph}
              </span>
            )}
            <span className={styles.label}>{row.label}</span>
            {/* A real Badge, so counts look the same wherever they appear. */}
            {showBadges && row.badge && (
              <Badge
                background={active ? activeTextColor : badgeBackground}
                textColor={active ? activeBackground : badgeColor}
                fontSize={fontSize * 0.8}
                paddingX={7}
                paddingY={3}
              >
                {row.badge}
              </Badge>
            )}
          </button>
        )
      })}
    </nav>
  )
}
