import type { CSSProperties } from 'react'
import styles from './ImageGallery.module.css'

export interface ImageGalleryProps {
  /** One caption per line. Each line is a tile; the art is a themed placeholder. */
  items?: string
  columns?: number
  showCaptions?: boolean
  width?: number
  gap?: number
  padding?: number
  radius?: number
  captionSize?: number
  background?: string
  accentColor?: string
  labelColor?: string
  onSelect?: (index: number) => void
}

function splitLines(items: string): string[] {
  return items
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// Deterministic per-tile heights, so the masonry stays put across re-renders.
const HEIGHTS = [200, 150, 240, 170, 210, 160, 190, 230]

const DEFAULT_ITEMS = [
  'Northern lights',
  'Terminal glow',
  'Studio desk',
  'City at dusk',
  'Paper textures',
  'Morning coffee',
].join('\n')

export default function ImageGallery({
  items = DEFAULT_ITEMS,
  columns = 3,
  showCaptions = true,
  width = 640,
  gap = 12,
  padding = 0,
  radius = 12,
  captionSize = 12.5,
  background = '#ffffff',
  accentColor = '#4f46e5',
  labelColor = '#6b7280',
  onSelect,
}: ImageGalleryProps) {
  const captions = splitLines(items)

  const root: CSSProperties = {
    width,
    padding,
    backgroundColor: padding > 0 ? background : 'transparent',
    columnCount: Math.max(1, Math.round(columns)),
    columnGap: gap,
  }

  return (
    <div className={styles.gallery} style={root}>
      {captions.map((caption, index) => {
        const p1 = 22 + ((index * 13) % 40)
        const p2 = p1 + 24
        const angle = 120 + ((index * 47) % 170)
        const art: CSSProperties = {
          height: HEIGHTS[index % HEIGHTS.length],
          borderRadius: radius,
          // A themed placeholder for the real image — two tints of the accent.
          background: `linear-gradient(${angle}deg, color-mix(in srgb, ${accentColor} ${p1}%, ${background}), color-mix(in srgb, ${accentColor} ${p2}%, ${background}))`,
        }

        const inner = (
          <>
            <span className={styles.art} style={art} aria-hidden="true" />
            {showCaptions && caption && (
              <span className={styles.caption} style={{ fontSize: captionSize, color: labelColor }}>
                {caption}
              </span>
            )}
          </>
        )

        return onSelect ? (
          <button
            key={index}
            type="button"
            className={styles.cell}
            style={{ marginBottom: gap }}
            onClick={() => onSelect(index)}
          >
            {inner}
          </button>
        ) : (
          <div key={index} className={styles.cell} style={{ marginBottom: gap }}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
