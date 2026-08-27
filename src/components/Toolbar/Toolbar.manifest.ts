import type { ComponentManifest } from '../../lib/types'
import Toolbar from './Toolbar'

const manifest: ComponentManifest = {
  name: 'Toolbar',
  component: Toolbar,
  category: 'Actions',
  bindings: { onSelect: 'activeIndex' },
  props: [
    // Buttons split on ",", each "glyph|label". A bare "|" is a divider.
    { name: 'items', kind: 'text', default: 'B|Bold, I|Italic, U|Underline, |, ≡|Align, ⌫|Delete', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 10, step: 1, group: 'Content' },

    { name: 'buttonSize', kind: 'number', default: 30, min: 18, max: 56, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'buttonRadius', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'buttonColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'dividerColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'gap', kind: 'number', default: 2, min: 0, max: 16, step: 1, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 4, min: 0, max: 16, step: 1, group: 'Spacing' },

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
