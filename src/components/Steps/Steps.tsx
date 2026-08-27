import type { CSSProperties } from 'react'
import IconBadge from '../IconBadge/IconBadge'
import styles from './Steps.module.css'

export interface StepsProps {
  /** Comma-separated labels — manifest props are primitives. */
  items?: string
  activeIndex?: number
  orientation?: 'horizontal' | 'vertical'
  markerSize?: number
  radius?: number
  borderWidth?: number
  labelWeight?: number
  connectorWidth?: number
  connectorLength?: number
  gap?: number
  labelSize?: number
  showLabels?: boolean
  completedGlyph?: string
  activeColor?: string
  completedColor?: string
  pendingColor?: string
  labelColor?: string
  markerTextColor?: string
  onSelect?: (index: number) => void
}

export default function Steps({
  items = 'Build, Test, Deploy',
  activeIndex = 1,
  orientation = 'horizontal',
  markerSize = 26,
  radius = 999,
  borderWidth = 2,
  labelWeight = 500,
  connectorWidth = 2,
  connectorLength = 40,
  gap = 8,
  labelSize = 12.5,
  showLabels = true,
  completedGlyph = '✓',
  activeColor = '#4f46e5',
  completedColor = '#15803d',
  pendingColor = '#cbd2da',
  labelColor = '#6b7280',
  markerTextColor = '#ffffff',
  onSelect,
}: StepsProps) {
  const labels = items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  const vertical = orientation === 'vertical'

  return (
    <div className={`${styles.steps} ${vertical ? styles.vertical : ''}`} style={{ gap }}>
      {labels.map((label, index) => {
        const done = index < activeIndex
        const active = index === activeIndex
        const color = done ? completedColor : active ? activeColor : pendingColor


        const connector: CSSProperties = {
          backgroundColor: done ? completedColor : pendingColor,
          ...(vertical
            ? { width: connectorWidth, height: connectorLength, marginLeft: markerSize / 2 - connectorWidth / 2 }
            : { height: connectorWidth, width: connectorLength }),
        }

        return (
          <div
            key={`${label}-${index}`}
            className={`${styles.group} ${vertical ? styles.vertical : ''}`}
            style={{ gap }}
          >
            <button
              type="button"
              className={`${styles.step} ${vertical ? styles.stepVertical : ''}`}
              style={{ gap, cursor: onSelect ? 'pointer' : 'default' }}
              aria-current={active ? 'step' : undefined}
              onClick={() => onSelect?.(index)}
            >
              {/* A real IconBadge — the same mark Alert and Toast use. */}
              <IconBadge
                glyph={done ? completedGlyph : String(index + 1)}
                size={markerSize}
                background={done || active ? color : 'transparent'}
                color={done || active ? markerTextColor : pendingColor}
                radius={radius}
                shape={radius >= 999 ? 'circle' : 'rounded'}
                borderWidth={borderWidth}
                borderColor={color}
                fontScale={0.45}
              />
              {showLabels && label && (
                <span
                  className={styles.label}
                  style={{
                    fontSize: labelSize,
                    color: active ? activeColor : labelColor,
                    // Stepped from the label weight rather than pinned, so
                    // the theme's weight offset still reaches the active one.
                    fontWeight: active ? labelWeight + 100 : labelWeight,
                  }}
                >
                  {label}
                </span>
              )}
            </button>

            {index < labels.length - 1 && (
              <span className={styles.connector} style={connector} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}
