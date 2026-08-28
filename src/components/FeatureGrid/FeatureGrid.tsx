import type { CSSProperties } from 'react'
import styles from './FeatureGrid.module.css'

export interface FeatureGridProps {
  /** One feature per line: `icon | title | body`. Icon is any emoji or glyph. */
  items?: string
  columns?: number
  bordered?: boolean
  align?: 'left' | 'center'
  width?: number
  gap?: number
  padding?: number
  radius?: number
  borderWidth?: number
  iconSize?: number
  titleSize?: number
  bodySize?: number
  background?: string
  textColor?: string
  bodyColor?: string
  accentColor?: string
  borderColor?: string
  onSelect?: (index: number) => void
}

interface Feature {
  icon: string
  title: string
  body: string
}

function parseFeatures(items: string): Feature[] {
  return items
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split('|').map((part) => part.trim())
      return { icon: parts[0] ?? '', title: parts[1] ?? '', body: parts[2] ?? '' }
    })
}

const DEFAULT_ITEMS = [
  '⚡ | Fast by default | Static assets ship in milliseconds, with no config to tune.',
  '🔒 | Secure & offline | Sane defaults, nothing phones home, works on a plane.',
  '🎛️ | One shared theme | Retint, re-round and re-scale every component at once.',
].join('\n')

export default function FeatureGrid({
  items = DEFAULT_ITEMS,
  columns = 3,
  bordered = true,
  align = 'left',
  width = 720,
  gap = 16,
  padding = 20,
  radius = 12,
  borderWidth = 1,
  iconSize = 40,
  titleSize = 15,
  bodySize = 13.5,
  background = '#ffffff',
  textColor = '#17191c',
  bodyColor = '#6b7280',
  accentColor = '#4f46e5',
  borderColor = '#e3e6ea',
  onSelect,
}: FeatureGridProps) {
  const features = parseFeatures(items)

  const grid: CSSProperties = {
    width,
    gap,
    gridTemplateColumns: `repeat(${Math.max(1, Math.round(columns))}, minmax(0, 1fr))`,
  }

  const tileBase: CSSProperties = {
    padding,
    borderRadius: radius,
    borderColor,
    borderWidth: bordered ? borderWidth : 0,
    borderStyle: bordered ? 'solid' : undefined,
    background: bordered ? background : 'transparent',
  }

  return (
    <div className={styles.grid} style={grid}>
      {features.map((feature, index) => {
        const content = (
          <>
            <span
              className={styles.icon}
              style={{
                width: iconSize,
                height: iconSize,
                borderRadius: Math.round(radius * 0.7),
                fontSize: Math.round(iconSize * 0.5),
                color: accentColor,
                // A tint of the accent over the surface, so the chip tracks the theme.
                background: `color-mix(in srgb, ${accentColor} 12%, ${background})`,
              }}
              aria-hidden="true"
            >
              {feature.icon}
            </span>

            <span className={styles.title} style={{ fontSize: titleSize, color: textColor }}>
              {feature.title}
            </span>
            <span className={styles.body} style={{ fontSize: bodySize, color: bodyColor }}>
              {feature.body}
            </span>
          </>
        )

        return onSelect ? (
          <button
            key={index}
            type="button"
            className={styles.tile}
            style={tileBase}
            data-bordered={bordered || undefined}
            data-align={align}
            onClick={() => onSelect(index)}
          >
            {content}
          </button>
        ) : (
          <div
            key={index}
            className={styles.tile}
            style={tileBase}
            data-bordered={bordered || undefined}
            data-align={align}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
