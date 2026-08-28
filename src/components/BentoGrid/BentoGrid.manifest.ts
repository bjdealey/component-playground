import type { ComponentManifest } from '../../lib/types'
import BentoGrid from './BentoGrid'

const manifest: ComponentManifest = {
  name: 'BentoGrid',
  component: BentoGrid,
  category: 'Content',
  props: [
    {
      name: 'items',
      kind: 'textarea',
      rows: 5,
      default: [
        '*Zero-config | Drop a folder in and it registers itself — no wiring, no build step. | 2x2',
        'Offline | Runs on a plane. | 1x1',
        'Themeable | One shared theme retints everything. | 1x1',
        'Dependency-light | Plain React and CSS Modules, nothing else. | 2x1',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'columns', kind: 'number', default: 3, min: 2, max: 4, step: 1, group: 'Content' },

    { name: 'radius', kind: 'number', default: 16, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },
    { name: 'rowHeight', kind: 'number', default: 116, min: 72, max: 220, step: 4, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 15, min: 11, max: 24, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 10, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 640, min: 280, max: 1040, step: 20, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 0, max: 32, step: 2, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 18, min: 4, max: 40, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: '',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
