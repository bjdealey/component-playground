import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Popover.module.css'

export type Placement = 'top' | 'right' | 'bottom' | 'left'

export interface PopoverProps {
  target?: string
  title?: string
  body?: string
  /** Footer action — compose a `<Button />` here. */
  action?: ReactNode
  placement?: Placement
  open?: boolean
  showClose?: boolean
  arrow?: boolean
  arrowSize?: number
  offset?: number
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  titleSize?: number
  bodySize?: number
  background?: string
  borderColor?: string
  titleColor?: string
  bodyColor?: string
  onClose?: (open: boolean) => void
}

export default function Popover({
  target = 'Deploy settings',
  title = 'Preview builds',
  body = 'Every push to a branch gets its own URL. Builds expire after 30 days.',
  action,
  placement = 'bottom',
  open = true,
  showClose = true,
  arrow = true,
  arrowSize = 7,
  offset = 10,
  width = 260,
  padding = 14,
  gap = 8,
  radius = 10,
  borderWidth = 1,
  titleSize = 13.5,
  bodySize = 12.5,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  onClose,
}: PopoverProps) {
  const distance = offset + (arrow ? arrowSize : 0)

  const panel: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
  }

  // Anchor to the opposite edge, then centre on the cross axis.
  if (placement === 'top') {
    Object.assign(panel, { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: distance })
  } else if (placement === 'bottom') {
    Object.assign(panel, { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: distance })
  } else if (placement === 'left') {
    Object.assign(panel, { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: distance })
  } else {
    Object.assign(panel, { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: distance })
  }

  // A rotated square, border included, poking out of the panel edge.
  const pointer: CSSProperties = {
    width: arrowSize * 2,
    height: arrowSize * 2,
    backgroundColor: background,
    borderWidth,
    borderColor,
  }

  if (placement === 'top') {
    Object.assign(pointer, { top: '100%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' })
  } else if (placement === 'bottom') {
    Object.assign(pointer, { bottom: '100%', left: '50%', transform: 'translate(-50%, 50%) rotate(45deg)' })
  } else if (placement === 'left') {
    Object.assign(pointer, { left: '100%', top: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' })
  } else {
    Object.assign(pointer, { right: '100%', top: '50%', transform: 'translate(50%, -50%) rotate(45deg)' })
  }

  return (
    <span className={styles.wrapper}>
      <span className={styles.target}>{target}</span>

      {open && (
        <div className={styles.panel} style={panel} role="dialog">
          {arrow && <span className={styles.arrow} style={pointer} aria-hidden="true" />}

          <div className={styles.header}>
            {title && (
              <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
                {title}
              </span>
            )}
            {showClose && (
              <IconButton
                glyph="×"
                label="Close"
                size={20}
                radius={5}
                color="#9aa1ab"
                fontScale={0.8}
                onClick={() => onClose?.(false)}
              />
            )}
          </div>

          {body && (
            <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.5 }}>{body}</span>
          )}

          {action && <span className={styles.action}>{action}</span>}
        </div>
      )}
    </span>
  )
}
