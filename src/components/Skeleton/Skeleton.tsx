import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  lines?: number
  width?: number
  height?: number
  radius?: number
  gap?: number
  /** Fraction of full width for the last text line, so it reads as a paragraph. */
  lastLineWidth?: number
  shimmer?: boolean
  speed?: number
  baseColor?: string
  highlightColor?: string
}

export default function Skeleton({
  variant = 'text',
  lines = 3,
  width = 260,
  height = 12,
  radius = 4,
  gap = 8,
  lastLineWidth = 60,
  shimmer = true,
  speed = 1.4,
  baseColor = '#e6e8ec',
  highlightColor = '#f4f5f7',
}: SkeletonProps) {
  const bar = (style: CSSProperties, key?: number) => (
    <span
      key={key}
      className={`${styles.bar} ${shimmer ? styles.shimmer : ''}`}
      style={{
        backgroundColor: baseColor,
        ['--highlight' as string]: highlightColor,
        animationDuration: `${speed}s`,
        ...style,
      }}
    />
  )

  if (variant === 'circle') {
    return (
      <span className={styles.wrapper} aria-hidden="true">
        {bar({ width: height, height, borderRadius: '50%' })}
      </span>
    )
  }

  if (variant === 'rect') {
    return (
      <span className={styles.wrapper} aria-hidden="true">
        {bar({ width, height, borderRadius: radius })}
      </span>
    )
  }

  const count = Math.max(1, Math.round(lines))

  return (
    <span className={styles.wrapper} style={{ gap, width }} aria-hidden="true">
      {Array.from({ length: count }, (_, index) =>
        bar(
          {
            width: index === count - 1 && count > 1 ? `${lastLineWidth}%` : '100%',
            height,
            borderRadius: radius,
          },
          index,
        ),
      )}
    </span>
  )
}
