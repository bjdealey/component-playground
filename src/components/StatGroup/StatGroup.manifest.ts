import type { ComponentManifest } from '../../lib/types'
import StatGroup from './StatGroup'

const manifest: ComponentManifest = {
  name: 'StatGroup',
  component: StatGroup,
  category: 'Data display',
  props: [
    // Metrics split on ";", fields on "|": label|value|delta|trend.
    {
      name: 'items',
      kind: 'textarea',
      rows: 4,
      default: 'Deploys|128|12%|up;Build time|3m 41s|8%|down;Success rate|99.2%||none',
      group: 'Content',
    },
    {
      name: 'orientation',
      kind: 'select',
      options: ['horizontal', 'vertical'],
      default: 'horizontal',
      group: 'Content',
    },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'left',
      group: 'Content',
    },
    { name: 'showDividers', kind: 'boolean', default: true, group: 'Content' },

    { name: 'dividerColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'upColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'downColor', kind: 'color', default: '#dc2626', group: 'Colors' },

    { name: 'valueSize', kind: 'number', default: 26, min: 14, max: 56, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 11.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'uppercaseLabels', kind: 'boolean', default: true, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 24, min: 4, max: 64, step: 2, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
