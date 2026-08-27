import type { ComponentManifest } from '../../lib/types'
import Slider from './Slider'

const manifest: ComponentManifest = {
  name: 'Slider',
  component: Slider,
  category: 'Forms',
  // Drag the slider in the preview to set `value`.
  bindings: { onChange: 'value' },
  props: [
    { name: 'label', kind: 'text', default: 'Concurrency', group: 'Content' },
    { name: 'value', kind: 'number', default: 40, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'min', kind: 'number', default: 0, min: 0, max: 50, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 100, min: 10, max: 200, step: 10, group: 'Content' },
    { name: 'step', kind: 'number', default: 1, min: 1, max: 25, step: 1, group: 'Content' },
    { name: 'showValue', kind: 'boolean', default: true, group: 'Content' },

    { name: 'trackHeight', kind: 'number', default: 6, min: 2, max: 24, step: 1, group: 'Appearance' },
    { name: 'thumbSize', kind: 'number', default: 18, min: 8, max: 40, step: 1, group: 'Appearance' },
    { name: 'thumbBorderWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },

    { name: 'trackColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'fillColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'thumbColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'thumbBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 120, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

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
