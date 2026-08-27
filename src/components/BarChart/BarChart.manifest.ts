import type { ComponentManifest } from '../../lib/types'
import BarChart from './BarChart'

const manifest: ComponentManifest = {
  name: 'BarChart',
  component: BarChart,
  category: 'Charts',
  // Click a bar in the preview to highlight it.
  bindings: { onSelect: 'highlightIndex' },
  props: [
    { name: 'data', kind: 'text', default: '12, 19, 8, 22, 16, 27, 21', group: 'Content' },
    { name: 'labels', kind: 'text', default: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun', group: 'Content' },
    { name: 'highlightIndex', kind: 'number', default: -1, min: -1, max: 11, step: 1, group: 'Content' },
    // Direct-label the highlighted bar rather than every bar.
    { name: 'labelHighlighted', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAllValues', kind: 'boolean', default: false, group: 'Content' },
    { name: 'showLabels', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showBaseline', kind: 'boolean', default: true, group: 'Content' },

    // Rounds the data-end only; bars stay anchored to the baseline.
    { name: 'radius', kind: 'number', default: 4, min: 0, max: 16, step: 1, group: 'Appearance' },

    { name: 'color', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'highlightColor', kind: 'color', default: '#0ea5e9', group: 'Colors' },
    // Value and axis text stay in muted ink, never the series color.
    { name: 'valueColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'baselineColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 11, min: 8, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 120, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 120, min: 40, max: 280, step: 10, group: 'Spacing' },
    // Minimum 2px keeps a visible surface gap between adjacent bars.
    { name: 'gap', kind: 'number', default: 6, min: 2, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    // Pointing at a column highlights its bar; empty background keeps the series
    // colour and lets brightness do the work on whichever bar you land on.
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.9,
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
