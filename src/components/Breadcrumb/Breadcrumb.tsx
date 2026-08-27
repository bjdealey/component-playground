import { clickable } from '../../lib/clickable'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Breadcrumb.module.css'

export interface BreadcrumbProps {
  /** Comma-separated crumbs — the last one is the current page. */
  items?: string
  separator?: string
  /** Collapse the middle into "…" once there are more crumbs than this. */
  maxItems?: number
  gap?: number
  fontSize?: number
  linkColor?: string
  currentColor?: string
  separatorColor?: string
  currentWeight?: number
  uppercase?: boolean
  /** A crumb paints no background of its own, so this is the whole of the tint. */
  hoverBackground?: string
  /** Empty keeps `linkColor`. */
  hoverTextColor?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  /**
   * Receives the crumb's index in `items` — not its position on screen, which
   * shifts once the middle collapses. The current page and the ellipsis don't
   * fire.
   */
  onSelect?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

export default function Breadcrumb({
  items = 'Home, Projects, component-playground, Settings',
  separator = '/',
  maxItems = 0,
  gap = 8,
  fontSize = 13,
  linkColor = '#6b7280',
  currentColor = '#17191c',
  separatorColor = '#cbd2da',
  currentWeight = 600,
  uppercase = false,
  hoverBackground = '',
  hoverTextColor = '',
  hoverBrightness = 0.97,
  hovered = false,
  onSelect,
  onHoverChange,
}: BreadcrumbProps) {
  const all = items
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

  // Each crumb carries where it came from, so a handler reports the index the
  // caller passed in even when the middle is collapsed away.
  const full = all.map((label, index) => ({ label, index }))

  // Keep the first and last two crumbs, replacing the middle with an ellipsis.
  const crumbs =
    maxItems > 0 && all.length > maxItems
      ? [full[0], { label: '…', index: -1 }, ...full.slice(-2)]
      : full

  // Pinning every crumb at once reads as a bug, and the one that is pinned has
  // to be one the pointer could really highlight — so it's the first navigable
  // crumb, not simply the first. -1 when none is, which no position matches.
  const firstLink = onSelect
    ? crumbs.findIndex(
        (crumb, position) => crumb.index !== -1 && position !== crumbs.length - 1,
      )
    : -1

  return (
    <nav className={styles.breadcrumb} style={{ gap }} aria-label="Breadcrumb">
      {crumbs.map((crumb, position) => {
        const last = position === crumbs.length - 1
        const ellipsis = crumb.index === -1
        // The current page and the ellipsis stand for nothing to navigate to, so
        // they stay inert — including the cursor, which previously promised a
        // click on every crumb whether or not one was wired up.
        const activate =
          onSelect && !last && !ellipsis ? () => onSelect(crumb.index) : undefined

        return (
          <span
            key={`${crumb.label}-${position}`}
            className={styles.item}
            style={{ gap }}
          >
            <span
              className={styles.crumb}
              style={{
                fontSize,
                fontWeight: last ? currentWeight : 400,
                textTransform: uppercase ? 'uppercase' : 'none',
                letterSpacing: uppercase ? '0.05em' : 0,
                cursor: activate ? 'pointer' : 'default',
                // Routed through custom properties, not set directly: inline
                // declarations would outrank the :hover rule and kill the state.
                ['--breadcrumb-color' as string]: last ? currentColor : linkColor,
                ['--breadcrumb-background' as string]: 'transparent',
                ...hoverStyle('breadcrumb', {
                  background: hoverBackground,
                  color: hoverTextColor,
                  brightness: hoverBrightness,
                }),
              }}
              aria-current={last ? 'page' : undefined}
              {...clickable(activate)}
              {...hoverable(hovered && position === firstLink, onHoverChange)}
            >
              {crumb.label}
            </span>

            {!last && (
              <span
                className={styles.separator}
                style={{ fontSize, color: separatorColor }}
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
