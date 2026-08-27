import type { CSSProperties, ReactNode } from 'react'
import styles from './Testimonial.module.css'

export interface TestimonialProps {
  quote?: string
  name?: string
  role?: string
  /** The avatar to show beside the attribution — compose an `<Avatar />` here. */
  children?: ReactNode
  showAvatar?: boolean
  showMark?: boolean
  mark?: string
  /** Star rating — compose a `<Rating />` here. */
  rating?: ReactNode
  showRating?: boolean
  bordered?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  quoteSize?: number
  nameSize?: number
  markSize?: number
  background?: string
  borderColor?: string
  quoteColor?: string
  nameColor?: string
  roleColor?: string
  accentColor?: string
}

export default function Testimonial({
  quote = 'We replaced a week of design QA with a link. Everyone reviews the same build now.',
  name = 'Ana Kowalski',
  role = 'Staff Engineer, Northwind',
  children,
  showAvatar = true,
  showMark = true,
  mark = '“',
  rating,
  showRating = false,
  bordered = true,
  width = 340,
  padding = 22,
  gap = 14,
  radius = 12,
  borderWidth = 1,
  quoteSize = 14.5,
  nameSize = 13,
  markSize = 40,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  quoteColor = '#17191c',
  nameColor = '#17191c',
  roleColor = '#9aa1ab',
  accentColor = '#4f46e5',
}: TestimonialProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
  }

  return (
    <figure className={styles.testimonial} style={root}>
      {showMark && mark && (
        <span className={styles.mark} style={{ fontSize: markSize, color: accentColor }}>
          {mark}
        </span>
      )}

      {showRating && rating && <span className={styles.rating}>{rating}</span>}

      {quote && (
        <blockquote
          className={styles.quote}
          style={{ fontSize: quoteSize, color: quoteColor }}
        >
          {quote}
        </blockquote>
      )}

      <figcaption className={styles.caption} style={{ gap: gap * 0.7 }}>
        {showAvatar && children}
        <span className={styles.person}>
          {name && (
            <span style={{ fontSize: nameSize, color: nameColor, fontWeight: 600 }}>{name}</span>
          )}
          {role && (
            <span style={{ fontSize: nameSize * 0.92, color: roleColor }}>{role}</span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
