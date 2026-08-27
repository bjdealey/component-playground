import type { CSSProperties } from 'react'
import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Avatar.module.css'

export type AvatarStatus = 'none' | 'online' | 'busy' | 'away' | 'offline'

export interface AvatarProps {
  initials?: string
  size?: number
  shape?: 'circle' | 'rounded' | 'square'
  status?: AvatarStatus
  statusPosition?: 'bottom-right' | 'top-right'
  statusSize?: number
  statusColor?: string
  background?: string
  textColor?: string
  fontWeight?: number
  borderWidth?: number
  borderColor?: string
  ringWidth?: number
  ringColor?: string
  /** Empty keeps the face's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /** Makes the whole surface a keyboard-operable click target. */
  onClick?: () => void
  onHoverChange?: (hovered: boolean) => void
}

const STATUS_COLORS: Record<Exclude<AvatarStatus, 'none'>, string> = {
  online: '#15803d',
  busy: '#dc2626',
  away: '#d97706',
  offline: '#9aa1ab',
}

const RADII: Record<NonNullable<AvatarProps['shape']>, (size: number) => number> = {
  circle: () => 999,
  rounded: (size) => Math.round(size * 0.25),
  square: () => 0,
}

export default function Avatar({
  initials = 'BD',
  size = 44,
  shape = 'circle',
  status = 'none',
  statusPosition = 'bottom-right',
  statusSize = 12,
  statusColor = '',
  background = '#4f46e5',
  textColor = '#ffffff',
  fontWeight = 600,
  borderWidth = 0,
  borderColor = '#ffffff',
  ringWidth = 0,
  ringColor = '#4f46e5',
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onClick,
  onHoverChange,
}: AvatarProps) {
  const radius = (RADII[shape] ?? RADII.circle)(size)

  const root: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    // An outer ring that doesn't affect layout, unlike a border.
    boxShadow: ringWidth > 0 ? `0 0 0 ${ringWidth}px ${ringColor}` : undefined,
    margin: ringWidth,
    // Set on the root because that's the element the hover state is read from;
    // custom properties inherit, so the face picks them up.
    ...hoverStyle('avatar', {
      background: hoverBackground,
      color: hoverTextColor,
      brightness: hoverBrightness,
    }),
  }

  const face: CSSProperties = {
    borderRadius: radius,
    // Routed through custom properties, not set directly: inline declarations
    // would outrank the :hover rule and kill the state.
    ['--avatar-background' as string]: background,
    ['--avatar-color' as string]: textColor,
    fontSize: Math.round(size * 0.4),
    fontWeight,
    borderWidth,
    borderColor,
  }

  const dot: CSSProperties = {
    width: statusSize,
    height: statusSize,
    backgroundColor:
      statusColor || (status !== 'none' ? STATUS_COLORS[status] : 'transparent'),
    // Inset the dot so it hugs a circular edge rather than floating off it.
    [statusPosition.startsWith('top') ? 'top' : 'bottom']:
      shape === 'circle' ? Math.round(size * 0.02) : -statusSize / 4,
    right: shape === 'circle' ? Math.round(size * 0.02) : -statusSize / 4,
  }

  return (
    <span
      className={styles.avatar}
      style={root}
      {...clickable(onClick)}
      {...hoverable(hovered, onHoverChange)}
    >
      <span className={styles.face} style={face}>
        {initials}
      </span>
      {status !== 'none' && (
        <span className={styles.status} style={dot} aria-label={status} />
      )}
    </span>
  )
}
