import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import PricingCard from '../PricingCard/PricingCard'
import { readableOn } from '../../lib/color'
import styles from './PricingTable.module.css'

export interface PricingTableProps {
  /**
   * Plans separated by `;`, each `plan|price|description|feature,feature,…`.
   */
  plans?: string
  featuredIndex?: number
  period?: string
  ctaLabel?: string
  badgeLabel?: string
  cardWidth?: number
  gap?: number
  padding?: number
  cardGap?: number
  radius?: number
  borderWidth?: number
  accentColor?: string
  background?: string
  borderColor?: string
  planColor?: string
  priceColor?: string
  bodyColor?: string
  planSize?: number
  priceSize?: number
  bodySize?: number
  badgeSize?: number
  onSelect?: (index: number) => void
}

interface Plan {
  plan: string
  price: string
  description: string
  features: string
}

export function parsePlans(plans: string): Plan[] {
  return plans
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [plan = '', price = '', description = '', features = ''] = chunk.split('|')
      return {
        plan: plan.trim(),
        price: price.trim(),
        description: description.trim(),
        features: features.trim(),
      }
    })
}

/** Real `PricingCard`s — a composite composing a composite. */
export default function PricingTable({
  plans = 'Hobby|$0|For side projects.|1 preview,5 GB bandwidth,Community support;Pro|$24|For teams shipping daily.|Unlimited previews,100 GB bandwidth,Priority builds;Scale|$96|For larger orgs.|Everything in Pro,SAML SSO,Dedicated support',
  featuredIndex = 1,
  period = '/month',
  ctaLabel = 'Choose plan',
  badgeLabel = 'Most popular',
  cardWidth = 220,
  gap = 16,
  padding = 24,
  cardGap = 14,
  radius = 14,
  borderWidth = 1,
  accentColor = '#4f46e5',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  planColor = '#17191c',
  priceColor = '#17191c',
  bodyColor = '#6b7280',
  planSize = 13,
  priceSize = 30,
  bodySize = 12.5,
  badgeSize = 11,
  onSelect,
}: PricingTableProps) {
  const entries = parsePlans(plans)

  return (
    <div className={styles.table} style={{ gap }}>
      {entries.map((entry, index) => {
        const featured = index === featuredIndex
        return (
          <PricingCard
            key={`${entry.plan}-${index}`}
            plan={entry.plan}
            price={entry.price}
            period={period}
            description={entry.description}
            features={entry.features}
            featured={featured}
            width={cardWidth}
            padding={padding}
            gap={cardGap}
            radius={radius}
            borderWidth={borderWidth}
            accentColor={accentColor}
            background={background}
            borderColor={borderColor}
            planColor={planColor}
            priceColor={priceColor}
            bodyColor={bodyColor}
            planSize={planSize}
            priceSize={priceSize}
            bodySize={bodySize}
            badge={
              featured ? (
                <Badge
                  background={accentColor}
                  // Was a hard-coded white, which vanished the moment the accent
                  // went pale — the badge is the one thing on the featured card
                  // that has to stay readable.
                  textColor={readableOn(accentColor)}
                  fontSize={badgeSize}
                  radius={radius}
                  paddingX={8}
                  paddingY={4}
                >
                  {badgeLabel}
                </Badge>
              ) : undefined
            }
            cta={
              <Button
                variant={featured ? 'primary' : 'secondary'}
                fullWidth
                radius={radius}
                fontSize={bodySize}
                background={featured ? accentColor : ''}
                borderColor={featured ? accentColor : borderColor}
                textColor={featured ? readableOn(accentColor) : planColor}
                onClick={() => onSelect?.(index)}
              >
                {ctaLabel}
              </Button>
            }
          />
        )
      })}
    </div>
  )
}
