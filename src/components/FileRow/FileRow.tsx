import type { CSSProperties, ReactNode } from 'react'
import IconButton from '../IconButton/IconButton'
import Progress from '../Progress/Progress'
import styles from './FileRow.module.css'

export interface FileRowProps {
  /** File-type mark — compose an `<IconBadge />` here. */
  icon?: ReactNode
  name?: string
  meta?: string
  progress?: number
  status?: 'uploading' | 'done' | 'failed'
  showProgress?: boolean
  showRemove?: boolean
  removed?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  nameSize?: number
  metaSize?: number
  background?: string
  borderColor?: string
  nameColor?: string
  metaColor?: string
  barColor?: string
  doneColor?: string
  failedColor?: string
  onRemove?: (removed: boolean) => void
}

export default function FileRow({
  icon,
  name = 'quarterly-report.pdf',
  meta = '2.4 MB',
  progress = 64,
  status = 'uploading',
  showProgress = true,
  showRemove = true,
  removed = false,
  width = 360,
  padding = 12,
  gap = 12,
  radius = 10,
  borderWidth = 1,
  nameSize = 13.5,
  metaSize = 12,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  nameColor = '#17191c',
  metaColor = '#9aa1ab',
  barColor = '#4f46e5',
  doneColor = '#15803d',
  failedColor = '#dc2626',
  onRemove,
}: FileRowProps) {
  if (removed) return null

  const trailing =
    status === 'done' ? { glyph: '✓', color: doneColor } : status === 'failed' ? { glyph: '!', color: failedColor } : null

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.row} style={root}>
      {icon && <span className={styles.icon}>{icon}</span>}

      <div className={styles.body} style={{ gap: gap / 2 }}>
        <span className={styles.header}>
          <span className={styles.name} style={{ fontSize: nameSize, color: nameColor }}>
            {name}
          </span>
          <span className={styles.meta} style={{ fontSize: metaSize, color: trailing ? trailing.color : metaColor }}>
            {trailing ? `${trailing.glyph} ${meta}` : meta}
          </span>
        </span>

        {/* Derived from `progress`, so a real Progress by import rather than a slot. */}
        {showProgress && status === 'uploading' && (
          <Progress
            value={progress}
            height={5}
            width={9999}
            fillColor={barColor}
          />
        )}
      </div>

      {showRemove && (
        <IconButton
          glyph="×"
          label={`Remove ${name}`}
          size={22}
          onClick={() => onRemove?.(true)}
        />
      )}
    </div>
  )
}
