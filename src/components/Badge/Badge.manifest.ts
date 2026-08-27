import type { ComponentManifest } from '../../lib/types'
import Badge from './Badge'

const manifest: ComponentManifest = {
  name: 'Badge',
  component: Badge,
  category: 'Primitives',
  children: { kind: 'text', default: 'Beta', group: 'Content' },
  props: [
    { name: 'dot', kind: 'boolean', default: false, group: 'Content' },

    {
      name: 'tone',
      kind: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
      default: 'neutral',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'dotSize', kind: 'number', default: 6, min: 3, max: 14, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },

    // Empty means "inherit from tone" — set one to override the preset.
    { name: 'background', kind: 'color', default: '', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'dotColor', kind: 'color', default: '', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12, min: 8, max: 24, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'letterSpacing', kind: 'number', default: 0.1, min: -0.5, max: 3, step: 0.1, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 10, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 16, step: 1, group: 'Spacing' },
  ],
}

export default manifest
