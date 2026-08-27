import { useState, type CSSProperties } from 'react'
import styles from './Tooltip.module.css'

export type Placement = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  content?: string
  target?: string
  placement?: Placement
  /** `always` keeps the bubble pinned open; `hover` behaves like a real tooltip. */
  trigger?: 'always' | 'hover'
  /** Master switch — turn it off to hide the bubble entirely. */
  visible?: boolean
  arrow?: boolean
  arrowSize?: number
  offset?: number
  maxWidth?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  fontSize?: number
  fontWeight?: number
  background?: string
  textColor?: string
  shadow?: boolean
}

export default function Tooltip({
  content = 'Rebuilds on every push',
  target = 'Auto-deploy',
  placement = 'top',
  trigger = 'always',
  visible = true,
  arrow = true,
  arrowSize = 6,
  offset = 8,
  maxWidth = 220,
  paddingX = 10,
  paddingY = 6,
  radius = 6,
  fontSize = 12.5,
  fontWeight = 500,
  background = '#17191c',
  textColor = '#ffffff',
  shadow = true,
}: TooltipProps) {
  // Hover is local UI state, not a controlled prop — it doesn't belong in the
  // generated JSX.
  const [hovered, setHovered] = useState(false)
  const open = visible && (trigger === 'always' || hovered)

  const gap = offset + (arrow ? arrowSize : 0)

  const bubble: CSSProperties = {
    maxWidth,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: radius,
    fontSize,
    fontWeight,
    backgroundColor: background,
    color: textColor,
    boxShadow: shadow ? '0 4px 14px rgba(15, 23, 42, 0.24)' : undefined,
  }

  // Anchor the bubble to the opposite edge, then centre it on the cross axis.
  if (placement === 'top') {
    bubble.bottom = '100%'
    bubble.left = '50%'
    bubble.transform = 'translateX(-50%)'
    bubble.marginBottom = gap
  } else if (placement === 'bottom') {
    bubble.top = '100%'
    bubble.left = '50%'
    bubble.transform = 'translateX(-50%)'
    bubble.marginTop = gap
  } else if (placement === 'left') {
    bubble.right = '100%'
    bubble.top = '50%'
    bubble.transform = 'translateY(-50%)'
    bubble.marginRight = gap
  } else {
    bubble.left = '100%'
    bubble.top = '50%'
    bubble.transform = 'translateY(-50%)'
    bubble.marginLeft = gap
  }

  // A rotated square poking out of the bubble's edge.
  const pointer: CSSProperties = {
    width: arrowSize * 2,
    height: arrowSize * 2,
    backgroundColor: background,
  }

  if (placement === 'top') {
    pointer.top = '100%'
    pointer.left = '50%'
    pointer.transform = 'translate(-50%, -50%) rotate(45deg)'
  } else if (placement === 'bottom') {
    pointer.bottom = '100%'
    pointer.left = '50%'
    pointer.transform = 'translate(-50%, 50%) rotate(45deg)'
  } else if (placement === 'left') {
    pointer.left = '100%'
    pointer.top = '50%'
    pointer.transform = 'translate(-50%, -50%) rotate(45deg)'
  } else {
    pointer.right = '100%'
    pointer.top = '50%'
    pointer.transform = 'translate(50%, -50%) rotate(45deg)'
  }

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className={styles.target} tabIndex={trigger === 'hover' ? 0 : undefined}>
        {target}
      </span>

      {open && content && (
        <span className={styles.bubble} style={bubble} role="tooltip">
          {content}
          {arrow && <span className={styles.arrow} style={pointer} aria-hidden="true" />}
        </span>
      )}
    </span>
  )
}
