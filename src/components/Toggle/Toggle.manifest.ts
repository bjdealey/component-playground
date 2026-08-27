import type { ComponentManifest } from '../../lib/types'
import Toggle from './Toggle'

const manifest: ComponentManifest = {
  name: 'Toggle',
  component: Toggle,
  category: 'Forms',
  // Clicking the toggle in the preview writes back to the `checked` control.
  bindings: { onChange: 'checked' },
  props: [
    { name: 'label', kind: 'text', default: '', group: 'Content' },
    {
      name: 'labelPosition',
      kind: 'select',
      options: ['left', 'right'],
      default: 'right',
      group: 'Content',
    },

    {
      name: 'size',
      kind: 'select',
      options: ['sm', 'md', 'lg'],
      default: 'md',
      group: 'Appearance',
    },
    { name: 'ratio', kind: 'number', default: 1.75, min: 1.2, max: 3, step: 0.05, group: 'Appearance' },
    { name: 'trackRadius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'knobRadius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'knobInset', kind: 'number', default: 3, min: 0, max: 8, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'onColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'offColor', kind: 'color', default: '#cbd2da', group: 'Colors' },
    { name: 'knobColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 13, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'checked', kind: 'boolean', default: false, group: 'State' },
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
