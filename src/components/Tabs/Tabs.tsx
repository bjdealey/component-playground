import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Tabs.module.css'

export interface TabsProps {
  /** Comma-separated labels — manifest props are primitives, so lists arrive as text. */
  items?: string
  activeIndex?: number
  variant?: 'underline' | 'pill' | 'enclosed'
  fullWidth?: boolean
  gap?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  indicatorSize?: number
  fontSize?: number
  fontWeight?: number
  uppercase?: boolean
  activeColor?: string
  inactiveColor?: string
  indicatorColor?: string
  background?: string
  /** Empty keeps the tab's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Omitted by the playground — `activeIndex` is driven by the controls panel. */
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

export function parseItems(items: string): string[] {
  return items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export default function Tabs({
  items = 'Overview, Activity, Settings',
  activeIndex = 0,
  variant = 'underline',
  fullWidth = false,
  gap = 4,
  paddingX = 14,
  paddingY = 9,
  radius = 6,
  indicatorSize = 2,
  fontSize = 13.5,
  fontWeight = 500,
  uppercase = false,
  activeColor = '#4f46e5',
  inactiveColor = '#6b7280',
  indicatorColor = '',
  background = '',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.9,
  hovered = false,
  onSelect,
  onHoverChange,
}: TabsProps) {
  const labels = parseItems(items)
  const indicator = indicatorColor || activeColor

  const list: CSSProperties = {
    gap,
    backgroundColor: background || undefined,
    borderRadius: variant === 'enclosed' ? radius : undefined,
    padding: variant === 'pill' && background ? 3 : undefined,
    width: fullWidth ? '100%' : undefined,
    borderBottomWidth: variant === 'underline' ? indicatorSize : 0,
    borderBottomColor: '#e3e6ea',
  }

  return (
    <div className={styles.tabs} style={list} role="tablist">
      {labels.map((label, index) => {
        const active = index === activeIndex
        // Pill and enclosed tabs paint the indicator behind the active label, so
        // the label itself has to flip to white.
        const filled = active && variant !== 'underline'

        const tab: CSSProperties = {
          padding: `${paddingY}px ${paddingX}px`,
          fontSize,
          fontWeight: active ? Math.min(800, fontWeight + 100) : fontWeight,
          textTransform: uppercase ? 'uppercase' : 'none',
          flex: fullWidth ? 1 : undefined,
          borderRadius: variant === 'underline' ? 0 : radius,
          // Pull the underline down onto the list's bottom border.
          marginBottom: variant === 'underline' ? -indicatorSize : 0,
          borderBottomWidth: variant === 'underline' ? indicatorSize : 0,
          borderBottomColor: active ? indicator : 'transparent',
          // Routed through custom properties, not set directly: an inline
          // declaration would outrank the :hover rule and kill the state.
          ['--tabs-color' as string]: filled ? '#ffffff' : active ? activeColor : inactiveColor,
          ['--tabs-background' as string]: filled ? indicator : 'transparent',
          ...hoverStyle('tabs', {
            background: hoverBackground,
            color: hoverTextColor,
            brightness: hoverBrightness,
          }),
        }

        return (
          <button
            key={`${label}-${index}`}
            type="button"
            role="tab"
            aria-selected={active}
            className={styles.tab}
            style={tab}
            onClick={() => onSelect?.(index)}
            // Pinning every tab at once reads as a bug; the first one shows the
            // state just as well.
            {...hoverable(hovered && index === 0, onHoverChange)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
