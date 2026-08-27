import type { ComponentManifest } from '../../lib/types'
import Chip from './Chip'

const manifest: ComponentManifest = {
  name: 'Chip',
  component: Chip,
  category: 'Primitives',
  // Two bindings on one component: the body toggles, the × removes.
  bindings: { onToggle: 'selected', onRemove: 'removed' },
  props: [
    { name: 'label', kind: 'text', default: 'TypeScript', group: 'Content' },
    { name: 'dot', kind: 'boolean', default: false, group: 'Content' },
    { name: 'removable', kind: 'boolean', default: false, group: 'Content' },

    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'selectedTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'selectedBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    // Empty inherits the current text color.
    { name: 'dotColor', kind: 'color', default: '', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 11, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },

    { name: 'selected', kind: 'boolean', default: false, group: 'State' },
    // Set by the × — flip it back here to restore the chip.
    { name: 'removed', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onToggle',
      kind: 'event',
      default: 'handleToggle',
      presets: ['handleToggle', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onRemove',
      kind: 'event',
      default: 'handleRemove',
      presets: ['handleRemove', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
