import type { ReactNode } from 'react'
import Progress from '../Progress/Progress'
import styles from './ReviewSummary.module.css'

export interface ReviewSummaryProps {
  /** Overall score — compose a `<Rating />` here. */
  rating?: ReactNode
  average?: string
  total?: string
  /** Counts from 5 stars down to 1, comma-separated. */
  distribution?: string
  width?: number
  gap?: number
  rowGap?: number
  barHeight?: number
  barRadius?: number
  showCounts?: boolean
  averageSize?: number
  totalSize?: number
  rowSize?: number
  averageColor?: string
  totalColor?: string
  rowColor?: string
  barColor?: string
  trackColor?: string
}

/**
 * A score plus its breakdown. The stars are a real `Rating`; each breakdown row
 * is a real `Progress`, so the bar geometry is defined in exactly one place.
 */
export default function ReviewSummary({
  rating,
  average = '4.3',
  total = '1,284 reviews',
  distribution = '742, 318, 141, 52, 31',
  width = 320,
  gap = 14,
  rowGap = 5,
  barHeight = 7,
  barRadius = 999,
  showCounts = true,
  averageSize = 34,
  totalSize = 12.5,
  rowSize = 12,
  averageColor = '#17191c',
  totalColor = '#9aa1ab',
  rowColor = '#6b7280',
  barColor = '#f59e0b',
  trackColor = '#eceef1',
}: ReviewSummaryProps) {
  const counts = distribution
    .split(',')
    .map((value) => Number(value.trim().replace(/,/g, '')))
    .filter((value) => Number.isFinite(value))

  const max = Math.max(1, ...counts)

  return (
    <div className={styles.summary} style={{ width, gap }}>
      <div className={styles.headline} style={{ gap: rowGap }}>
        <span className={styles.average} style={{ fontSize: averageSize, color: averageColor }}>
          {average}
        </span>
        {rating && <span className={styles.rating}>{rating}</span>}
        {total && <span style={{ fontSize: totalSize, color: totalColor }}>{total}</span>}
      </div>

      <div className={styles.rows} style={{ gap: rowGap }}>
        {counts.map((count, index) => (
          <div key={index} className={styles.row} style={{ gap: gap / 2 }}>
            <span className={styles.star} style={{ fontSize: rowSize, color: rowColor }}>
              {counts.length - index}★
            </span>
            <span className={styles.bar}>
              <Progress
                value={count}
                max={max}
                height={barHeight}
                radius={barRadius}
                fillColor={barColor}
                trackColor={trackColor}
              />
            </span>
            {showCounts && (
              <span className={styles.count} style={{ fontSize: rowSize, color: rowColor }}>
                {count.toLocaleString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
