import type { CSSProperties, ReactNode } from 'react'
import styles from './PricingCard.module.css'

export interface PricingCardProps {
  plan?: string
  price?: string
  period?: string
  description?: string
  /** Comma-separated feature lines. */
  features?: string
  featureGlyph?: string
  /** Ribbon on the top edge — compose a `<Badge />` here. */
  badge?: ReactNode
  /** The call to action — compose a `<Button />` here. */
  cta?: ReactNode
  featured?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  planSize?: number
  priceSize?: number
  bodySize?: number
  background?: string
  borderColor?: string
  planColor?: string
  priceColor?: string
  bodyColor?: string
  accentColor?: string
  checkColor?: string
}

export default function PricingCard({
  plan = 'Pro',
  price = '$24',
  period = '/month',
  description = 'For teams shipping previews on every push.',
  features = 'Unlimited previews, 100 GB bandwidth, Custom domains, Priority builds',
  featureGlyph = '✓',
  badge,
  cta,
  featured = true,
  width = 280,
  padding = 24,
  gap = 14,
  radius = 14,
  borderWidth = 1,
  planSize = 13,
  priceSize = 34,
  bodySize = 13,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  planColor = '#6b7280',
  priceColor = '#17191c',
  bodyColor = '#6b7280',
  accentColor = '#4f46e5',
  checkColor = '#15803d',
}: PricingCardProps) {
  const lines = features
    .split(',')
    .map((feature) => feature.trim())
    .filter((feature) => feature.length > 0)

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: featured ? Math.max(borderWidth, 2) : borderWidth,
    borderColor: featured ? accentColor : borderColor,
    backgroundColor: background,
    boxShadow: featured ? '0 10px 30px rgba(15, 23, 42, 0.10)' : undefined,
  }

  return (
    <div className={styles.card} style={root}>
      {badge && featured && <span className={styles.badge}>{badge}</span>}

      <span
        className={styles.plan}
        style={{ fontSize: planSize, color: featured ? accentColor : planColor }}
      >
        {plan}
      </span>

      <span className={styles.priceRow}>
        <span className={styles.price} style={{ fontSize: priceSize, color: priceColor }}>
          {price}
        </span>
        {period && (
          <span style={{ fontSize: bodySize, color: bodyColor }}>{period}</span>
        )}
      </span>

      {description && (
        <span style={{ fontSize: bodySize, color: bodyColor, lineHeight: 1.5 }}>
          {description}
        </span>
      )}

      {cta && <div className={styles.cta}>{cta}</div>}

      {lines.length > 0 && (
        <div className={styles.features} style={{ gap: gap * 0.55 }}>
          {lines.map((feature, index) => (
            <span key={index} className={styles.feature} style={{ fontSize: bodySize }}>
              <span className={styles.check} style={{ color: checkColor }}>
                {featureGlyph}
              </span>
              <span style={{ color: bodyColor }}>{feature}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
