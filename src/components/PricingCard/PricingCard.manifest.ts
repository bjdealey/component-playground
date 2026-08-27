import type { ComponentManifest } from '../../lib/types'
import PricingCard from './PricingCard'

const manifest: ComponentManifest = {
  name: 'PricingCard',
  component: PricingCard,
  category: 'Content',
  // Two slots, so each arrives through its own named prop rather than children.
  slots: [
    {
      name: 'badge',
      component: 'Badge',
      defaults: { tone: 'neutral', background: '#4f46e5', uppercase: false },
      childrenDefault: 'Most popular',
    },
    {
      name: 'cta',
      component: 'Button',
      defaults: { variant: 'primary', fullWidth: true },
      childrenDefault: 'Start free trial',
    },
  ],
  props: [
    { name: 'plan', kind: 'text', default: 'Pro', group: 'Content' },
    { name: 'price', kind: 'text', default: '$24', group: 'Content' },
    { name: 'period', kind: 'text', default: '/month', group: 'Content' },
    {
      name: 'description',
      kind: 'text',
      default: 'For teams shipping previews on every push.',
      group: 'Content',
    },
    {
      name: 'features',
      kind: 'text',
      default: 'Unlimited previews, 100 GB bandwidth, Custom domains, Priority builds',
      group: 'Content',
    },
    { name: 'featureGlyph', kind: 'text', default: '✓', group: 'Content' },

    // Featured cards get the accent border, filled CTA, badge and a shadow.
    { name: 'featured', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 14, min: 0, max: 36, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 5, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'planColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'priceColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'checkColor', kind: 'color', default: '#15803d', group: 'Colors' },

    { name: 'planSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'priceSize', kind: 'number', default: 34, min: 18, max: 72, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 200, max: 460, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 24, min: 8, max: 48, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 2, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
