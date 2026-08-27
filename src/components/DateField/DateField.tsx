import type { CSSProperties } from 'react'
import Calendar from '../Calendar/Calendar'
import IconButton from '../IconButton/IconButton'
import Input from '../Input/Input'
import styles from './DateField.module.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export interface DateFieldProps {
  label?: string
  year?: number
  month?: number
  day?: number
  open?: boolean
  helperText?: string
  width?: number
  gap?: number
  radius?: number
  borderWidth?: number
  cellSize?: number
  accentColor?: string
  background?: string
  borderColor?: string
  onSelectDay?: (day: number) => void
  onToggleOpen?: (open: boolean) => void
}

/**
 * A text field with a calendar underneath.
 *
 * Both children arrive by import: the field's text is *derived* from the day the
 * calendar has selected, so they share one value and can't be configured apart.
 */
export default function DateField({
  label = 'Release date',
  year = 2026,
  month = 7,
  day = 20,
  open = true,
  helperText = '',
  width = 260,
  gap = 8,
  radius = 8,
  borderWidth = 1,
  cellSize = 30,
  accentColor = '#4f46e5',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  onSelectDay,
  onToggleOpen,
}: DateFieldProps) {
  const monthName = MONTHS[Math.min(11, Math.max(0, month - 1))]
  const text = day > 0 ? `${day} ${monthName} ${year}` : ''

  const panel: CSSProperties = {
    marginTop: gap,
    padding: gap + 2,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.field} style={{ width, gap }}>
      <span className={styles.row}>
        <span className={styles.input}>
          <Input
            label={label}
            value={text}
            placeholder="Pick a date"
            helperText={helperText}
            fullWidth
            radius={radius}
            focusColor={accentColor}
          />
        </span>
        <span className={styles.trigger}>
          <IconButton
            glyph="▦"
            label={open ? 'Hide calendar' : 'Show calendar'}
            size={30}
            radius={radius}
            onClick={() => onToggleOpen?.(!open)}
          />
        </span>
      </span>

      {open && (
        <div className={styles.panel} style={panel}>
          <Calendar
            year={year}
            month={month}
            selectedDay={day}
            todayDay={0}
            cellSize={cellSize}
            selectedBackground={accentColor}
            todayRingColor={accentColor}
            onSelect={onSelectDay}
          />
        </div>
      )}
    </div>
  )
}
