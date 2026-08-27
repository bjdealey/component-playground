import type { ComponentManifest } from '../../lib/types'
import { CATEGORICAL_LIGHT_CSV } from '../../lib/palette'
import StackedBar from './StackedBar'

const manifest: ComponentManifest = {
  name: 'StackedBar',
  component: StackedBar,
  category: 'Charts',
  props: [
    { name: 'data', kind: 'text', default: '46, 24, 18, 12', group: 'Content' },
    { name: 'labels', kind: 'text', default: 'Build, Test, Upload, Deploy', group: 'Content' },
    { name: 'title', kind: 'text', default: 'Pipeline time', group: 'Content' },
    { name: 'total', kind: 'text', default: '4m 12s', group: 'Content' },
    { name: 'showHeader', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showLegend', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showPercent', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'padding', kind: 'number', default: 0, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'titleWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'segmentGap', kind: 'number', default: 2, min: 0, max: 10, step: 1, group: 'Appearance' },
    { name: 'legendColumns', kind: 'number', default: 2, min: 1, max: 4, step: 1, group: 'Appearance' },

    // Same validated categorical set as DonutChart, in the same fixed order.
    { name: 'palette', kind: 'text', default: CATEGORICAL_LIGHT_CSV, group: 'Colors' },
    { name: 'gapColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'legendColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },
    { name: 'legendSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 160, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 14, min: 4, max: 48, step: 1, group: 'Spacing' },
    { name: 'legendGap', kind: 'number', default: 7, min: 0, max: 24, step: 1, group: 'Spacing' },

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
