import type { ComponentManifest } from '../../lib/types'
import SegmentedControl from './SegmentedControl'

const manifest: ComponentManifest = {
  name: 'SegmentedControl',
  component: SegmentedControl,
  category: 'Navigation',
  bindings: { onSelect: 'selectedIndex' },
  props: [
    { name: 'options', kind: 'text', default: 'Day, Week, Month', group: 'Content' },
    { name: 'selectedIndex', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'trackColor', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'indicatorColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 140, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 3, min: 0, max: 12, step: 1, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },

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
