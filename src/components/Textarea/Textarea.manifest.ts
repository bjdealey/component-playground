import type { ComponentManifest } from '../../lib/types'
import Textarea from './Textarea'

const manifest: ComponentManifest = {
  name: 'Textarea',
  component: Textarea,
  category: 'Forms',
  bindings: { onChange: 'value' },
  props: [
    { name: 'label', kind: 'text', default: 'Release notes', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'What changed in this deploy?', group: 'Content' },
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'helperText', kind: 'text', default: '', group: 'Content' },
    { name: 'rows', kind: 'number', default: 4, min: 1, max: 12, step: 1, group: 'Content' },

    {
      name: 'resize',
      kind: 'select',
      options: ['none', 'vertical', 'both'],
      default: 'vertical',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'lineHeight', kind: 'number', default: 1.5, min: 1, max: 2.4, step: 0.1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 10, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 160, max: 1200, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
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
