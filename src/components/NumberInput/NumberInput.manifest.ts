import type { ComponentManifest } from '../../lib/types'
import NumberInput from './NumberInput'

const manifest: ComponentManifest = {
  name: 'NumberInput',
  component: NumberInput,
  category: 'Forms',
  bindings: { onChange: 'value' },
  props: [
    { name: 'label', kind: 'text', default: 'Replicas', group: 'Content' },
    { name: 'value', kind: 'number', default: 3, min: 0, max: 20, step: 1, group: 'Content' },
    { name: 'min', kind: 'number', default: 0, min: 0, max: 10, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 20, min: 1, max: 100, step: 1, group: 'Content' },
    { name: 'step', kind: 'number', default: 1, min: 1, max: 10, step: 1, group: 'Content' },
    { name: 'suffix', kind: 'text', default: '', group: 'Content' },

    { name: 'radius', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'buttonColor', kind: 'color', default: '#f3f4f6', group: 'Colors' },
    { name: 'buttonTextColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 160, min: 100, max: 320, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 36, min: 24, max: 56, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

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
