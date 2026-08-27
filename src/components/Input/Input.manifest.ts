import type { ComponentManifest } from '../../lib/types'
import Input from './Input'

const manifest: ComponentManifest = {
  name: 'Input',
  component: Input,
  category: 'Forms',
  // Typing in the preview writes back to the `value` control.
  bindings: { onChange: 'value' },
  props: [
    { name: 'label', kind: 'text', default: 'Email', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'you@example.com', group: 'Content' },
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'helperText', kind: 'text', default: '', group: 'Content' },
    { name: 'required', kind: 'boolean', default: false, group: 'Content' },

    { name: 'radius', kind: 'number', default: 6, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },
    // Click into the field in the preview to see this one.
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'invalidColor', kind: 'color', default: '#dc2626', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 10, max: 20, step: 1, group: 'Typography' },
    { name: 'helperSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 140, max: 1200, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

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
