import type { CSSProperties, ReactNode } from 'react'
import styles from './Message.module.css'

export interface MessageProps {
  /** Sender portrait — compose an `<Avatar />` here. */
  avatar?: ReactNode
  body?: string
  author?: string
  timestamp?: string
  side?: 'left' | 'right'
  showAvatar?: boolean
  showTail?: boolean
  showMeta?: boolean
  status?: 'none' | 'sent' | 'delivered' | 'read'
  maxWidth?: number
  padding?: number
  gap?: number
  radius?: number
  tailSize?: number
  bodySize?: number
  metaSize?: number
  background?: string
  textColor?: string
  metaColor?: string
}

const TICKS: Record<string, string> = { sent: '✓', delivered: '✓✓', read: '✓✓' }

export default function Message({
  avatar,
  body = 'Pushed a fix for the palette drift — preview is rebuilding now.',
  author = 'Maya',
  timestamp = '14:02',
  side = 'left',
  showAvatar = true,
  showTail = true,
  showMeta = true,
  status = 'read',
  maxWidth = 280,
  padding = 11,
  gap = 9,
  radius = 14,
  tailSize = 7,
  bodySize = 13.5,
  metaSize = 11,
  background = '#f3f4f6',
  textColor = '#17191c',
  metaColor = '#9aa1ab',
}: MessageProps) {
  const bubble: CSSProperties = {
    maxWidth,
    padding,
    backgroundColor: background,
    color: textColor,
    fontSize: bodySize,
    // Square off the corner the tail attaches to.
    borderRadius:
      side === 'left'
        ? `${radius}px ${radius}px ${radius}px ${showTail ? 4 : radius}px`
        : `${radius}px ${radius}px ${showTail ? 4 : radius}px ${radius}px`,
  }

  const tail: CSSProperties = {
    borderTopWidth: tailSize,
    borderTopColor: background,
    [side === 'left' ? 'borderRightWidth' : 'borderLeftWidth']: tailSize,
    [side === 'left' ? 'borderRightColor' : 'borderLeftColor']: 'transparent',
    [side === 'left' ? 'left' : 'right']: -tailSize + 1,
  }

  return (
    <div className={`${styles.message} ${side === 'right' ? styles.right : ''}`} style={{ gap }}>
      {showAvatar && avatar && <span className={styles.avatar}>{avatar}</span>}

      <div className={styles.stack} style={{ gap: 3 }}>
        <span className={styles.bubble} style={bubble}>
          {body}
          {showTail && <span className={styles.tail} style={tail} aria-hidden="true" />}
        </span>

        {showMeta && (
          <span className={styles.meta} style={{ fontSize: metaSize, color: metaColor }}>
            {author && <span>{author}</span>}
            {timestamp && <span>{timestamp}</span>}
            {status !== 'none' && TICKS[status] && (
              <span style={{ color: status === 'read' ? '#0284c7' : metaColor }}>{TICKS[status]}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}
