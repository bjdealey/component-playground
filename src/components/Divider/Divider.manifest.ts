import type { ComponentManifest } from '../../lib/types'
import Divider from './Divider'

const manifest: ComponentManifest = {
  name: 'Divider',
  component: Divider,
  category: 'Primitives',
  props: [
    // Empty renders a plain rule with no label.
    { name: 'label', kind: 'text', default: '', group: 'Content' },
    {
      name: 'labelPosition',
      kind: 'select',
      options: ['left', 'center', 'right'],
      default: 'center',
      group: 'Content',
    },

    {
      name: 'orientation',
      kind: 'select',
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
      group: 'Appearance',
    },
    {
      name: 'lineStyle',
      kind: 'select',
      options: ['solid', 'dashed', 'dotted'],
      default: 'solid',
      group: 'Appearance',
    },
    { name: 'thickness', kind: 'number', default: 1, min: 1, max: 8, step: 1, group: 'Appearance' },

    { name: 'color', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 12, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'length', kind: 'number', default: 300, min: 40, max: 560, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 0, max: 40, step: 1, group: 'Spacing' },
  ],
}

export default manifest
