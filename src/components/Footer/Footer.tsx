import Divider from '../Divider/Divider'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Footer.module.css'

export interface FooterProps {
  /** Columns separated by `;`, each `Heading|link,link,link`. */
  columns?: string
  brand?: string
  copyright?: string
  showDivider?: boolean
  radius?: number
  dividerThickness?: number
  headingWeight?: number
  width?: number
  padding?: number
  columnGap?: number
  rowGap?: number
  headingSize?: number
  linkSize?: number
  brandSize?: number
  background?: string
  headingColor?: string
  linkColor?: string
  brandColor?: string
  dividerColor?: string
  /** Empty keeps `linkColor`. */
  hoverTextColor?: string
  /** The underline is what marks a link as a link; off leaves colour to say it. */
  hoverUnderline?: boolean
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onHoverChange?: (hovered: boolean) => void
}

interface Column {
  heading: string
  links: string[]
}

export function parseColumns(columns: string): Column[] {
  return columns
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [heading = '', links = ''] = chunk.split('|')
      return {
        heading: heading.trim(),
        links: links.split(',').map((link) => link.trim()).filter((link) => link.length > 0),
      }
    })
}

export default function Footer({
  columns = 'Product|Previews,Deploys,Analytics;Developers|Docs,API,Changelog;Company|About,Careers,Contact',
  brand = '◆ Playground',
  copyright = '© 2026 Playground Ltd.',
  showDivider = true,
  radius = 0,
  dividerThickness = 1,
  headingWeight = 600,
  width = 520,
  padding = 24,
  columnGap = 40,
  rowGap = 8,
  headingSize = 11.5,
  linkSize = 13,
  brandSize = 13.5,
  background = 'transparent',
  headingColor = '#9aa1ab',
  linkColor = '#3f434a',
  brandColor = '#17191c',
  dividerColor = '#e3e6ea',
  hoverTextColor = '',
  hoverUnderline = true,
  hovered = false,
  onHoverChange,
}: FooterProps) {
  const groups = parseColumns(columns)

  return (
    <footer
      className={styles.footer}
      style={{
        width,
        padding,
        gap: padding * 0.75,
        backgroundColor: background,
        borderRadius: radius,
      }}
    >
      <div className={styles.columns} style={{ gap: columnGap }}>
        {groups.map((group, index) => (
          <div key={index} className={styles.column} style={{ gap: rowGap }}>
            {group.heading && (
              <span
                className={styles.heading}
                style={{
                  fontSize: headingSize,
                  fontWeight: headingWeight,
                  color: headingColor,
                }}
              >
                {group.heading}
              </span>
            )}
            {group.links.map((link, linkIndex) => (
              <span
                key={linkIndex}
                className={styles.link}
                style={{
                  fontSize: linkSize,
                  // Routed through a custom property, not set directly: an inline
                  // colour would outrank the :hover rule and kill the state.
                  ['--footer-link-color' as string]: linkColor,
                  // Not a colour, so it travels beside `hoverStyle` rather than
                  // through it.
                  ['--footer-link-hover-decoration' as string]: hoverUnderline
                    ? 'underline'
                    : 'none',
                  ...hoverStyle('footer-link', { color: hoverTextColor }),
                }}
                // Pinning every link would underline the whole footer, so the
                // first link of the first column stands in for the rest.
                {...hoverable(hovered && index === 0 && linkIndex === 0, onHoverChange)}
              >
                {link}
              </span>
            ))}
          </div>
        ))}
      </div>

      {showDivider && (
        <Divider
          color={dividerColor}
          thickness={dividerThickness}
          length={width - padding * 2}
        />
      )}

      <div className={styles.base} style={{ gap: rowGap }}>
        {brand && (
          <span className={styles.brand} style={{ fontSize: brandSize, color: brandColor }}>
            {brand}
          </span>
        )}
        {copyright && (
          <span style={{ fontSize: linkSize, color: headingColor }}>{copyright}</span>
        )}
      </div>
    </footer>
  )
}
