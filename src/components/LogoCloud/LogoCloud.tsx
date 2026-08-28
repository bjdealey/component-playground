import type { CSSProperties } from 'react'
import styles from './LogoCloud.module.css'

export interface LogoCloudProps {
  label?: string
  showLabel?: boolean
  /** Comma-separated wordmarks — stand-ins for real logos. */
  logos?: string
  /** Dim the marks until hovered, the way a real logo wall greys out. */
  faded?: boolean
  columns?: number
  width?: number
  padding?: number
  gap?: number
  labelSize?: number
  logoSize?: number
  background?: string
  labelColor?: string
  textColor?: string
  accentColor?: string
  onSelect?: (index: number) => void
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

export default function LogoCloud({
  label = 'Trusted by fast-moving teams',
  showLabel = true,
  logos = 'Vercel, Linear, Raycast, Supabase, Framer, Retool',
  faded = true,
  columns = 3,
  width = 640,
  padding = 24,
  gap = 20,
  labelSize = 11.5,
  logoSize = 19,
  background = '#ffffff',
  labelColor = '#6b7280',
  textColor = '#17191c',
  accentColor = '#4f46e5',
  onSelect,
}: LogoCloudProps) {
  const marks = splitList(logos)

  const root: CSSProperties = {
    width,
    padding,
    gap,
    backgroundColor: background,
    ['--logo-color' as string]: textColor,
    ['--logo-accent' as string]: accentColor,
  }

  const grid: CSSProperties = {
    gap,
    gridTemplateColumns: `repeat(${Math.max(1, Math.round(columns))}, minmax(0, 1fr))`,
  }

  return (
    <section className={styles.cloud} style={root} data-faded={faded || undefined}>
      {showLabel && label && (
        <span
          className={styles.label}
          style={{ fontSize: labelSize, color: labelColor }}
        >
          {label}
        </span>
      )}

      <div className={styles.grid} style={grid}>
        {marks.map((mark, index) =>
          onSelect ? (
            <button
              key={index}
              type="button"
              className={styles.logo}
              style={{ fontSize: logoSize }}
              onClick={() => onSelect(index)}
            >
              {mark}
            </button>
          ) : (
            <span key={index} className={styles.logo} style={{ fontSize: logoSize }}>
              {mark}
            </span>
          ),
        )}
      </div>
    </section>
  )
}
