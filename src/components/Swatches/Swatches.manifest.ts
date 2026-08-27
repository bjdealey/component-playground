import type { ComponentManifest } from '../../lib/types'
import Swatches from './Swatches'

const manifest: ComponentManifest = {
  name: 'Swatches',
  component: Swatches,
  category: 'Forms',
  bindings: { onSelect: 'selectedIndex' },
  props: [
    {
      name: 'colors',
      kind: 'text',
      default: '#4f46e5, #0ea5e9, #15803d, #d97706, #dc2626, #db2777, #7c3aed, #0f172a',
      group: 'Content',
    },
    { name: 'selectedIndex', kind: 'number', default: 0, min: -1, max: 20, step: 1, group: 'Content' },
    { name: 'columns', kind: 'number', default: 4, min: 1, max: 10, step: 1, group: 'Content' },
    { name: 'showLabels', kind: 'boolean', default: false, group: 'Content' },

    { name: 'size', kind: 'number', default: 34, min: 14, max: 72, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'ringWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'ringOffset', kind: 'number', default: 2, min: 0, max: 8, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'ringColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 10, min: 7, max: 16, step: 0.5, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    // No hover colour on purpose: the swatch's fill is the value being chosen,
    // so the hover state is a lift. Ignored under prefers-reduced-motion.
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    {
      name: 'hoverScale',
      kind: 'number',
      default: 1.06,
      min: 0.8,
      max: 1.3,
      step: 0.01,
      group: 'Hover',
    },
    {
      name: 'onHoverChange',
      kind: 'event',
      default: 'handleHoverChange',
      presets: ['handleHoverChange', '(hovered) => console.log(hovered)', '() => {}'],
      noisy: true,
      group: 'Events',
    },
  ],
}

export default manifest
