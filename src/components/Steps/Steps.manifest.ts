import type { ComponentManifest } from '../../lib/types'
import Steps from './Steps'

const manifest: ComponentManifest = {
  name: 'Steps',
  component: Steps,
  category: 'Navigation',
  bindings: { onSelect: 'activeIndex' },
  props: [
    { name: 'items', kind: 'text', default: 'Build, Test, Deploy', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 1, min: 0, max: 8, step: 1, group: 'Content' },
    { name: 'showLabels', kind: 'boolean', default: true, group: 'Content' },
    { name: 'completedGlyph', kind: 'text', default: '✓', group: 'Content' },

    {
      name: 'orientation',
      kind: 'select',
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
      group: 'Appearance',
    },
    { name: 'markerSize', kind: 'number', default: 26, min: 16, max: 56, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'connectorWidth', kind: 'number', default: 2, min: 1, max: 8, step: 1, group: 'Appearance' },
    { name: 'connectorLength', kind: 'number', default: 40, min: 8, max: 120, step: 4, group: 'Appearance' },

    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'completedColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'pendingColor', kind: 'color', default: '#cbd2da', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'markerTextColor', kind: 'color', default: '#ffffff', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'labelWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Spacing' },

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
