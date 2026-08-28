import type { CSSProperties, ReactNode } from 'react'
import styles from './CTASection.module.css'

export interface CTASectionProps {
  headline?: string
  subhead?: string
  /** Primary call to action — compose a `<Button />` here. */
  primaryAction?: ReactNode
  /** Secondary call to action — compose a `<Button />` here. */
  secondaryAction?: ReactNode
  /** `center` stacks it; `split` puts the copy left and the buttons right. */
  layout?: 'center' | 'split'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  headlineSize?: number
  subheadSize?: number
  background?: string
  headlineColor?: string
  subheadColor?: string
  borderColor?: string
}

export default function CTASection({
  headline = 'Ship your first preview today',
  subhead = 'Drop a folder in, get a shareable build. No config, no account, no waiting.',
  primaryAction,
  secondaryAction,
  layout = 'center',
  width = 640,
  padding = 32,
  gap = 16,
  radius = 18,
  borderWidth = 1,
  headlineSize = 24,
  subheadSize = 14.5,
  background = '#f6f6fb',
  headlineColor = '#17191c',
  subheadColor = '#6b7280',
  borderColor = '#e6e6f0',
}: CTASectionProps) {
  const split = layout === 'split'

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor,
    borderStyle: borderWidth > 0 ? 'solid' : undefined,
    backgroundColor: background,
  }

  const actions = (primaryAction || secondaryAction) && (
    <div className={styles.actions} style={{ gap: gap * 0.6 }}>
      {primaryAction}
      {secondaryAction}
    </div>
  )

  return (
    <section className={styles.cta} style={root} data-layout={layout}>
      <div className={styles.copy} style={{ gap: gap * 0.4 }}>
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
        {!split && actions}
      </div>
      {split && actions}
    </section>
  )
}
