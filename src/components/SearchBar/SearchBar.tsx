import type { CSSProperties, ReactNode } from 'react'
import styles from './SearchBar.module.css'

export interface SearchBarProps {
  value?: string
  placeholder?: string
  /** Shortcut hint — compose a `<Kbd />` here. */
  hint?: ReactNode
  /** Trailing control — compose an `<IconButton />` here. */
  action?: ReactNode
  glyph?: string
  showHint?: boolean
  width?: number
  height?: number
  paddingX?: number
  gap?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  background?: string
  textColor?: string
  borderColor?: string
  focusColor?: string
  glyphColor?: string
  onChange?: (value: string) => void
}

export default function SearchBar({
  value = '',
  placeholder = 'Search components…',
  hint,
  action,
  glyph = '⌕',
  showHint = true,
  width = 340,
  height = 38,
  paddingX = 12,
  gap = 9,
  radius = 8,
  borderWidth = 1,
  fontSize = 13.5,
  background = '#ffffff',
  textColor = '#17191c',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  glyphColor = '#9aa1ab',
  onChange,
}: SearchBarProps) {
  const root: CSSProperties = {
    width,
    height,
    padding: `0 ${paddingX}px`,
    gap,
    borderRadius: radius,
    borderWidth,
    backgroundColor: background,
    // Border colour rides a custom property so :focus-within can win.
    ['--bar-border' as string]: borderColor,
    ['--focus-color' as string]: focusColor,
  }

  return (
    <div className={styles.bar} style={root}>
      {glyph && (
        <span className={styles.glyph} style={{ color: glyphColor, fontSize: fontSize * 1.15 }}>
          {glyph}
        </span>
      )}

      <input
        type="text"
        className={styles.input}
        style={{ fontSize, color: textColor }}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />

      {showHint && hint && <span className={styles.hint}>{hint}</span>}
      {action && <span className={styles.action}>{action}</span>}
    </div>
  )
}
