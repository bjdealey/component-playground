import type { CSSProperties } from 'react'
import Avatar from '../Avatar/Avatar'
import styles from './AvatarGroup.module.css'

export interface AvatarGroupProps {
  /** Comma-separated initials — manifest props are primitives. */
  people?: string
  max?: number
  size?: number
  overlap?: number
  shape?: 'circle' | 'rounded' | 'square'
  ringWidth?: number
  ringColor?: string
  /** Comma-separated swatches, cycled across the faces. */
  palette?: string
  textColor?: string
  fontWeight?: number
  overflowBackground?: string
  overflowTextColor?: string
  /** Receives the index of the avatar that was activated. */
  onSelect?: (index: number) => void
  /** Fired by the "+N" avatar — usually opens the full list. */
  onOverflowClick?: () => void
}

const FALLBACK_PALETTE = ['#4f46e5', '#0284c7', '#15803d', '#d97706', '#db2777']

function split(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

/**
 * A row of real `Avatar`s. Because the count is data-driven this composes by
 * direct import rather than by a manifest slot — a slot is a single element.
 */
export default function AvatarGroup({
  people = 'BD, AK, MR, JL, TS',
  max = 4,
  size = 36,
  overlap = 10,
  shape = 'circle',
  ringWidth = 2,
  ringColor = '#ffffff',
  palette = '#4f46e5, #0284c7, #15803d, #d97706, #db2777',
  textColor = '#ffffff',
  fontWeight = 600,
  overflowBackground = '#eceef1',
  overflowTextColor = '#3f434a',
  onSelect,
  onOverflowClick,
}: AvatarGroupProps) {
  const everyone = split(people)
  const parsed = split(palette)
  const colors = parsed.length > 0 ? parsed : FALLBACK_PALETTE

  const limit = Math.max(1, Math.round(max))
  const shown = everyone.slice(0, limit)
  const hidden = everyone.length - shown.length

  // Avatar styles itself, so the overlap and stacking order live on a wrapper.
  const seat = (index: number): CSSProperties => ({
    marginLeft: index === 0 ? 0 : -overlap,
    zIndex: index,
  })

  const shared = { size, shape, ringWidth, ringColor, fontWeight } as const

  return (
    <span className={styles.group} style={{ paddingLeft: ringWidth, paddingTop: ringWidth }}>
      {shown.map((initials, index) => (
        <span key={`${initials}-${index}`} className={styles.seat} style={seat(index)}>
          <Avatar
            {...shared}
            initials={initials}
            background={colors[index % colors.length]}
            textColor={textColor}
            onClick={onSelect ? () => onSelect(index) : undefined}
          />
        </span>
      ))}

      {hidden > 0 && (
        <span className={styles.seat} style={seat(shown.length)}>
          <Avatar
            {...shared}
            initials={`+${hidden}`}
            background={overflowBackground}
            textColor={overflowTextColor}
            onClick={onOverflowClick}
          />
        </span>
      )}
    </span>
  )
}
