import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Combobox.module.css'

export interface ComboboxProps {
  label?: string
  /** Comma-separated options. */
  options?: string
  query?: string
  placeholder?: string
  activeIndex?: number
  open?: boolean
  emptyText?: string
  maxRows?: number
  width?: number
  gap?: number
  paddingX?: number
  paddingY?: number
  rowHeight?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  labelSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  focusColor?: string
  labelColor?: string
  activeBackground?: string
  activeTextColor?: string
  mutedColor?: string
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

export default function Combobox({
  label = 'Framework',
  options = 'Astro, Next.js, Nuxt, Remix, SolidStart, SvelteKit, Vite',
  query = '',
  placeholder = 'Search frameworks…',
  activeIndex = 0,
  open = true,
  emptyText = 'No matches',
  maxRows = 4,
  width = 260,
  gap = 6,
  paddingX = 12,
  paddingY = 9,
  rowHeight = 32,
  radius = 8,
  borderWidth = 1,
  fontSize = 13.5,
  labelSize = 13,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  labelColor = '#17191c',
  activeBackground = '#eef2ff',
  activeTextColor = '#4f46e5',
  mutedColor = '#9aa1ab',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onQueryChange,
  onSelect,
  onHoverChange,
}: ComboboxProps) {
  const all = options
    .split(',')
    .map((option) => option.trim())
    .filter((option) => option.length > 0)

  const needle = query.trim().toLowerCase()
  const matches = needle ? all.filter((option) => option.toLowerCase().includes(needle)) : all

  const wrapper: CSSProperties = {
    width,
    gap,
    ['--combo-border' as string]: borderColor,
    ['--focus-color' as string]: focusColor,
  }

  return (
    <div className={styles.wrapper} style={wrapper}>
      {label && <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>}

      <div className={styles.field}>
        <input
          type="text"
          className={styles.input}
          style={{
            padding: `${paddingY}px ${paddingX}px`,
            borderRadius: radius,
            borderWidth,
            backgroundColor: background,
            color: textColor,
            fontSize,
          }}
          role="combobox"
          aria-expanded={open}
          value={query}
          placeholder={placeholder}
          onChange={(event) => onQueryChange?.(event.target.value)}
        />

        {open && (
          <div
            className={styles.list}
            style={{
              borderRadius: radius,
              borderWidth,
              borderColor,
              backgroundColor: background,
              maxHeight: maxRows * rowHeight + 8,
              marginTop: gap / 1.5,
            }}
            role="listbox"
          >
            {matches.length === 0 && (
              <span
                className={styles.empty}
                style={{ height: rowHeight, padding: `0 ${paddingX}px`, fontSize, color: mutedColor }}
              >
                {emptyText}
              </span>
            )}

            {matches.map((option, index) => {
              const active = index === activeIndex
              return (
                <button
                  key={`${option}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={styles.row}
                  style={{
                    height: rowHeight,
                    padding: `0 ${paddingX}px`,
                    fontSize,
                    // Routed through custom properties, not set directly: an inline
                    // declaration would outrank the :hover rule and kill the state.
                    ['--combobox-color' as string]: active ? activeTextColor : textColor,
                    ['--combobox-background' as string]: active ? activeBackground : 'transparent',
                    ...hoverStyle('combobox', {
                      background: hoverBackground,
                      color: hoverTextColor,
                      brightness: hoverBrightness,
                    }),
                  }}
                  onClick={() => onSelect?.(index)}
                  // Pinning every row at once reads as a bug; the first match
                  // shows the state just as well.
                  {...hoverable(hovered && index === 0, onHoverChange)}
                >
                  {option}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
