import type { CSSProperties, ReactNode } from 'react'
import styles from './Hero.module.css'

export interface HeroProps {
  eyebrow?: string
  headline?: string
  subhead?: string
  /** Primary call to action — compose a `<Button />` here. */
  primaryAction?: ReactNode
  /** Secondary call to action — compose a `<Button />` here. */
  secondaryAction?: ReactNode
  align?: 'left' | 'center'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  eyebrowSize?: number
  headlineSize?: number
  subheadSize?: number
  background?: string
  eyebrowColor?: string
  headlineColor?: string
  subheadColor?: string
}

export default function Hero({
  eyebrow = 'Preview deployments',
  headline = 'Every push gets a URL',
  subhead = 'Share a working build before it ships. No staging queue, no screenshots.',
  primaryAction,
  secondaryAction,
  align = 'center',
  width = 460,
  padding = 34,
  gap = 14,
  radius = 16,
  eyebrowSize = 11.5,
  headlineSize = 28,
  subheadSize = 14,
  background = '#fbfbfc',
  eyebrowColor = '#4f46e5',
  headlineColor = '#17191c',
  subheadColor = '#6b7280',
}: HeroProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    backgroundColor: background,
    alignItems: align === 'center' ? 'center' : 'flex-start',
    textAlign: align,
  }

  return (
    <section className={styles.hero} style={root}>
      {eyebrow && (
        <span className={styles.eyebrow} style={{ fontSize: eyebrowSize, color: eyebrowColor }}>
          {eyebrow}
        </span>
      )}
      {headline && (
        <h2 className={styles.headline} style={{ fontSize: headlineSize, color: headlineColor }}>
          {headline}
        </h2>
      )}
      {subhead && (
        <p className={styles.subhead} style={{ fontSize: subheadSize, color: subheadColor }}>
          {subhead}
        </p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className={styles.actions} style={{ gap: gap * 0.6, marginTop: gap * 0.3 }}>
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </section>
  )
}
