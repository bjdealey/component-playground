import type { ComponentManifest } from '../../lib/types'
import Checkbox from './Checkbox'

const manifest: ComponentManifest = {
  name: 'Checkbox',
  component: Checkbox,
  category: 'Forms',
  bindings: { onChange: 'checked' },
  props: [
    { name: 'label', kind: 'text', default: 'Ship preview builds', group: 'Content' },
    { name: 'glyph', kind: 'text', default: '✓', group: 'Content' },

    { name: 'size', kind: 'number', default: 18, min: 12, max: 40, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 4, min: 0, max: 20, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1.5, min: 0, max: 4, step: 0.5, group: 'Appearance' },

    { name: 'checkedColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#cbd2da', group: 'Colors' },
    { name: 'glyphColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'labelWeight', kind: 'number', default: 400, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'checked', kind: 'boolean', default: false, group: 'State' },
    { name: 'indeterminate', kind: 'boolean', default: false, group: 'State' },
    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

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
