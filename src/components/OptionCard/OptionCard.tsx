import type { CSSProperties, ReactNode } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import styles from './OptionCard.module.css'

export interface OptionCardProps {
  /** Leading mark — compose an `<IconBadge />` here. */
  icon?: ReactNode
  title?: string
  description?: string
  meta?: string
  selected?: boolean
  disabled?: boolean
  showCheckbox?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  titleSize?: number
  descriptionSize?: number
  background?: string
  borderColor?: string
  selectedBackground?: string
  selectedBorderColor?: string
  titleColor?: string
  descriptionColor?: string
  accentColor?: string
  onToggle?: (selected: boolean) => void
}

/** A selectable card. The tick is a real `Checkbox`, driven by `selected`. */
export default function OptionCard({
  icon,
  title = 'Preview deployments',
  description = 'Build every branch and get a shareable URL.',
  meta = 'Included',
  selected = false,
  disabled = false,
  showCheckbox = true,
  width = 340,
  padding = 14,
  gap = 12,
  radius = 12,
  borderWidth = 1,
  titleSize = 13.5,
  descriptionSize = 12.5,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  selectedBackground = '#f7f8ff',
  selectedBorderColor = '#4f46e5',
  titleColor = '#17191c',
  descriptionColor = '#6b7280',
  accentColor = '#4f46e5',
  onToggle,
}: OptionCardProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor: selected ? selectedBorderColor : borderColor,
    backgroundColor: selected ? selectedBackground : background,
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }

  return (
    <div
      className={styles.card}
      style={root}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && onToggle?.(!selected)}
    >
      {icon && <span className={styles.icon}>{icon}</span>}

      <div className={styles.body} style={{ gap: gap / 4 }}>
        <span className={styles.header} style={{ gap: gap / 2 }}>
          <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
            {title}
          </span>
          {meta && (
            <span style={{ fontSize: descriptionSize, color: descriptionColor }}>{meta}</span>
          )}
        </span>
        {description && (
          <span style={{ fontSize: descriptionSize, color: descriptionColor, lineHeight: 1.5 }}>
            {description}
          </span>
        )}
      </div>

      {showCheckbox && (
        <span className={styles.check}>
          <Checkbox
            label=""
            checked={selected}
            disabled={disabled}
            checkedColor={accentColor}
            gap={0}
          />
        </span>
      )}
    </div>
  )
}
