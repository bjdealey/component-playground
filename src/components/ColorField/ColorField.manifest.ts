import type { ComponentManifest } from '../../lib/types'
import ColorField from './ColorField'

const manifest: ComponentManifest = {
  name: 'ColorField',
  component: ColorField,
  category: 'Forms',
  // Pick a swatch; the field text and preview follow.
  bindings: { onSelect: 'selectedIndex' },
  props: [
    { name: 'label', kind: 'text', default: 'Accent colour', group: 'Content' },
    {
      name: 'colors',
      kind: 'text',
      default: '#4f46e5, #0284c7, #15803d, #d97706, #db2777, #7c3aed, #dc2626, #0f172a',
      group: 'Content',
    },
    { name: 'selectedIndex', kind: 'number', default: 0, min: 0, max: 16, step: 1, group: 'Content' },
    { name: 'helperText', kind: 'text', default: '', group: 'Content' },
    { name: 'showSwatches', kind: 'boolean', default: true, group: 'Content' },

    { name: 'columns', kind: 'number', default: 8, min: 1, max: 10, step: 1, group: 'Appearance' },
    { name: 'swatchSize', kind: 'number', default: 30, min: 16, max: 56, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 2, max: 24, step: 1, group: 'Appearance' },

    { name: 'width', kind: 'number', default: 300, min: 220, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 2, max: 24, step: 1, group: 'Spacing' },

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
