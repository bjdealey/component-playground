import type { ComponentManifest } from '../../lib/types'
import SplitButton from './SplitButton'

const manifest: ComponentManifest = {
  name: 'SplitButton',
  component: SplitButton,
  category: 'Actions',
  bindings: { onToggleOpen: 'open', onSelect: 'activeIndex' },
  props: [
    { name: 'label', kind: 'text', default: 'Deploy', group: 'Content' },
    // Entries split on ";", each "label|shortcut". A bare "---" is a divider.
    {
      name: 'items',
      kind: 'textarea',
      rows: 4,
      default: 'Deploy to preview|⌘P;Deploy to production|⌘⇧P;---;Cancel queued build|⌫',
      group: 'Content',
    },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 10, step: 1, group: 'Content' },

    {
      name: 'variant',
      kind: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success'],
      default: 'primary',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 28, step: 1, group: 'Appearance' },

    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 14, min: 4, max: 36, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 9, min: 2, max: 24, step: 1, group: 'Spacing' },
    { name: 'menuWidth', kind: 'number', default: 240, min: 160, max: 400, step: 10, group: 'Spacing' },

    { name: 'open', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onToggleOpen',
      kind: 'event',
      default: 'handleToggleOpen',
      presets: ['handleToggleOpen', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
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
