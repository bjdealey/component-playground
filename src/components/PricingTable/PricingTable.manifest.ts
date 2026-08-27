import type { ComponentManifest } from '../../lib/types'
import PricingTable from './PricingTable'

const manifest: ComponentManifest = {
  name: 'PricingTable',
  component: PricingTable,
  category: 'Content',
  bindings: { onSelect: 'featuredIndex' },
  props: [
    // Plans split on ";", fields on "|": plan|price|description|features.
    {
      name: 'plans',
      kind: 'textarea',
      rows: 6,
      default:
        'Hobby|$0|For side projects.|1 preview,5 GB bandwidth,Community support;Pro|$24|For teams shipping daily.|Unlimited previews,100 GB bandwidth,Priority builds;Scale|$96|For larger orgs.|Everything in Pro,SAML SSO,Dedicated support',
      group: 'Content',
    },
    { name: 'featuredIndex', kind: 'number', default: 1, min: -1, max: 5, step: 1, group: 'Content' },
    { name: 'period', kind: 'text', default: '/month', group: 'Content' },
    { name: 'ctaLabel', kind: 'text', default: 'Choose plan', group: 'Content' },
    { name: 'badgeLabel', kind: 'text', default: 'Most popular', group: 'Content' },

    // Forwarded to every card it builds. Without these the table declared no
    // radius, no padding and no surface of its own, so the shared theme had
    // nothing to drive and three cards sat at their own defaults inside a
    // themed page.
    { name: 'radius', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'planColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'priceColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'planSize', kind: 'number', default: 13, min: 9, max: 22, step: 0.5, group: 'Typography' },
    { name: 'priceSize', kind: 'number', default: 30, min: 18, max: 56, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'badgeSize', kind: 'number', default: 11, min: 8, max: 16, step: 0.5, group: 'Typography' },

    { name: 'cardWidth', kind: 'number', default: 220, min: 160, max: 340, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 0, max: 40, step: 2, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 24, min: 0, max: 48, step: 1, group: 'Spacing' },
    { name: 'cardGap', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
