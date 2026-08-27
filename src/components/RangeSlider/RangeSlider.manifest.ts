import type { ComponentManifest } from '../../lib/types'
import RangeSlider from './RangeSlider'

const manifest: ComponentManifest = {
  name: 'RangeSlider',
  component: RangeSlider,
  category: 'Forms',
  // One binding per thumb — the component keeps the pair ordered.
  bindings: { onLowChange: 'low', onHighChange: 'high' },
  props: [
    { name: 'label', kind: 'text', default: 'Price range', group: 'Content' },
    { name: 'low', kind: 'number', default: 25, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'high', kind: 'number', default: 70, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'min', kind: 'number', default: 0, min: 0, max: 50, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 100, min: 10, max: 200, step: 10, group: 'Content' },
    { name: 'step', kind: 'number', default: 1, min: 1, max: 25, step: 1, group: 'Content' },
    { name: 'prefix', kind: 'text', default: '$', group: 'Content' },
    { name: 'suffix', kind: 'text', default: '', group: 'Content' },
    { name: 'showValues', kind: 'boolean', default: true, group: 'Content' },

    { name: 'trackHeight', kind: 'number', default: 6, min: 2, max: 24, step: 1, group: 'Appearance' },
    { name: 'thumbSize', kind: 'number', default: 18, min: 10, max: 36, step: 1, group: 'Appearance' },
    { name: 'thumbBorderWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },

    { name: 'trackColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'fillColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'thumbColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'thumbBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 140, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onLowChange',
      kind: 'event',
      default: 'handleLowChange',
      presets: ['handleLowChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onHighChange',
      kind: 'event',
      default: 'handleHighChange',
      presets: ['handleHighChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
