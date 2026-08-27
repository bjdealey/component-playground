import type { ComponentManifest } from '../../lib/types'
import SearchBar from './SearchBar'

const manifest: ComponentManifest = {
  name: 'SearchBar',
  component: SearchBar,
  category: 'Forms',
  bindings: { onChange: 'value' },
  slots: [
    {
      name: 'hint',
      component: 'Kbd',
      label: 'Shortcut hint',
      defaults: { keys: '⌘, K', size: 11, minWidth: 18, paddingX: 5, paddingY: 2, shadow: false },
    },
    {
      name: 'action',
      component: 'IconButton',
      label: 'Trailing button',
      defaults: { glyph: '×', label: 'Clear', size: 22, fontScale: 0.8 },
    },
  ],
  props: [
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'Search components…', group: 'Content' },
    { name: 'glyph', kind: 'text', default: '⌕', group: 'Content' },
    { name: 'showHint', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'glyphColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 180, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 38, min: 26, max: 60, step: 1, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onChange',
      kind: 'event',
      default: 'handleChange',
      presets: ['handleChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
