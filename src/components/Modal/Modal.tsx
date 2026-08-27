import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Modal.module.css'

export interface ModalProps {
  open?: boolean
  title?: string
  body?: string
  /** Confirming action — compose a `<Button />` here. */
  primaryAction?: ReactNode
  /** Dismissing action — compose a `<Button />` here. */
  secondaryAction?: ReactNode
  showClose?: boolean
  /** The bounded stand-in for a viewport, so the overlay stays inspectable. */
  frameWidth?: number
  frameHeight?: number
  showFrame?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  overlayOpacity?: number
  titleSize?: number
  bodySize?: number
  overlayColor?: string
  background?: string
  titleColor?: string
  bodyColor?: string
  frameColor?: string
  onClose?: (open: boolean) => void
}

export default function Modal({
  open = true,
  title = 'Delete preview?',
  body = 'This removes the deployment and its URL. Builds stay in history.',
  primaryAction,
  secondaryAction,
  showClose = true,
  frameWidth = 420,
  frameHeight = 260,
  showFrame = true,
  width = 320,
  padding = 20,
  gap = 10,
  radius = 12,
  overlayOpacity = 0.45,
  titleSize = 15,
  bodySize = 13,
  overlayColor = '#0f172a',
  background = '#ffffff',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  frameColor = '#e3e6ea',
  onClose,
}: ModalProps) {
  const frame: CSSProperties = {
    width: frameWidth,
    height: frameHeight,
    borderRadius: radius,
    borderWidth: showFrame ? 1 : 0,
    borderColor: frameColor,
  }

  const dialog: CSSProperties = {
    width: Math.min(width, frameWidth - 24),
    padding,
    gap,
    borderRadius: radius,
    backgroundColor: background,
  }

  return (
    <div className={styles.frame} style={frame}>
      {open && (
        <>
          <span
            className={styles.overlay}
            style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
            onClick={() => onClose?.(false)}
          />

          <div className={styles.dialog} style={dialog} role="dialog" aria-modal="true">
            {showClose && (
              <span className={styles.close}>
                <IconButton
                  glyph="×"
                  label="Close"
                  size={24}
                  color="#9aa1ab"
                  onClick={() => onClose?.(false)}
                />
              </span>
            )}

            {title && (
              <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
                {title}
              </span>
            )}
            {body && (
              <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.5 }}>{body}</span>
            )}

            {(primaryAction || secondaryAction) && (
              <div className={styles.actions} style={{ gap: gap * 0.8, marginTop: gap * 0.4 }}>
                {secondaryAction}
                {primaryAction}
              </div>
            )}
          </div>
        </>
      )}

      {!open && (
        <span className={styles.hint} style={{ color: bodyColor }}>
          Closed — flip <code>open</code> back on
        </span>
      )}
    </div>
  )
}
