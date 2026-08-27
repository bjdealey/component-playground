import type { ComponentManifest } from '../../lib/types'
import PinInput from './PinInput'

const manifest: ComponentManifest = {
  name: 'PinInput',
  component: PinInput,
  category: 'Forms',
  // Type into the boxes in the preview and `value` follows.
  bindings: { onChange: 'value' },
  props: [
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'length', kind: 'number', default: 6, min: 2, max: 10, step: 1, group: 'Content' },
    { name: 'label', kind: 'text', default: 'Verification code', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: '·', group: 'Content' },
    { name: 'masked', kind: 'boolean', default: false, group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    // Inserts an extra gap every N boxes; 0 spaces them evenly.
    { name: 'groupAfter', kind: 'number', default: 3, min: 0, max: 6, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'filledBorderColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'invalidColor', kind: 'color', default: '#dc2626', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 18, min: 10, max: 32, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'boxWidth', kind: 'number', default: 40, min: 22, max: 72, step: 1, group: 'Spacing' },
    { name: 'boxHeight', kind: 'number', default: 46, min: 24, max: 80, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'invalid', kind: 'boolean', default: false, group: 'State' },
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
