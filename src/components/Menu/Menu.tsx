import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import Kbd from '../Kbd/Kbd'
import styles from './Menu.module.css'

export interface MenuProps {
  /**
   * Items separated by `;`, each `label|shortcut`. A bare `---` becomes a
   * divider. e.g. `Rename|⌘R;Duplicate|⌘D;---;Delete|⌫`
   */
  items?: string
  activeIndex?: number
  width?: number
  padding?: number
  itemPaddingX?: number
  itemPaddingY?: number
  radius?: number
  itemRadius?: number
  borderWidth?: number
  fontSize?: number
  shadow?: boolean
  background?: string
  textColor?: string
  borderColor?: string
  activeBackground?: string
  activeTextColor?: string
  shortcutColor?: string
  dividerColor?: string
  /** Empty keeps the row's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Entry {
  label: string
  shortcut: string
  divider: boolean
}

export function parseEntries(items: string): Entry[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      if (chunk === '---') return { label: '', shortcut: '', divider: true }
      const [label, ...rest] = chunk.split('|')
      return { label: label.trim(), shortcut: rest.join('|').trim(), divider: false }
    })
}

export default function Menu({
  items = 'Rename|⌘R;Duplicate|⌘D;Move to…|;---;Delete|⌫',
  activeIndex = 0,
  width = 220,
  padding = 5,
  itemPaddingX = 10,
  itemPaddingY = 7,
  radius = 10,
  itemRadius = 6,
  borderWidth = 1,
  fontSize = 13.5,
  shadow = true,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#e3e6ea',
  activeBackground = '#eef2ff',
  activeTextColor = '#4f46e5',
  shortcutColor = '#9aa1ab',
  dividerColor = '#e3e6ea',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onSelect,
  onHoverChange,
}: MenuProps) {
  const entries = parseEntries(items)

  // Pinning every item at once reads as a bug rather than a hover state, so the
  // pin lands on one row. Dividers aren't hover targets, hence the search.
  const pinnedIndex = entries.findIndex((entry) => !entry.divider)

  const root: CSSProperties = {
    width,
    padding,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
    boxShadow: shadow ? '0 8px 24px rgba(15, 23, 42, 0.14)' : undefined,
  }

  return (
    <div className={styles.menu} style={root} role="menu">
      {entries.map((entry, index) => {
        if (entry.divider) {
          return (
            <span
              key={`divider-${index}`}
              className={styles.divider}
              style={{ backgroundColor: dividerColor, margin: `${padding}px 0` }}
            />
          )
        }

        const active = index === activeIndex

        return (
          <button
            key={`${entry.label}-${index}`}
            type="button"
            role="menuitem"
            className={styles.item}
            style={{
              padding: `${itemPaddingY}px ${itemPaddingX}px`,
              borderRadius: itemRadius,
              fontSize,
              // Routed through custom properties, not set directly: an inline
              // declaration would outrank the :hover rule and kill the state.
              ['--menu-color' as string]: active ? activeTextColor : textColor,
              ['--menu-background' as string]: active ? activeBackground : 'transparent',
              ...hoverStyle('menu', {
                background: hoverBackground,
                color: hoverTextColor,
                brightness: hoverBrightness,
              }),
            }}
            onClick={() => onSelect?.(index)}
            {...hoverable(hovered && index === pinnedIndex, onHoverChange)}
          >
            <span className={styles.label}>{entry.label}</span>
            {/* A real Kbd, so shortcuts look the same everywhere. */}
            {entry.shortcut && (
              <span className={styles.shortcut}>
                <Kbd
                  keys={entry.shortcut}
                  separator=""
                  size={fontSize * 0.8}
                  minWidth={0}
                  paddingX={5}
                  paddingY={2}
                  shadow={false}
                  textColor={active ? activeTextColor : shortcutColor}
                  borderColor={dividerColor}
                />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
