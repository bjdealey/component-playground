import type { ComponentManifest } from '../../lib/types'
import DateField from './DateField'

const manifest: ComponentManifest = {
  name: 'DateField',
  component: DateField,
  category: 'Forms',
  // Click a day, or the trigger — the field text follows.
  bindings: { onSelectDay: 'day', onToggleOpen: 'open' },
  props: [
    { name: 'label', kind: 'text', default: 'Release date', group: 'Content' },
    { name: 'year', kind: 'number', default: 2026, min: 1970, max: 2100, step: 1, group: 'Content' },
    { name: 'month', kind: 'number', default: 7, min: 1, max: 12, step: 1, group: 'Content' },
    { name: 'day', kind: 'number', default: 20, min: 0, max: 31, step: 1, group: 'Content' },
    { name: 'helperText', kind: 'text', default: '', group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'cellSize', kind: 'number', default: 30, min: 20, max: 48, step: 1, group: 'Appearance' },

    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'width', kind: 'number', default: 260, min: 200, max: 420, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'open', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onSelectDay',
      kind: 'event',
      default: 'handleSelectDay',
      presets: ['handleSelectDay', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onToggleOpen',
      kind: 'event',
      default: 'handleToggleOpen',
      presets: ['handleToggleOpen', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
