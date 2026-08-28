import type { CSSProperties } from 'react'
import styles from './TeamGrid.module.css'

export interface TeamGridProps {
  /** One member per line: `Name | Role | Initials`. Initials are derived if omitted. */
  members?: string
  columns?: number
  align?: 'left' | 'center'
  bordered?: boolean
  width?: number
  gap?: number
  padding?: number
  radius?: number
  borderWidth?: number
  avatarSize?: number
  nameSize?: number
  roleSize?: number
  background?: string
  nameColor?: string
  roleColor?: string
  accentColor?: string
  borderColor?: string
  onSelect?: (index: number) => void
}

interface Member {
  name: string
  role: string
  initials: string
}

function initialsOf(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function parseMembers(members: string): Member[] {
  return members
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [name = '', role = '', initials = ''] = line.split('|').map((part) => part.trim())
      return { name, role, initials: initials || initialsOf(name) }
    })
}

const DEFAULT_MEMBERS = [
  'Ada Okafor | Founder & CEO',
  'Ravi Menon | Head of Design',
  'Mia Sørensen | Staff Engineer',
  'Leo Alvarez | Product Lead',
].join('\n')

export default function TeamGrid({
  members = DEFAULT_MEMBERS,
  columns = 4,
  align = 'center',
  bordered = true,
  width = 720,
  gap = 16,
  padding = 20,
  radius = 14,
  borderWidth = 1,
  avatarSize = 56,
  nameSize = 14,
  roleSize = 12.5,
  background = '#ffffff',
  nameColor = '#17191c',
  roleColor = '#6b7280',
  accentColor = '#4f46e5',
  borderColor = '#e3e6ea',
  onSelect,
}: TeamGridProps) {
  const people = parseMembers(members)

  const grid: CSSProperties = {
    width,
    gap,
    gridTemplateColumns: `repeat(${Math.max(1, Math.round(columns))}, minmax(0, 1fr))`,
  }

  const tileBase: CSSProperties = {
    padding,
    borderRadius: radius,
    borderColor,
    borderWidth: bordered ? borderWidth : 0,
    borderStyle: bordered ? 'solid' : undefined,
    background: bordered ? background : 'transparent',
  }

  return (
    <div className={styles.grid} style={grid}>
      {people.map((person, index) => {
        const content = (
          <>
            <span
              className={styles.avatar}
              style={{
                width: avatarSize,
                height: avatarSize,
                fontSize: Math.round(avatarSize * 0.36),
                color: accentColor,
                background: `color-mix(in srgb, ${accentColor} 14%, ${background})`,
              }}
              aria-hidden="true"
            >
              {person.initials}
            </span>
            <span className={styles.name} style={{ fontSize: nameSize, color: nameColor }}>
              {person.name}
            </span>
            {person.role && (
              <span className={styles.role} style={{ fontSize: roleSize, color: roleColor }}>
                {person.role}
              </span>
            )}
          </>
        )

        return onSelect ? (
          <button
            key={index}
            type="button"
            className={styles.tile}
            style={tileBase}
            data-bordered={bordered || undefined}
            data-align={align}
            onClick={() => onSelect(index)}
          >
            {content}
          </button>
        ) : (
          <div
            key={index}
            className={styles.tile}
            style={tileBase}
            data-bordered={bordered || undefined}
            data-align={align}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
