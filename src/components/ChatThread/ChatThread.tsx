import type { CSSProperties, ReactNode } from 'react'
import ChatMessage from '../ChatMessage/ChatMessage'
import styles from './ChatThread.module.css'

export interface ChatThreadProps {
  /** One turn per line, `role: text`. A line with no `role:` is the assistant. */
  transcript?: string
  title?: string
  /** The assistant is replying: the header says so and a dots bubble trails. */
  typing?: boolean
  showHeader?: boolean
  showAvatars?: boolean
  /** A composer — compose a `<ChatInput />` here. */
  composer?: ReactNode
  width?: number
  height?: number
  radius?: number
  bubbleRadius?: number
  borderWidth?: number
  userTint?: number
  padding?: number
  gap?: number
  fontSize?: number
  background?: string
  accentColor?: string
  textColor?: string
  metaColor?: string
  borderColor?: string
}

type Turn = { role: 'assistant' | 'user'; text: string }

/**
 * A row of turns is data, not a fixed set of slots, so it parses a script the
 * way `AvatarGroup` parses its people — one line each, `role: text`.
 */
function parseTurns(transcript: string): Turn[] {
  return transcript
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = /^(user|assistant)\s*:\s*(.*)$/i.exec(line)
      if (!match) return { role: 'assistant', text: line }
      return { role: match[1].toLowerCase() === 'user' ? 'user' : 'assistant', text: match[2] }
    })
}

const DEFAULT_TRANSCRIPT = [
  'user: How do I center a div?',
  'assistant: The simplest way is flexbox — set the parent to `display: flex`, then `justify-content: center` and `align-items: center`.',
  'user: Both axes at once?',
  'assistant: Those two cover both. For a one-liner, `display: grid; place-items: center` does the same thing.',
].join('\n')

export default function ChatThread({
  transcript = DEFAULT_TRANSCRIPT,
  title = 'Claude',
  typing = false,
  showHeader = true,
  showAvatars = true,
  composer,
  width = 540,
  height = 420,
  radius = 16,
  bubbleRadius = 14,
  borderWidth = 1,
  userTint = 14,
  padding = 16,
  gap = 16,
  fontSize = 14,
  background = '#ffffff',
  accentColor = '#4f46e5',
  textColor = '#17191c',
  metaColor = '#6b7280',
  borderColor = '#e3e6ea',
}: ChatThreadProps) {
  const turns = parseTurns(transcript)

  const panel: CSSProperties = {
    width,
    height,
    borderRadius: radius,
    borderWidth,
    borderColor,
    background,
    color: textColor,
  }

  // The assistant portrait is a small brand chip rather than a full Avatar —
  // one initial, so a wall of them in a scroll stays quiet.
  const avatar = (
    <span className={styles.mark} style={{ background: accentColor }} aria-hidden="true">
      {title.slice(0, 1).toUpperCase()}
    </span>
  )

  // Assistant turns sit transparent on the panel; only the user's bubble takes a
  // fill, tinted from the surface toward the accent. Both colours ride the theme.
  const bubbleFor = (role: 'assistant' | 'user', children: ReactNode, key: number | string) => (
    <ChatMessage
      key={key}
      role={role}
      showActions={false}
      showName={false}
      showAvatar={role === 'assistant' && showAvatars}
      avatar={avatar}
      background={role === 'user' ? background : 'transparent'}
      accentColor={accentColor}
      textColor={textColor}
      metaColor={metaColor}
      borderColor={borderColor}
      radius={bubbleRadius}
      userTint={userTint}
      fontSize={fontSize}
      padding={10}
      gap={10}
      maxWidth={Math.round(width * 0.82)}
    >
      {children}
    </ChatMessage>
  )

  return (
    <div className={styles.panel} style={panel}>
      {showHeader && (
        <div
          className={styles.header}
          style={{ padding: `${Math.round(padding * 0.7)}px ${padding}px`, borderColor }}
        >
          <span className={styles.mark} style={{ background: accentColor }} aria-hidden="true">
            {title.slice(0, 1).toUpperCase()}
          </span>
          <span className={styles.title}>{title}</span>
          <span className={styles.status} style={{ color: metaColor }}>
            <span
              className={styles.statusDot}
              style={{ background: typing ? accentColor : '#15803d' }}
            />
            {typing ? 'typing…' : 'online'}
          </span>
        </div>
      )}

      <div className={styles.scroll} style={{ padding, gap }}>
        {turns.map((turn, index) => bubbleFor(turn.role, turn.text, index))}

        {typing &&
          bubbleFor(
            'assistant',
            <span className={styles.dots} style={{ color: metaColor }} aria-label="Assistant is typing">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>,
            'typing',
          )}
      </div>

      {composer && (
        <div className={styles.footer} style={{ padding, borderColor }}>
          {composer}
        </div>
      )}
    </div>
  )
}
