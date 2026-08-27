import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import Kbd from '../Kbd/Kbd'
import styles from './CommandPalette.module.css'

export interface CommandPaletteProps {
  /** Commands separated by `;`, each `label|shortcut`. */
  items?: string
  query?: string
  placeholder?: string
  activeIndex?: number
  emptyText?: string
  showFooter?: boolean
  footerText?: string
  width?: number
  maxRows?: number
  padding?: number
  rowHeight?: number
  radius?: number
  rowRadius?: number
  borderWidth?: number
  fontSize?: number
  inputSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  activeBackground?: string
  activeTextColor?: string
  shortcutColor?: string
  placeholderColor?: string
  /** Empty keeps the row's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onQueryChange?: (query: string) => void
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Command {
  label: string
  shortcut: string
}

export function parseCommands(items: string): Command[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [label, ...rest] = chunk.split('|')
      return { label: label.trim(), shortcut: rest.join('|').trim() }
    })
}

export default function CommandPalette({
  items = 'Open preview|⌘O;Redeploy|⌘R;Roll back|⌘⇧R;Copy deploy URL|⌘C;View build logs|⌘L;Invite teammate|',
  query = '',
  placeholder = 'Type a command…',
  activeIndex = 0,
  emptyText = 'No matching commands',
  showFooter = true,
  footerText = '↑↓ to navigate · ↵ to run',
  width = 340,
  maxRows = 5,
  padding = 6,
  rowHeight = 34,
  radius = 12,
  rowRadius = 7,
  borderWidth = 1,
  fontSize = 13.5,
  inputSize = 14,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#e3e6ea',
  activeBackground = '#eef2ff',
  activeTextColor = '#4f46e5',
  shortcutColor = '#9aa1ab',
  placeholderColor = '#9aa1ab',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onQueryChange,
  onSelect,
  onHoverChange,
}: CommandPaletteProps) {
  const all = parseCommands(items)
  const needle = query.trim().toLowerCase()
  const matches = needle
    ? all.filter((command) => command.label.toLowerCase().includes(needle))
    : all

  const root: CSSProperties = {
    width,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.palette} style={root} role="dialog" aria-label="Command palette">
      <div
        className={styles.search}
        style={{
          padding: `${padding + 4}px ${padding + 6}px`,
          borderBottomWidth: borderWidth,
          borderBottomColor: borderColor,
          ['--placeholder-color' as string]: placeholderColor,
        }}
      >
        <span className={styles.searchIcon} style={{ color: shortcutColor }} aria-hidden="true">
          ⌕
        </span>
        <input
          type="text"
          className={styles.input}
          style={{ fontSize: inputSize, color: textColor }}
          value={query}
          placeholder={placeholder}
          onChange={(event) => onQueryChange?.(event.target.value)}
        />
      </div>

      <div
        className={styles.list}
        style={{ padding, maxHeight: maxRows * rowHeight + padding * 2 }}
      >
        {matches.length === 0 && (
          <span
            className={styles.empty}
            style={{ height: rowHeight, fontSize, color: shortcutColor }}
          >
            {emptyText}
          </span>
        )}

        {matches.map((command, index) => {
          const active = index === activeIndex

          return (
            <button
              key={`${command.label}-${index}`}
              type="button"
              className={styles.row}
              style={{
                height: rowHeight,
                borderRadius: rowRadius,
                fontSize,
                // Routed through custom properties, not set directly: an inline
                // declaration would outrank the :hover rule and kill the state.
                ['--commandpalette-color' as string]: active ? activeTextColor : textColor,
                ['--commandpalette-background' as string]: active
                  ? activeBackground
                  : 'transparent',
                ...hoverStyle('commandpalette', {
                  background: hoverBackground,
                  color: hoverTextColor,
                  brightness: hoverBrightness,
                }),
              }}
              aria-selected={active}
              onClick={() => onSelect?.(index)}
              // Pinning every row at once reads as a bug; the first match shows
              // the state just as well.
              {...hoverable(hovered && index === 0, onHoverChange)}
            >
              <span className={styles.label}>{command.label}</span>
              {/* A real Kbd, so shortcuts look the same everywhere. */}
              {command.shortcut && (
                <span className={styles.shortcut}>
                  <Kbd
                    keys={command.shortcut}
                    separator=""
                    size={fontSize * 0.82}
                    minWidth={0}
                    paddingX={5}
                    paddingY={2}
                    shadow={false}
                    textColor={active ? activeTextColor : shortcutColor}
                    borderColor={borderColor}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showFooter && footerText && (
        <div
          className={styles.footer}
          style={{
            padding: `${padding + 1}px ${padding + 6}px`,
            borderTopWidth: borderWidth,
            borderTopColor: borderColor,
            color: shortcutColor,
            fontSize: fontSize * 0.85,
          }}
        >
          {footerText}
        </div>
      )}
    </div>
  )
}
