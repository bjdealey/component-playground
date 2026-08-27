import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Tree.module.css'

export interface TreeProps {
  /**
   * Rows separated by `;`. Leading `-` characters set the depth, and a trailing
   * `/` marks a folder. e.g. `src/;-lib/;--types.ts;-main.tsx`
   */
  items?: string
  selectedIndex?: number
  indent?: number
  rowHeight?: number
  rowPaddingX?: number
  radius?: number
  gap?: number
  width?: number
  fontSize?: number
  showIcons?: boolean
  showGuides?: boolean
  folderGlyph?: string
  fileGlyph?: string
  textColor?: string
  folderColor?: string
  guideColor?: string
  selectedBackground?: string
  selectedTextColor?: string
  /** Empty keeps the row's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Node {
  name: string
  depth: number
  folder: boolean
}

export function parseNodes(items: string): Node[] {
  return items
    .split(';')
    .map((row) => row.trim())
    .filter((row) => row.length > 0)
    .map((row) => {
      const match = /^(-*)(.*)$/.exec(row)
      const depth = match ? match[1].length : 0
      const raw = (match ? match[2] : row).trim()
      const folder = raw.endsWith('/')
      return { name: folder ? raw.slice(0, -1) : raw, depth, folder }
    })
}

export default function Tree({
  items = 'src/;-components/;--Button.tsx;--Button.manifest.ts;-lib/;--types.ts;-main.tsx;README.md',
  selectedIndex = -1,
  indent = 16,
  rowHeight = 26,
  rowPaddingX = 8,
  radius = 5,
  gap = 7,
  width = 280,
  fontSize = 13,
  showIcons = true,
  showGuides = true,
  folderGlyph = '▸',
  fileGlyph = '·',
  textColor = '#3f434a',
  folderColor = '#17191c',
  guideColor = '#e3e6ea',
  selectedBackground = '#eef2ff',
  selectedTextColor = '#4f46e5',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onSelect,
  onHoverChange,
}: TreeProps) {
  const nodes = parseNodes(items)

  return (
    <div className={styles.tree} style={{ width, fontSize }}>
      {nodes.map((node, index) => {
        const selected = index === selectedIndex

        const row: CSSProperties = {
          height: rowHeight,
          paddingLeft: rowPaddingX + node.depth * indent,
          paddingRight: rowPaddingX,
          borderRadius: radius,
          gap,
          fontWeight: node.folder ? 600 : 400,
          cursor: onSelect ? 'pointer' : 'default',
          // Routed through custom properties, not set directly: an inline
          // declaration would outrank the :hover rule and kill the state.
          ['--tree-color' as string]: selected
            ? selectedTextColor
            : node.folder
              ? folderColor
              : textColor,
          ['--tree-background' as string]: selected ? selectedBackground : 'transparent',
          ...hoverStyle('tree', {
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
            style={row}
            aria-selected={selected}
            onClick={() => onSelect?.(index)}
            // Pinning every row at once reads as a bug; the first one shows the
            // state just as well.
            {...hoverable(hovered && index === 0, onHoverChange)}
          >
            {showGuides &&
              Array.from({ length: node.depth }, (_, level) => (
                <span
                  key={level}
                  className={styles.guide}
                  style={{
                    left: rowPaddingX + level * indent + indent / 2,
                    backgroundColor: guideColor,
                  }}
                />
              ))}

            {showIcons && (
              <span className={styles.icon} aria-hidden="true">
                {node.folder ? folderGlyph : fileGlyph}
              </span>
            )}
            <span className={styles.name}>{node.name}</span>
          </button>
        )
      })}
    </div>
  )
}
