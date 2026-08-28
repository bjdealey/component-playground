import type { ComponentManifest } from '../../lib/types'
import FeatureGrid from './FeatureGrid'

const manifest: ComponentManifest = {
  name: 'FeatureGrid',
  component: FeatureGrid,
  category: 'Content',
  props: [
    {
      name: 'items',
      kind: 'textarea',
      rows: 4,
      default: [
        '⚡ | Fast by default | Static assets ship in milliseconds, with no config to tune.',
        '🔒 | Secure & offline | Sane defaults, nothing phones home, works on a plane.',
        '🎛️ | One shared theme | Retint, re-round and re-scale every component at once.',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'columns', kind: 'number', default: 3, min: 1, max: 4, step: 1, group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'left',
      group: 'Content',
    },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },
    { name: 'iconSize', kind: 'number', default: 40, min: 24, max: 64, step: 2, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 15, min: 11, max: 22, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13.5, min: 10, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 720, min: 280, max: 1040, step: 20, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 0, max: 40, step: 2, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 20, min: 0, max: 40, step: 1, group: 'Spacing' },

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
