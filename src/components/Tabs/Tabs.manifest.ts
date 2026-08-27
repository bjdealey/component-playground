import type { ComponentManifest } from '../../lib/types'
import Tabs from './Tabs'

const manifest: ComponentManifest = {
  name: 'Tabs',
  component: Tabs,
  category: 'Navigation',
  bindings: { onSelect: 'activeIndex' },
  props: [
    // Manifest props are primitives, so a list is authored as delimited text.
    { name: 'items', kind: 'text', default: 'Overview, Activity, Settings', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Content' },

    {
      name: 'variant',
      kind: 'select',
      options: ['underline', 'pill', 'enclosed'],
      default: 'underline',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'indicatorSize', kind: 'number', default: 2, min: 0, max: 8, step: 1, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'inactiveColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    // Empty inherits activeColor.
    { name: 'indicatorColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'background', kind: 'color', default: '', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 24, step: 0.5, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 700, step: 100, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 14, min: 0, max: 40, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 9, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 4, min: 0, max: 32, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.9,
      min: 0.5,
      max: 1.5,
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
