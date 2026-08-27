import type { ComponentManifest } from '../../lib/types'
import Stat from './Stat'

const manifest: ComponentManifest = {
  name: 'Stat',
  component: Stat,
  category: 'Data display',
  props: [
    { name: 'label', kind: 'text', default: 'Deploys this week', group: 'Content' },
    // Text rather than number so units like "1.2k" or "99.9%" work.
    { name: 'value', kind: 'text', default: '128', group: 'Content' },
    { name: 'delta', kind: 'text', default: '12%', group: 'Content' },
    {
      name: 'trend',
      kind: 'select',
      options: ['none', 'up', 'down'],
      default: 'up',
      group: 'Content',
    },
    { name: 'caption', kind: 'text', default: '', group: 'Content' },

    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center', 'right'],
      default: 'left',
      group: 'Appearance',
    },

    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'captionColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'upColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'downColor', kind: 'color', default: '#dc2626', group: 'Colors' },

    { name: 'valueSize', kind: 'number', default: 30, min: 14, max: 72, step: 1, group: 'Typography' },
    { name: 'valueWeight', kind: 'number', default: 700, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 12, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'deltaSize', kind: 'number', default: 12.5, min: 9, max: 22, step: 0.5, group: 'Typography' },
    { name: 'uppercaseLabel', kind: 'boolean', default: true, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 4, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', '() => console.log(\'stat\')', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.97,
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
