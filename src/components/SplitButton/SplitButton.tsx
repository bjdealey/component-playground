import type { CSSProperties } from 'react'
import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'
import Menu from '../Menu/Menu'
import styles from './SplitButton.module.css'

export interface SplitButtonProps {
  label?: string
  /** Menu entries separated by `;`, each `label|shortcut`. `---` is a divider. */
  items?: string
  activeIndex?: number
  open?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
  radius?: number
  paddingX?: number
  paddingY?: number
  fontSize?: number
  menuWidth?: number
  accentColor?: string
  onToggleOpen?: (open: boolean) => void
  onSelect?: (index: number) => void
}

/**
 * A primary action joined to a menu trigger.
 *
 * All three parts arrive by import: the seats are clipped to give the pair one
 * outer radius, and the menu's open state belongs to this component.
 */
export default function SplitButton({
  label = 'Deploy',
  items = 'Deploy to preview|⌘P;Deploy to production|⌘⇧P;---;Cancel queued build|⌫',
  activeIndex = 0,
  open = true,
  variant = 'primary',
  radius = 6,
  paddingX = 14,
  paddingY = 9,
  fontSize = 13,
  menuWidth = 240,
  accentColor = '#4f46e5',
  onToggleOpen,
  onSelect,
}: SplitButtonProps) {
  const height = paddingY * 2 + fontSize + 2

  const leftSeat: CSSProperties = {
    borderRadius: `${radius}px 0 0 ${radius}px`,
  }
  const rightSeat: CSSProperties = {
    borderRadius: `0 ${radius}px ${radius}px 0`,
    marginLeft: 1,
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pair}>
        <span className={styles.seat} style={leftSeat}>
          <Button
            variant={variant}
            radius={0}
            paddingX={paddingX}
            paddingY={paddingY}
            fontSize={fontSize}
          >
            {label}
          </Button>
        </span>
        <span className={styles.seat} style={rightSeat}>
          <IconButton
            glyph="▾"
            label={open ? 'Hide options' : 'Show options'}
            shape="square"
            size={height}
            background={accentColor}
            color="#ffffff"
            hoverBackground={accentColor}
            fontScale={0.42}
            onClick={() => onToggleOpen?.(!open)}
          />
        </span>
      </div>

      {open && (
        <div className={styles.menu}>
          <Menu
            items={items}
            activeIndex={activeIndex}
            width={menuWidth}
            activeTextColor={accentColor}
            onSelect={onSelect}
          />
        </div>
      )}
    </div>
  )
}
