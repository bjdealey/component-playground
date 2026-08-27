import type { ComponentManifest } from '../../lib/types'
import Gauge from './Gauge'

const manifest: ComponentManifest = {
  name: 'Gauge',
  component: Gauge,
  category: 'Charts',
  props: [
    { name: 'value', kind: 'number', default: 72, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 100, min: 1, max: 200, step: 1, group: 'Content' },
    { name: 'showValue', kind: 'boolean', default: true, group: 'Content' },
    { name: 'suffix', kind: 'text', default: '%', group: 'Content' },
    { name: 'label', kind: 'text', default: '', group: 'Content' },

    { name: 'size', kind: 'number', default: 120, min: 60, max: 260, step: 4, group: 'Appearance' },
    { name: 'thickness', kind: 'number', default: 10, min: 2, max: 40, step: 1, group: 'Appearance' },
    // 360 is a full ring; lower values leave a gap at the bottom.
    { name: 'sweep', kind: 'number', default: 270, min: 90, max: 360, step: 5, group: 'Appearance' },
    { name: 'rounded', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'trackColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'fillColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'valueSize', kind: 'number', default: 26, min: 10, max: 64, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 12, min: 9, max: 22, step: 1, group: 'Typography' },
  ],
}

export default manifest
