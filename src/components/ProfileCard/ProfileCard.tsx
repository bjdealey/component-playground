import type { CSSProperties, ReactNode } from 'react'
import styles from './ProfileCard.module.css'

export interface ProfileCardProps {
  /** Portrait — compose an `<Avatar />` here. */
  avatar?: ReactNode
  /** Status label — compose a `<Badge />` here. */
  badge?: ReactNode
  /** Primary action — compose a `<Button />` here. */
  action?: ReactNode
  name?: string
  role?: string
  bio?: string
  /** Stats separated by `;`, each `value|label`. */
  stats?: string
  align?: 'left' | 'center'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  shadow?: boolean
  nameSize?: number
  roleSize?: number
  bioSize?: number
  background?: string
  borderColor?: string
  nameColor?: string
  roleColor?: string
  bioColor?: string
  statValueColor?: string
  statLabelColor?: string
}

export default function ProfileCard({
  avatar,
  badge,
  action,
  name = 'Ana Kowalski',
  role = 'Staff Engineer',
  bio = 'Works on the build pipeline and preview infrastructure.',
  stats = '128|Deploys;42|Reviews;7|Projects',
  align = 'center',
  width = 300,
  padding = 22,
  gap = 12,
  radius = 14,
  borderWidth = 1,
  bordered = true,
  shadow = false,
  nameSize = 15.5,
  roleSize = 12.5,
  bioSize = 13,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  nameColor = '#17191c',
  roleColor = '#9aa1ab',
  bioColor = '#6b7280',
  statValueColor = '#17191c',
  statLabelColor = '#9aa1ab',
}: ProfileCardProps) {
  const rows = stats
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [value = '', label = ''] = chunk.split('|')
      return { value: value.trim(), label: label.trim() }
    })

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
    boxShadow: shadow ? '0 6px 20px rgba(15, 23, 42, 0.10)' : undefined,
    alignItems: align === 'center' ? 'center' : 'flex-start',
    textAlign: align,
  }

  return (
    <div className={styles.card} style={root}>
      {avatar && <span className={styles.avatar}>{avatar}</span>}

      <div className={styles.identity} style={{ alignItems: align === 'center' ? 'center' : 'flex-start' }}>
        <span className={styles.nameRow} style={{ gap: gap / 2 }}>
          {name && (
            <span className={styles.name} style={{ fontSize: nameSize, color: nameColor }}>
              {name}
            </span>
          )}
          {badge && <span className={styles.badge}>{badge}</span>}
        </span>
        {role && <span style={{ fontSize: roleSize, color: roleColor }}>{role}</span>}
      </div>

      {bio && (
        <span style={{ fontSize: bioSize, color: bioColor, lineHeight: 1.5 }}>{bio}</span>
      )}

      {rows.length > 0 && (
        <div className={styles.stats} style={{ gap }}>
          {rows.map((row, index) => (
            <span key={index} className={styles.stat}>
              <span className={styles.statValue} style={{ color: statValueColor, fontSize: nameSize }}>
                {row.value}
              </span>
              <span style={{ color: statLabelColor, fontSize: roleSize }}>{row.label}</span>
            </span>
          ))}
        </div>
      )}

      {action && <span className={styles.action}>{action}</span>}
    </div>
  )
}
