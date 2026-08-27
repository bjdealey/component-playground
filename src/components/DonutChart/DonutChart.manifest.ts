import type { ComponentManifest } from '../../lib/types'
import { CATEGORICAL_LIGHT_CSV } from '../../lib/palette'
import DonutChart from './DonutChart'

const manifest: ComponentManifest = {
  name: 'DonutChart',
  component: DonutChart,
  category: 'Charts',
  props: [
    { name: 'data', kind: 'text', default: '42, 27, 18, 13', group: 'Content' },
    { name: 'labels', kind: 'text', default: 'Direct, Search, Social, Referral', group: 'Content' },
    { name: 'centerValue', kind: 'text', default: '100', group: 'Content' },
    { name: 'centerLabel', kind: 'text', default: 'sessions', group: 'Content' },
    { name: 'showCenter', kind: 'boolean', default: true, group: 'Content' },
    // Two or more series always carry a legend, so identity is never colour alone.
    { name: 'showLegend', kind: 'boolean', default: true, group: 'Content' },

    { name: 'size', kind: 'number', default: 150, min: 80, max: 300, step: 5, group: 'Appearance' },
    { name: 'thickness', kind: 'number', default: 22, min: 4, max: 70, step: 1, group: 'Appearance' },
    // A surface-coloured gap stops neighbouring slices reading as one shape.
    { name: 'sliceGap', kind: 'number', default: 2, min: 0, max: 12, step: 1, group: 'Appearance' },
    { name: 'rounded', kind: 'boolean', default: false, group: 'Appearance' },

    // Validated categorical set — hues are assigned in fixed order, never cycled.
    { name: 'palette', kind: 'text', default: CATEGORICAL_LIGHT_CSV, group: 'Colors' },
    { name: 'gapColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'legendColor', kind: 'color', default: '#3f434a', group: 'Colors' },

    { name: 'valueSize', kind: 'number', default: 24, min: 10, max: 56, step: 1, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 11, min: 8, max: 18, step: 1, group: 'Typography' },
    { name: 'legendSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'legendGap', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.88,
      min: 0.5,
      max: 1.5,
      step: 0.01,
      group: 'Hover',
    },
    {
      name: 'onHoverChange',
      kind: 'event',
      default: 'handleHoverChange',
      presets: ['handleHoverChange', '(hovered) => console.log(hovered)', '() => {}'],
      noisy: true,
      group: 'Events',
    },
  ],
}

export default manifest
