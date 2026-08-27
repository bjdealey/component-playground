import type { ComponentManifest } from '../../lib/types'
import Skeleton from './Skeleton'

const manifest: ComponentManifest = {
  name: 'Skeleton',
  component: Skeleton,
  category: 'Primitives',
  props: [
    {
      name: 'variant',
      kind: 'select',
      options: ['text', 'rect', 'circle'],
      default: 'text',
      group: 'Content',
    },
    // Only applies to the "text" variant.
    { name: 'lines', kind: 'number', default: 3, min: 1, max: 8, step: 1, group: 'Content' },
    { name: 'lastLineWidth', kind: 'number', default: 60, min: 10, max: 100, step: 5, group: 'Content' },

    { name: 'radius', kind: 'number', default: 4, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'shimmer', kind: 'boolean', default: true, group: 'Appearance' },
    // Seconds per sweep — lower shimmers faster.
    { name: 'speed', kind: 'number', default: 1.4, min: 0.4, max: 4, step: 0.1, group: 'Appearance' },

    { name: 'baseColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'highlightColor', kind: 'color', default: '#f4f5f7', group: 'Colors' },

    { name: 'width', kind: 'number', default: 260, min: 40, max: 1200, step: 10, group: 'Spacing' },
    // Doubles as the diameter for the circle variant.
    { name: 'height', kind: 'number', default: 12, min: 4, max: 120, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Spacing' },
  ],
}

export default manifest
