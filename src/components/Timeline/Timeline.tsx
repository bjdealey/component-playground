import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Timeline.module.css'

export interface TimelineProps {
  /** Events separated by `;`, each `time|title|body`. */
  items?: string
  width?: number
  dotSize?: number
  lineWidth?: number
  gap?: number
  rowGap?: number
  /** Events before this index render in the completed colour. */
  activeIndex?: number
  filled?: boolean
  timeWidth?: number
  showTime?: boolean
  titleSize?: number
  bodySize?: number
  timeSize?: number
  dotColor?: string
  pastColor?: string
  lineColor?: string
  titleColor?: string
  bodyColor?: string
  timeColor?: string
  /** A row paints no background of its own, so this is the whole of the tint. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Receives the index of the event that was activated. */
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Event {
  time: string
  title: string
  body: string
}

export function parseEvents(items: string): Event[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [time = '', title = '', ...rest] = chunk.split('|')
      return { time: time.trim(), title: title.trim(), body: rest.join('|').trim() }
    })
}

export default function Timeline({
  items = '09:14|Build started|Installing dependencies from the lockfile.;09:16|Tests passed|312 tests, 0 failures.;09:18|Deployed|Live behind the preview flag.',
  width = 360,
  dotSize = 11,
  lineWidth = 2,
  gap = 14,
  rowGap = 20,
  activeIndex = 3,
  filled = true,
  timeWidth = 48,
  showTime = true,
  titleSize = 13.5,
  bodySize = 12.5,
  timeSize = 12,
  dotColor = '#4f46e5',
  pastColor = '#15803d',
  lineColor = '#e3e6ea',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  timeColor = '#9aa1ab',
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onSelect,
  onHoverChange,
}: TimelineProps) {
  const events = parseEvents(items)

  return (
    <div className={styles.timeline} style={{ width, gap: rowGap }}>
      {events.map((event, index) => {
        const past = index < activeIndex
        const color = past ? pastColor : dotColor
        const last = index === events.length - 1

        const dot: CSSProperties = {
          width: dotSize,
          height: dotSize,
          backgroundColor: filled ? color : 'transparent',
          borderColor: color,
          borderWidth: filled ? 0 : Math.max(1.5, lineWidth),
        }

        return (
          <div
            key={index}
            className={styles.row}
            style={{
              gap,
              // The row paints nothing of its own, but the base still has to
              // travel as a custom property for the :hover fallback to land on.
              ['--timeline-background' as string]: 'transparent',
              ...hoverStyle('timeline', {
                background: hoverBackground,
                brightness: hoverBrightness,
              }),
            }}
            {...clickable(onSelect ? () => onSelect(index) : undefined)}
            // Pinning every row at once reads as a bug; the first one shows the
            // state just as well.
            {...hoverable(hovered && index === 0, onHoverChange)}
          >
            {showTime && (
              <span
                className={styles.time}
                style={{ width: timeWidth, fontSize: timeSize, color: timeColor }}
              >
                {event.time}
              </span>
            )}

            <span className={styles.rail} style={{ width: dotSize }}>
              <span className={styles.dot} style={dot} />
              {!last && (
                <span
                  className={styles.line}
                  style={{
                    width: lineWidth,
                    backgroundColor: past ? pastColor : lineColor,
                    top: dotSize,
                    bottom: -rowGap,
                  }}
                />
              )}
            </span>

            <div className={styles.content}>
              {event.title && (
                <span
                  className={styles.title}
                  style={{ fontSize: titleSize, color: titleColor }}
                >
                  {event.title}
                </span>
              )}
              {event.body && (
                <span style={{ fontSize: bodySize, color: bodyColor }}>{event.body}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
