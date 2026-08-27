import type { CSSProperties } from 'react'
import { hoverStyle, hoverable } from '../../lib/hover'
import styles from './Accordion.module.css'

export interface AccordionProps {
  /**
   * Sections separated by `;`, title and body separated by `|`.
   * e.g. `Build|Compiles your app;Deploy|Ships it to production`
   */
  items?: string
  /** Index of the open section; `-1` closes them all. */
  openIndex?: number
  width?: number
  padding?: number
  radius?: number
  borderWidth?: number
  gap?: number
  chevron?: boolean
  titleSize?: number
  bodySize?: number
  titleWeight?: number
  background?: string
  borderColor?: string
  titleColor?: string
  bodyColor?: string
  activeColor?: string
  /** Empty keeps the header's own background; `hoverBrightness` still applies. */
  hoverBackground?: string
  hoverBrightness?: number
  /** Pins the hover state so you can inspect and restyle it. */
  hovered?: boolean
  onToggle?: (index: number) => void
  onHoverChange?: (hovered: boolean) => void
}

interface Section {
  title: string
  body: string
}

export function parseSections(items: string): Section[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [title, ...rest] = chunk.split('|')
      return { title: title.trim(), body: rest.join('|').trim() }
    })
}

export default function Accordion({
  items = 'Build|Compiles your app and caches dependencies.;Test|Runs the suite against the preview build.;Deploy|Ships it to production behind a flag.',
  openIndex = 0,
  width = 340,
  padding = 14,
  radius = 8,
  borderWidth = 1,
  gap = 0,
  chevron = true,
  titleSize = 14,
  bodySize = 13,
  titleWeight = 600,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  bodyColor = '#6b7280',
  activeColor = '#4f46e5',
  hoverBackground = '',
  hoverBrightness = 0.97,
  hovered = false,
  onToggle,
  onHoverChange,
}: AccordionProps) {
  const sections = parseSections(items)

  const root: CSSProperties = {
    width,
    gap,
    borderRadius: radius,
    borderWidth: gap > 0 ? 0 : borderWidth,
    borderColor,
    backgroundColor: gap > 0 ? 'transparent' : background,
  }

  return (
    <div className={styles.accordion} style={root}>
      {sections.map((section, index) => {
        const open = index === openIndex

        return (
          <div
            key={`${section.title}-${index}`}
            className={styles.section}
            style={{
              // With a gap each section becomes its own bordered card.
              borderWidth: gap > 0 ? borderWidth : 0,
              borderBottomWidth: gap > 0 ? borderWidth : index < sections.length - 1 ? borderWidth : 0,
              borderColor,
              borderRadius: gap > 0 ? radius : 0,
              backgroundColor: background,
            }}
          >
            <button
              type="button"
              className={styles.header}
              style={{
                padding,
                gap: 10,
                // The header paints nothing of its own — the section behind it
                // supplies the colour — but the base still has to travel as a
                // custom property for the :hover rule's fallback to land on.
                ['--accordion-background' as string]: 'transparent',
                ...hoverStyle('accordion', {
                  background: hoverBackground,
                  brightness: hoverBrightness,
                }),
              }}
              aria-expanded={open}
              // Clicking the open section closes it.
              onClick={() => onToggle?.(open ? -1 : index)}
              // Pinning every header at once reads as a bug; the first one shows
              // the state just as well.
              {...hoverable(hovered && index === 0, onHoverChange)}
            >
              <span
                className={styles.title}
                style={{
                  fontSize: titleSize,
                  fontWeight: titleWeight,
                  color: open ? activeColor : titleColor,
                }}
              >
                {section.title}
              </span>

              {chevron && (
                <span
                  className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                  style={{ borderTopColor: open ? activeColor : bodyColor }}
                  aria-hidden="true"
                />
              )}
            </button>

            {open && section.body && (
              <div
                className={styles.body}
                style={{
                  padding: `0 ${padding}px ${padding}px`,
                  fontSize: bodySize,
                  color: bodyColor,
                }}
              >
                {section.body}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
