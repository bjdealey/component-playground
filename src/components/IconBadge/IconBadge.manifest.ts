import type { ComponentManifest } from '../../lib/types'
import IconBadge from './IconBadge'

const manifest: ComponentManifest = {
  name: 'IconBadge',
  component: IconBadge,
  category: 'Primitives',
  props: [
    { name: 'glyph', kind: 'text', default: 'i', group: 'Content' },

    {
      name: 'shape',
      kind: 'select',
      options: ['circle', 'rounded', 'square'],
      default: 'circle',
      group: 'Appearance',
    },
    { name: 'size', kind: 'number', default: 20, min: 10, max: 96, step: 1, group: 'Appearance' },
    // Only applies to the "rounded" shape.
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 6, step: 0.5, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'color', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: 'transparent', group: 'Colors' },

    // Glyph size as a fraction of the badge, so it tracks `size`.
    { name: 'fontScale', kind: 'number', default: 0.6, min: 0.2, max: 1, step: 0.05, group: 'Typography' },
    { name: 'bold', kind: 'boolean', default: true, group: 'Typography' },
  ],
}

export default manifest
