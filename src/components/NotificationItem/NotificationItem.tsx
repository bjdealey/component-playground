import type { CSSProperties, ReactNode } from 'react'
import styles from './NotificationItem.module.css'

export interface NotificationItemProps {
  /** The actor's avatar — compose an `<Avatar />` here. */
  children?: ReactNode
  actor?: string
  action?: string
  target?: string
  timestamp?: string
  unread?: boolean
  showAvatar?: boolean
  showUnreadDot?: boolean
  showActions?: boolean
  /** Confirming action — compose a `<Button />` here. */
  primaryAction?: ReactNode
  /** Dismissing action — compose a `<Button />` here. */
  secondaryAction?: ReactNode
  width?: number
  padding?: number
  gap?: number
  radius?: number
  dotSize?: number
  fontSize?: number
  timeSize?: number
  background?: string
  unreadBackground?: string
  textColor?: string
  mutedColor?: string
  accentColor?: string
  onToggleRead?: (unread: boolean) => void
}

export default function NotificationItem({
  children,
  actor = 'Maya Reyes',
  action = 'requested review on',
  target = 'feat/manifest-bindings',
  timestamp = '12m ago',
  unread = true,
  showAvatar = true,
  showUnreadDot = true,
  showActions = true,
  primaryAction,
  secondaryAction,
  width = 380,
  padding = 14,
  gap = 12,
  radius = 10,
  dotSize = 7,
  fontSize = 13.5,
  timeSize = 12,
  background = '#ffffff',
  unreadBackground = '#f7f8ff',
  textColor = '#17191c',
  mutedColor = '#9aa1ab',
  accentColor = '#4f46e5',
  onToggleRead,
}: NotificationItemProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    backgroundColor: unread ? unreadBackground : background,
  }

  return (
    <div className={styles.item} style={root}>
      {showUnreadDot && (
        <button
          type="button"
          className={styles.dot}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: unread ? accentColor : 'transparent',
            marginTop: fontSize * 0.45,
          }}
          aria-label={unread ? 'Mark as read' : 'Mark as unread'}
          onClick={() => onToggleRead?.(!unread)}
        />
      )}

      {showAvatar && children}

      <div className={styles.content} style={{ gap: gap * 0.35 }}>
        <span className={styles.line} style={{ fontSize, color: textColor }}>
          {actor && <strong className={styles.actor}>{actor}</strong>}
          {action && <span style={{ color: mutedColor }}> {action} </span>}
          {target && <span className={styles.target}>{target}</span>}
        </span>

        {timestamp && (
          <span style={{ fontSize: timeSize, color: mutedColor }}>{timestamp}</span>
        )}

        {showActions && (primaryAction || secondaryAction) && (
          <div className={styles.actions} style={{ gap: gap * 0.6, marginTop: gap * 0.2 }}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  )
}
