import type { CSSProperties, ReactNode } from 'react'
import styles from './Navbar.module.css'

export interface NavbarProps {
  brand?: string
  brandGlyph?: string
  /** Comma-separated nav links. */
  links?: string
  activeIndex?: number
  /** Trailing call to action — compose a `<Button />` here. */
  action?: ReactNode
  /** Account chip — compose an `<Avatar />` here. */
  avatar?: ReactNode
  showAction?: boolean
  showAvatar?: boolean
  width?: number
  height?: number
  paddingX?: number
  gap?: number
  linkGap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  brandSize?: number
  linkSize?: number
  background?: string
  borderColor?: string
  brandColor?: string
  linkColor?: string
  activeColor?: string
  accentColor?: string
  onSelect?: (index: number) => void
}

export default function Navbar({
  brand = 'Playground',
  brandGlyph = '◆',
  links = 'Overview, Deploys, Analytics, Settings',
  activeIndex = 0,
  action,
  avatar,
  showAction = true,
  showAvatar = true,
  width = 520,
  height = 52,
  paddingX = 16,
  gap = 16,
  linkGap = 18,
  radius = 10,
  borderWidth = 1,
  bordered = true,
  brandSize = 14,
  linkSize = 13,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  brandColor = '#17191c',
  linkColor = '#6b7280',
  activeColor = '#17191c',
  accentColor = '#4f46e5',
  onSelect,
}: NavbarProps) {
  const items = links
    .split(',')
    .map((link) => link.trim())
    .filter((link) => link.length > 0)

  const root: CSSProperties = {
    width,
    height,
    padding: `0 ${paddingX}px`,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
  }

  return (
    <header className={styles.navbar} style={root}>
      <span className={styles.brand} style={{ fontSize: brandSize, color: brandColor, gap: gap / 2 }}>
        {brandGlyph && <span style={{ color: accentColor }}>{brandGlyph}</span>}
        {brand}
      </span>

      <nav className={styles.links} style={{ gap: linkGap }}>
        {items.map((link, index) => {
          const active = index === activeIndex
          return (
            <button
              key={`${link}-${index}`}
              type="button"
              className={styles.link}
              style={{
                fontSize: linkSize,
                color: active ? activeColor : linkColor,
                fontWeight: active ? 600 : 500,
              }}
              aria-current={active ? 'page' : undefined}
              onClick={() => onSelect?.(index)}
            >
              {link}
              {active && (
                <span className={styles.underline} style={{ backgroundColor: accentColor }} />
              )}
            </button>
          )
        })}
      </nav>

      <div className={styles.actions} style={{ gap: gap / 1.6 }}>
        {showAction && action}
        {showAvatar && avatar}
      </div>
    </header>
  )
}
