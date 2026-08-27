import type { ComponentManifest } from '../../lib/types'
import RadioGroup from './RadioGroup'

const manifest: ComponentManifest = {
  name: 'RadioGroup',
  component: RadioGroup,
  category: 'Forms',
  bindings: { onSelect: 'selectedIndex' },
  props: [
    { name: 'legend', kind: 'text', default: 'Deploy target', group: 'Content' },
    { name: 'options', kind: 'text', default: 'Production, Staging, Preview', group: 'Content' },
    { name: 'selectedIndex', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Content' },

    {
      name: 'orientation',
      kind: 'select',
      options: ['vertical', 'horizontal'],
      default: 'vertical',
      group: 'Appearance',
    },
    { name: 'size', kind: 'number', default: 18, min: 10, max: 36, step: 1, group: 'Appearance' },
    { name: 'dotScale', kind: 'number', default: 0.45, min: 0.2, max: 0.8, step: 0.05, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1.5, min: 0.5, max: 4, step: 0.5, group: 'Appearance' },

    { name: 'selectedColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#cbd2da', group: 'Colors' },
    { name: 'dotColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'legendColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 14, min: 10, max: 22, step: 1, group: 'Typography' },
    { name: 'labelWeight', kind: 'number', default: 400, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'legendSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 10, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'optionGap', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

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
