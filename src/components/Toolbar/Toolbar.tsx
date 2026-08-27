import Divider from '../Divider/Divider'
import IconButton from '../IconButton/IconButton'
import styles from './Toolbar.module.css'

export interface ToolbarProps {
  /**
   * Buttons separated by `,`, each `glyph|label`. A bare `|` becomes a divider.
   */
  items?: string
  activeIndex?: number
  buttonSize?: number
  gap?: number
  padding?: number
  radius?: number
  buttonRadius?: number
  borderWidth?: number
  background?: string
  borderColor?: string
  buttonColor?: string
  activeBackground?: string
  activeColor?: string
  dividerColor?: string
  onSelect?: (index: number) => void
}

interface Entry {
  glyph: string
  label: string
  divider: boolean
}

export function parseItems(items: string): Entry[] {
  return items
    .split(',')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      if (chunk === '|') return { glyph: '', label: '', divider: true }
      const [glyph = '', label = ''] = chunk.split('|')
      return { glyph: glyph.trim(), label: label.trim() || glyph.trim(), divider: false }
    })
}

/**
 * A strip of real `IconButton`s with real `Divider`s between groups. Repeated
 * and data-driven, so it composes by import rather than by slot.
 */
export default function Toolbar({
  items = 'B|Bold, I|Italic, U|Underline, |, ≡|Align, ⌫|Delete',
  activeIndex = 0,
  buttonSize = 30,
  gap = 2,
  padding = 4,
  radius = 8,
  buttonRadius = 6,
  borderWidth = 1,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  buttonColor = '#3f434a',
  activeBackground = '#eef2ff',
  activeColor = '#4f46e5',
  dividerColor = '#e3e6ea',
  onSelect,
}: ToolbarProps) {
  const entries = parseItems(items)

  return (
    <div
      className={styles.toolbar}
      style={{ gap, padding, borderRadius: radius, borderWidth, borderColor, backgroundColor: background }}
      role="toolbar"
    >
      {entries.map((entry, index) =>
        entry.divider ? (
          <span
            key={`divider-${index}`}
            className={styles.divider}
            style={{ margin: `0 ${gap + 2}px`, height: buttonSize - 8 }}
          >
            <Divider orientation="vertical" color={dividerColor} />
          </span>
        ) : (
          <IconButton
            key={`${entry.label}-${index}`}
            glyph={entry.glyph}
            label={entry.label}
            size={buttonSize}
            radius={buttonRadius}
            fontScale={0.5}
            background={index === activeIndex ? activeBackground : 'transparent'}
            color={index === activeIndex ? activeColor : buttonColor}
            onClick={() => onSelect?.(index)}
          />
        ),
      )}
    </div>
  )
}
