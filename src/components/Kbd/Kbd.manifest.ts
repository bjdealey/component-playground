import type { ComponentManifest } from '../../lib/types'
import Kbd from './Kbd'

const manifest: ComponentManifest = {
  name: 'Kbd',
  component: Kbd,
  category: 'Primitives',
  props: [
    { name: 'keys', kind: 'text', default: '⌘, K', group: 'Content' },
    // Empty renders the caps with no glyph between them.
    { name: 'separator', kind: 'text', default: '+', group: 'Content' },

    { name: 'radius', kind: 'number', default: 5, min: 0, max: 16, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'separatorColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'size', kind: 'number', default: 12, min: 8, max: 28, step: 1, group: 'Typography' },

    { name: 'minWidth', kind: 'number', default: 22, min: 0, max: 60, step: 1, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 4, min: 0, max: 16, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Spacing' },
  ],
}

export default manifest
