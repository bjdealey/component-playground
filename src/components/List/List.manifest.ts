import type { ComponentManifest } from '../../lib/types'
import List from './List'

const manifest: ComponentManifest = {
  name: 'List',
  component: List,
  category: 'Data display',
  props: [
    {
      name: 'items',
      kind: 'textarea',
      rows: 4,
      default: [
        'Inbox | Unread and recent | 12',
        'Starred | Flagged threads | 3',
        "Sent | Everything you've sent |",
        'Archive | Older conversations | 1,204',
      ].join('\n'),
      group: 'Content',
    },
    {
      name: 'leading',
      kind: 'select',
      options: ['none', 'bullet', 'number'],
      default: 'none',
      group: 'Content',
    },
    { name: 'showSecondary', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showTrailing', kind: 'boolean', default: true, group: 'Content' },
    { name: 'interactive', kind: 'boolean', default: true, group: 'Content' },
    { name: 'selectedIndex', kind: 'number', default: 0, min: -1, max: 12, step: 1, group: 'Content' },

    { name: 'showDividers', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'descriptionColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'dividerColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'selectedColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 200, max: 640, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 11, min: 4, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Spacing' },

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
