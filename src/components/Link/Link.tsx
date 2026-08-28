import type { CSSProperties, ReactNode } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Link.module.css'

export interface LinkProps {
  children?: ReactNode
  href?: string
  /** Opens in a new tab, adds `rel`, and shows a trailing arrow. */
  external?: boolean
  underline?: 'hover' | 'always' | 'none'
  fontSize?: number
  fontWeight?: number
  color?: string
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  hoverBrightness?: number
  onClick?: () => void
  onHoverChange?: (hovered: boolean) => void
}

export default function Link({
  children = 'Read the documentation',
  href = '#',
  external = false,
  underline = 'hover',
  fontSize = 14,
  fontWeight = 500,
  color = '#4f46e5',
  hovered = false,
  hoverBrightness = 0.85,
  onClick,
  onHoverChange,
}: LinkProps) {
  const style: CSSProperties = {
    fontSize,
    fontWeight,
    ['--link-color' as string]: color,
    ...hoverStyle('link', { brightness: hoverBrightness }),
  }

  return (
    <a
      className={styles.link}
      style={style}
      href={href || undefined}
      data-underline={underline}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick ? () => onClick() : undefined}
      {...hoverable(hovered, onHoverChange)}
    >
      {children}
      {external && (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      )}
    </a>
  )
}
