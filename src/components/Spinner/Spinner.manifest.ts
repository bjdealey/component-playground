import type { ComponentManifest } from '../../lib/types'
import Spinner from './Spinner'

const manifest: ComponentManifest = {
  name: 'Spinner',
  component: Spinner,
  category: 'Primitives',
  props: [
    { name: 'label', kind: 'text', default: '', group: 'Content' },
    {
      name: 'labelPosition',
      kind: 'select',
      options: ['right', 'bottom'],
      default: 'right',
      group: 'Content',
    },

    { name: 'size', kind: 'number', default: 28, min: 10, max: 96, step: 2, group: 'Appearance' },
    { name: 'thickness', kind: 'number', default: 3, min: 1, max: 12, step: 0.5, group: 'Appearance' },
    // Seconds per revolution — lower spins faster.
    { name: 'speed', kind: 'number', default: 0.7, min: 0.2, max: 3, step: 0.1, group: 'Appearance' },

    { name: 'color', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'trackColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
  ],
}

export default manifest
