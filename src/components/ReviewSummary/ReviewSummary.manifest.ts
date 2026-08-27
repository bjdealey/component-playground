import type { ComponentManifest } from '../../lib/types'
import ReviewSummary from './ReviewSummary'

const manifest: ComponentManifest = {
  name: 'ReviewSummary',
  component: ReviewSummary,
  category: 'Charts',
  slots: [
    {
      name: 'rating',
      component: 'Rating',
      label: 'Rating',
      defaults: { value: 4.5, size: 16, gap: 2 },
    },
  ],
  props: [
    { name: 'average', kind: 'text', default: '4.3', group: 'Content' },
    { name: 'total', kind: 'text', default: '1,284 reviews', group: 'Content' },
    // Counts from 5 stars down to 1.
    { name: 'distribution', kind: 'text', default: '742, 318, 141, 52, 31', group: 'Content' },
    { name: 'showCounts', kind: 'boolean', default: true, group: 'Content' },

    { name: 'barHeight', kind: 'number', default: 7, min: 3, max: 24, step: 1, group: 'Appearance' },
    { name: 'barRadius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },

    { name: 'barColor', kind: 'color', default: '#f59e0b', group: 'Colors' },
    { name: 'trackColor', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'averageColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'totalColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'rowColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'averageSize', kind: 'number', default: 34, min: 16, max: 64, step: 1, group: 'Typography' },
    { name: 'totalSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'rowSize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 220, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 2, max: 32, step: 1, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Spacing' },
  ],
}

export default manifest
