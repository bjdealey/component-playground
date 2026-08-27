import type { ComponentManifest } from '../../lib/types'
import Sparkline from './Sparkline'

const manifest: ComponentManifest = {
  name: 'Sparkline',
  component: Sparkline,
  category: 'Charts',
  props: [
    { name: 'data', kind: 'text', default: '4, 7, 5, 9, 8, 12, 10, 15, 13, 18, 16, 21', group: 'Content' },
    { name: 'label', kind: 'text', default: '', group: 'Content' },
    // A single series needs no legend — the surrounding label names it.
    { name: 'showLastPoint', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showBaseline', kind: 'boolean', default: false, group: 'Content' },

    { name: 'area', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'areaOpacity', kind: 'number', default: 0.12, min: 0, max: 0.6, step: 0.02, group: 'Appearance' },
    // Thin marks: 2px is the default line weight.
    { name: 'strokeWidth', kind: 'number', default: 2, min: 1, max: 8, step: 0.5, group: 'Appearance' },
    // Markers stay at 8px or above so they remain visible and hittable.
    { name: 'pointSize', kind: 'number', default: 8, min: 4, max: 20, step: 1, group: 'Appearance' },

    { name: 'color', kind: 'color', default: '#4f46e5', group: 'Colors' },
    // Empty inherits the line color.
    { name: 'pointColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'baselineColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'width', kind: 'number', default: 180, min: 60, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 48, min: 20, max: 200, step: 4, group: 'Spacing' },
  ],
}

export default manifest
