import type { ComponentManifest } from '../../lib/types'
import Rating from './Rating'

const manifest: ComponentManifest = {
  name: 'Rating',
  component: Rating,
  category: 'Forms',
  // Click a star's left or right half to set a half or whole step.
  bindings: { onChange: 'value' },
  props: [
    // Fractional values render as a partially clipped symbol.
    { name: 'value', kind: 'number', default: 3.5, min: 0, max: 10, step: 0.5, group: 'Content' },
    { name: 'max', kind: 'number', default: 5, min: 1, max: 10, step: 1, group: 'Content' },
    { name: 'symbol', kind: 'text', default: '★', group: 'Content' },
    { name: 'showValue', kind: 'boolean', default: false, group: 'Content' },

    { name: 'size', kind: 'number', default: 22, min: 10, max: 64, step: 1, group: 'Appearance' },

    { name: 'filledColor', kind: 'color', default: '#f59e0b', group: 'Colors' },
    { name: 'emptyColor', kind: 'color', default: '#dfe3e8', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'valueSize', kind: 'number', default: 13, min: 9, max: 24, step: 1, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 3, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onChange',
      kind: 'event',
      default: 'handleChange',
      presets: ['handleChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
