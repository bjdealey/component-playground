import type { ComponentManifest } from '../../lib/types'
import Progress from './Progress'

const manifest: ComponentManifest = {
  name: 'Progress',
  component: Progress,
  category: 'Charts',
  props: [
    { name: 'value', kind: 'number', default: 60, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 100, min: 1, max: 200, step: 1, group: 'Content' },
    { name: 'showLabel', kind: 'boolean', default: false, group: 'Content' },
    {
      name: 'labelPosition',
      kind: 'select',
      options: ['right', 'top', 'inside'],
      default: 'right',
      group: 'Content',
    },

    { name: 'height', kind: 'number', default: 10, min: 2, max: 40, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'labelWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'striped', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'animated', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'trackColor', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'fillColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    // Set this to turn the fill into a gradient.
    { name: 'fillColorTo', kind: 'color', default: '', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 12, min: 9, max: 22, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 300, min: 120, max: 1200, step: 10, group: 'Spacing' },
  ],
}

export default manifest
