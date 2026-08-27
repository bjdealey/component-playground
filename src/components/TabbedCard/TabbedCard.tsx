import type { CSSProperties } from 'react'
import Tabs from '../Tabs/Tabs'
import styles from './TabbedCard.module.css'

export interface TabbedCardProps {
  /** Tab labels, comma-separated. */
  items?: string
  /** Panel bodies separated by `;`, positionally matched to the tabs. */
  panels?: string
  activeIndex?: number
  variant?: 'underline' | 'pill' | 'enclosed'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  bodySize?: number
  background?: string
  borderColor?: string
  bodyColor?: string
  activeColor?: string
  onSelect?: (index: number) => void
}

/**
 * A card whose body follows its tab strip.
 *
 * `Tabs` arrives by import, not as a slot: the card has to *read* the selected
 * index to pick a panel, and slot state is one-way. A slotted Tabs would keep
 * its own `activeIndex` and the two would drift apart.
 */
export default function TabbedCard({
  items = 'Overview, Logs, Settings',
  panels = 'Deployed 12 minutes ago from main.;No errors in the last hour.;Auto-deploy is enabled for all branches.',
  activeIndex = 0,
  variant = 'underline',
  width = 360,
  padding = 16,
  gap = 14,
  radius = 12,
  borderWidth = 1,
  bordered = true,
  bodySize = 13,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  bodyColor = '#6b7280',
  activeColor = '#4f46e5',
  onSelect,
}: TabbedCardProps) {
  const bodies = panels
    .split(';')
    .map((panel) => panel.trim())
    .filter((panel) => panel.length > 0)

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.card} style={root}>
      <Tabs
        items={items}
        activeIndex={activeIndex}
        variant={variant}
        activeColor={activeColor}
        fullWidth
        onSelect={onSelect}
      />

      <span className={styles.body} style={{ fontSize: bodySize, color: bodyColor }}>
        {bodies[activeIndex] ?? bodies[0] ?? ''}
      </span>
    </div>
  )
}
