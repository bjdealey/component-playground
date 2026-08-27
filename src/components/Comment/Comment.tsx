import type { CSSProperties, ReactNode } from 'react'
import Button from '../Button/Button'
import styles from './Comment.module.css'

export interface CommentProps {
  /** Author portrait — compose an `<Avatar />` here. */
  avatar?: ReactNode
  author?: string
  timestamp?: string
  body?: string
  likes?: number
  liked?: boolean
  depth?: number
  showActions?: boolean
  showThreadLine?: boolean
  width?: number
  indent?: number
  gap?: number
  authorSize?: number
  bodySize?: number
  metaSize?: number
  authorColor?: string
  bodyColor?: string
  metaColor?: string
  accentColor?: string
  threadColor?: string
  onToggleLike?: (liked: boolean) => void
}

export default function Comment({
  avatar,
  author = 'Maya Reyes',
  timestamp = '2h ago',
  body = 'Pinning the palette in one module was the right call — the charts were drifting apart before.',
  likes = 4,
  liked = false,
  depth = 0,
  showActions = true,
  showThreadLine = true,
  width = 400,
  indent = 34,
  gap = 12,
  authorSize = 13.5,
  bodySize = 13,
  metaSize = 12,
  authorColor = '#17191c',
  bodyColor = '#3f434a',
  metaColor = '#9aa1ab',
  accentColor = '#4f46e5',
  threadColor = '#eceef1',
  onToggleLike,
}: CommentProps) {
  const root: CSSProperties = {
    width,
    gap,
    marginLeft: depth * indent,
    borderLeftWidth: depth > 0 && showThreadLine ? 2 : 0,
    borderLeftColor: threadColor,
    paddingLeft: depth > 0 && showThreadLine ? indent / 2 : 0,
  }

  return (
    <div className={styles.comment} style={root}>
      {avatar && <span className={styles.avatar}>{avatar}</span>}

      <div className={styles.body} style={{ gap: gap / 3 }}>
        <span className={styles.header} style={{ gap: gap / 2 }}>
          <span className={styles.author} style={{ fontSize: authorSize, color: authorColor }}>
            {author}
          </span>
          <span style={{ fontSize: metaSize, color: metaColor }}>{timestamp}</span>
        </span>

        <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.55 }}>{body}</span>

        {showActions && (
          <div className={styles.actions} style={{ gap: gap / 3 }}>
            <Button
              variant="ghost"
              paddingX={6}
              paddingY={4}
              fontSize={metaSize}
              borderWidth={0}
              textColor={liked ? accentColor : metaColor}
              onClick={() => onToggleLike?.(!liked)}
            >
              {liked ? `♥ ${likes + 1}` : `♡ ${likes}`}
            </Button>
            <Button
              variant="ghost"
              paddingX={6}
              paddingY={4}
              fontSize={metaSize}
              borderWidth={0}
              textColor={metaColor}
            >
              Reply
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
