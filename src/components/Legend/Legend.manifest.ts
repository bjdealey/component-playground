import type { ComponentManifest } from '../../lib/types'
import { CATEGORICAL_LIGHT_CSV } from '../../lib/palette'
import Legend from './Legend'

const manifest: ComponentManifest = {
  name: 'Legend',
  component: Legend,
  category: 'Charts',
  props: [
    // Series split on ";", each "label|value".
    { name: 'items', kind: 'text', default: 'Direct|42%;Search|27%;Social|18%;Referral|13%', group: 'Content' },
    { name: 'showValues', kind: 'boolean', default: true, group: 'Content' },
    {
      name: 'orientation',
      kind: 'select',
      options: ['vertical', 'horizontal'],
      default: 'vertical',
      group: 'Content',
    },

    { name: 'swatchSize', kind: 'number', default: 10, min: 6, max: 24, step: 1, group: 'Appearance' },
    { name: 'swatchRadius', kind: 'number', default: 3, min: 0, max: 12, step: 1, group: 'Appearance' },

    // The same validated categorical set the charts use.
    { name: 'palette', kind: 'text', default: CATEGORICAL_LIGHT_CSV, group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 180, min: 100, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onToggle',
      kind: 'event',
      default: 'handleToggle',
      presets: ['handleToggle', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
    // Rows only pick up a hover state when onToggle is set. The label carries
    // it; the swatch is left alone so the series colour stays readable.
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverUnderline', kind: 'boolean', default: true, group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
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
