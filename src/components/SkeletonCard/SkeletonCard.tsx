import Skeleton from '../Skeleton/Skeleton'
import styles from './SkeletonCard.module.css'

export interface SkeletonCardProps {
  showAvatar?: boolean
  showMedia?: boolean
  lines?: number
  mediaHeight?: number
  avatarSize?: number
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  shimmer?: boolean
  speed?: number
  background?: string
  borderColor?: string
  baseColor?: string
  highlightColor?: string
}

/** A loading placeholder assembled from real `Skeleton`s. */
export default function SkeletonCard({
  showAvatar = true,
  showMedia = false,
  lines = 3,
  mediaHeight = 110,
  avatarSize = 36,
  width = 300,
  padding = 16,
  gap = 12,
  radius = 12,
  borderWidth = 1,
  bordered = true,
  shimmer = true,
  speed = 1.4,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  baseColor = '#e6e8ec',
  highlightColor = '#f4f5f7',
}: SkeletonCardProps) {
  const shared = { shimmer, speed, baseColor, highlightColor } as const

  return (
    <div
      className={styles.card}
      style={{
        width,
        padding,
        gap,
        borderRadius: radius,
        borderWidth: bordered ? borderWidth : 0,
        borderColor,
        backgroundColor: background,
      }}
      aria-busy="true"
    >
      {showMedia && (
        <Skeleton {...shared} variant="rect" width={width - padding * 2} height={mediaHeight} radius={8} />
      )}

      {showAvatar && (
        <span className={styles.head} style={{ gap: gap * 0.8 }}>
          <Skeleton {...shared} variant="circle" height={avatarSize} />
          <span className={styles.headLines} style={{ gap: gap * 0.5 }}>
            <Skeleton {...shared} variant="rect" width={120} height={10} radius={4} />
            <Skeleton {...shared} variant="rect" width={80} height={9} radius={4} />
          </span>
        </span>
      )}

      <Skeleton {...shared} variant="text" lines={lines} width={width - padding * 2} height={10} gap={gap * 0.6} />
    </div>
  )
}
