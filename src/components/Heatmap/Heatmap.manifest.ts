import type { ComponentManifest } from '../../lib/types'
import Heatmap from './Heatmap'

const manifest: ComponentManifest = {
  name: 'Heatmap',
  component: Heatmap,
  category: 'Charts',
  props: [
    // Rows split on ";", cells split on ",".
    {
      name: 'data',
      kind: 'text',
      default: '0,1,2,1,0,3,2;1,3,4,2,1,0,0;2,4,4,3,2,1,1;0,0,1,4,3,2,0',
      group: 'Content',
    },
    { name: 'rowLabels', kind: 'text', default: 'W1, W2, W3, W4', group: 'Content' },
    { name: 'columnLabels', kind: 'text', default: 'M, T, W, T, F, S, S', group: 'Content' },
    { name: 'max', kind: 'number', default: 4, min: 1, max: 20, step: 1, group: 'Content' },
    { name: 'showRowLabels', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showColumnLabels', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showLegend', kind: 'boolean', default: true, group: 'Content' },
    { name: 'legendLabel', kind: 'text', default: 'Deploys', group: 'Content' },

    { name: 'cellSize', kind: 'number', default: 16, min: 6, max: 40, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 3, min: 0, max: 20, step: 1, group: 'Appearance' },

    // Sequential magnitude: one hue, light → dark. A rainbow ramp would encode
    // magnitude as identity and misread badly.
    { name: 'ramp', kind: 'text', default: '#dcfce7, #a7e8bd, #5fce8c, #2fa85f, #15803d', group: 'Colors' },
    { name: 'emptyColor', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 10.5, min: 7, max: 16, step: 0.5, group: 'Typography' },
    { name: 'gap', kind: 'number', default: 3, min: 0, max: 12, step: 1, group: 'Spacing' },

    {
      name: 'onSelectCell',
      kind: 'event',
      default: 'handleSelectCell',
      presets: ['handleSelectCell', '(row, column) => console.log(row, column)', '() => {}'],
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
