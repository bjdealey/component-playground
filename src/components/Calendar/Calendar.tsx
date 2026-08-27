import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Calendar.module.css'

export interface CalendarProps {
  year?: number
  /** 1–12. */
  month?: number
  /** Day of month to mark as selected; 0 selects none. */
  selectedDay?: number
  /** Day of month to ring as "today"; 0 marks none. */
  todayDay?: number
  weekStartsOn?: 'sunday' | 'monday'
  showOutsideDays?: boolean
  showHeader?: boolean
  cellSize?: number
  gap?: number
  radius?: number
  borderWidth?: number
  borderColor?: string
  background?: string
  padding?: number
  headerWeight?: number
  fontSize?: number
  headerSize?: number
  weekdaySize?: number
  textColor?: string
  mutedColor?: string
  headerColor?: string
  weekdayColor?: string
  selectedBackground?: string
  selectedTextColor?: string
  todayRingColor?: string
  /** Empty keeps the day's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onSelect?: (day: number) => void
  onHoverChange?: (hovered: boolean) => void
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function Calendar({
  year = 2026,
  month = 7,
  selectedDay = 15,
  todayDay = 25,
  weekStartsOn = 'monday',
  showOutsideDays = true,
  showHeader = true,
  cellSize = 34,
  gap = 2,
  radius = 8,
  borderWidth = 0,
  borderColor = '#e3e6ea',
  background = '#ffffff',
  padding = 0,
  headerWeight = 600,
  fontSize = 13,
  headerSize = 14,
  weekdaySize = 11,
  textColor = '#17191c',
  mutedColor = '#c3c8d0',
  headerColor = '#17191c',
  weekdayColor = '#9aa1ab',
  selectedBackground = '#4f46e5',
  selectedTextColor = '#ffffff',
  todayRingColor = '#4f46e5',
  hoverBackground = 'rgba(15, 23, 42, 0.05)',
  hoverTextColor = '',
  hoverBrightness = 0.94,
  hovered = false,
  onSelect,
  onHoverChange,
}: CalendarProps) {
  const monthIndex = Math.min(11, Math.max(0, Math.round(month) - 1))
  const offset = weekStartsOn === 'monday' ? 1 : 0

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const daysInPrev = new Date(year, monthIndex, 0).getDate()

  // How many leading cells belong to the previous month.
  const firstWeekday = new Date(year, monthIndex, 1).getDay()
  const lead = (firstWeekday - offset + 7) % 7

  const weekdays = WEEKDAYS.slice(offset).concat(WEEKDAYS.slice(0, offset))

  // Always six rows, so the grid doesn't change height month to month.
  const cells: { day: number; outside: boolean }[] = []
  for (let i = 0; i < lead; i += 1) {
    cells.push({ day: daysInPrev - lead + 1 + i, outside: true })
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, outside: false })
  }
  let next = 1
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({ day: next, outside: true })
    next += 1
    if (cells.length >= 42) break
  }

  return (
    <div
      className={styles.calendar}
      style={{
        gap: gap + 4,
        borderWidth,
        borderColor,
        borderStyle: borderWidth > 0 ? 'solid' : undefined,
        backgroundColor: background,
        borderRadius: radius,
        padding,
        boxSizing: 'border-box',
      }}
    >
      {showHeader && (
        <div className={styles.header} style={{ fontSize: headerSize, fontWeight: headerWeight, color: headerColor }}>
          {MONTHS[monthIndex]} {year}
        </div>
      )}

      <div className={styles.grid} style={{ gap }}>
        {weekdays.map((weekday) => (
          <span
            key={weekday}
            className={styles.weekday}
            style={{ width: cellSize, height: cellSize, fontSize: weekdaySize, color: weekdayColor }}
          >
            {weekday}
          </span>
        ))}

        {cells.map((cell, index) => {
          const selected = !cell.outside && cell.day === selectedDay
          const today = !cell.outside && cell.day === todayDay

          const style: CSSProperties = {
            width: cellSize,
            height: cellSize,
            borderRadius: radius,
            fontSize,
            boxShadow: today && !selected ? `inset 0 0 0 1.5px ${todayRingColor}` : undefined,
            visibility: cell.outside && !showOutsideDays ? 'hidden' : undefined,
            cursor: onSelect && !cell.outside ? 'pointer' : 'default',
            // Routed through custom properties, not set directly: an inline
            // declaration would outrank the :hover rule and kill the state.
            ['--calendar-color' as string]:
              selected ? selectedTextColor : cell.outside ? mutedColor : textColor,
            ['--calendar-background' as string]: selected ? selectedBackground : 'transparent',
            ...hoverStyle('calendar', {
              // The selected day keeps its own fill — washing it out would leave
              // its white label on a near-white wash.
              background: selected ? '' : hoverBackground,
              color: hoverTextColor,
              brightness: hoverBrightness,
            }),
          }

          return (
            <button
              key={index}
              type="button"
              className={styles.day}
              style={style}
              aria-selected={selected}
              aria-current={today ? 'date' : undefined}
              disabled={cell.outside}
              onClick={() => !cell.outside && onSelect?.(cell.day)}
              // Pinning every day at once reads as a bug, and the leading cells
              // are disabled outside days — so pin the 1st of the month.
              {...hoverable(hovered && index === lead, onHoverChange)}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
