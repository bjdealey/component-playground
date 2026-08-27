import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Toast.module.css'

export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToastProps {
  visible?: boolean
  title?: string
  body?: string
  /** Trailing action — compose a `<Button />` here. */
  action?: ReactNode
  /** Tone mark — compose an `<IconBadge />` here. */
  icon?: ReactNode
  showIcon?: boolean
  showClose?: boolean
  position?: Corner
  frameWidth?: number
  frameHeight?: number
  showFrame?: boolean
  width?: number
  inset?: number
  padding?: number
  gap?: number
  radius?: number
  titleSize?: number
  bodySize?: number
  background?: string
  titleColor?: string
  bodyColor?: string
  frameColor?: string
  onClose?: (visible: boolean) => void
}

export default function Toast({
  visible = true,
  title = 'Deployed to production',
  body = 'preview-4f2a is now live.',
  action,
  icon,
  showIcon = true,
  showClose = true,
  position = 'bottom-right',
  frameWidth = 400,
  frameHeight = 200,
  showFrame = true,
  width = 280,
  inset = 14,
  padding = 12,
  gap = 10,
  radius = 10,
  titleSize = 13.5,
  bodySize = 12.5,
  background = '#ffffff',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  frameColor = '#e3e6ea',
  onClose,
}: ToastProps) {
  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right']

  const toast: CSSProperties = {
    width: Math.min(width, frameWidth - inset * 2),
    padding,
    gap,
    borderRadius: radius,
    backgroundColor: background,
    [vertical]: inset,
    [horizontal]: inset,
  }

  return (
    <div
      className={styles.frame}
      style={{
        width: frameWidth,
        height: frameHeight,
        borderRadius: radius,
        borderWidth: showFrame ? 1 : 0,
        borderColor: frameColor,
      }}
    >
      {visible ? (
        <div className={styles.toast} style={toast} role="status">
          {showIcon && icon && <span className={styles.icon}>{icon}</span>}

          <div className={styles.content}>
            {title && (
              <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
                {title}
              </span>
            )}
            {body && (
              <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.45 }}>{body}</span>
            )}
          </div>

          {action && <span className={styles.action}>{action}</span>}

          {showClose && (
            <IconButton
              glyph="×"
              label="Dismiss"
              size={18}
              radius={4}
              fontScale={0.85}
              onClick={() => onClose?.(false)}
            />
          )}
        </div>
      ) : (
        <span className={styles.hint} style={{ color: bodyColor }}>
          Dismissed — flip <code>visible</code> back on
        </span>
      )}
    </div>
  )
}
