import type { CSSProperties, ReactNode } from 'react'
import styles from './ChatMessage.module.css'

export interface ChatMessageProps {
  /** Who is speaking. Drives the side, the tint, and whether actions show. */
  role?: 'assistant' | 'user'
  /** The message text. */
  children?: ReactNode
  /** Sender label above the message — 'Claude', 'You'. */
  name?: string
  timestamp?: string
  /** Portrait — compose an `<Avatar />` here. */
  avatar?: ReactNode
  showAvatar?: boolean
  showName?: boolean
  /** The assistant is still generating: a caret blinks after the text. */
  streaming?: boolean
  /** Copy / retry affordances — only rendered under an assistant turn. */
  showActions?: boolean
  maxWidth?: number
  radius?: number
  padding?: number
  gap?: number
  fontSize?: number
  metaSize?: number
  /** How far the user bubble is tinted toward the accent, in percent. */
  userTint?: number
  background?: string
  accentColor?: string
  textColor?: string
  metaColor?: string
  borderColor?: string
  borderWidth?: number
  onCopy?: () => void
  onRetry?: () => void
}

/** Thin-line glyphs, so the actions match the rest of the workbench chrome. */
const ICON = { width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

function CopyIcon() {
  return (
    <svg {...ICON} aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  )
}

function RetryIcon() {
  return (
    <svg {...ICON} aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

export default function ChatMessage({
  role = 'assistant',
  children = 'You can center a div with flexbox: set the parent to `display: flex` and use `justify-content: center` and `align-items: center`. Grid works too — `display: grid; place-items: center`.',
  name = 'Claude',
  timestamp = '',
  avatar,
  showAvatar = true,
  showName = true,
  streaming = false,
  showActions = true,
  maxWidth = 560,
  radius = 14,
  padding = 12,
  gap = 11,
  fontSize = 14,
  metaSize = 12,
  userTint = 14,
  background = '#f4f5f7',
  accentColor = '#4f46e5',
  textColor = '#17191c',
  metaColor = '#6b7280',
  borderColor = '#e3e6ea',
  borderWidth = 0,
  onCopy,
  onRetry,
}: ChatMessageProps) {
  const isUser = role === 'user'

  // The user bubble is the surface tinted toward the accent, so both its colours
  // ride the theme rather than a hard-coded fill. The assistant keeps the plain
  // surface — the tool's own panels read that way, and the actions carry the brand.
  const bubbleBackground = isUser
    ? `color-mix(in srgb, ${accentColor} ${userTint}%, ${background})`
    : background

  const bubble: CSSProperties = {
    maxWidth,
    padding,
    borderRadius: radius,
    background: bubbleBackground,
    color: textColor,
    fontSize,
    borderWidth,
    borderColor,
    borderStyle: borderWidth > 0 ? 'solid' : undefined,
  }

  return (
    <div
      className={styles.message}
      data-role={role}
      style={{ gap, ['--accent' as string]: accentColor }}
    >
      {showAvatar && avatar && <span className={styles.avatar}>{avatar}</span>}

      <div className={styles.body} style={{ maxWidth }}>
        {(showName || timestamp) && (
          <div className={styles.header} style={{ fontSize: metaSize, color: metaColor }}>
            {showName && name && <span className={styles.name}>{name}</span>}
            {timestamp && <span className={styles.time}>{timestamp}</span>}
          </div>
        )}

        <div className={styles.bubble} style={bubble}>
          {children}
          {streaming && (
            <span className={styles.caret} style={{ background: accentColor }} aria-hidden="true" />
          )}
        </div>

        {showActions && !isUser && (
          <div className={styles.actions} style={{ color: metaColor, fontSize: metaSize }}>
            <button type="button" className={styles.action} aria-label="Copy message" onClick={() => onCopy?.()}>
              <CopyIcon />
              Copy
            </button>
            <button type="button" className={styles.action} aria-label="Regenerate response" onClick={() => onRetry?.()}>
              <RetryIcon />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
