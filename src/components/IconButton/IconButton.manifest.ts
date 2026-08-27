import type { ComponentManifest } from '../../lib/types'
import IconButton from './IconButton'

const manifest: ComponentManifest = {
  name: 'IconButton',
  component: IconButton,
  category: 'Primitives',
  props: [
    { name: 'glyph', kind: 'text', default: '×', group: 'Content' },
    // An icon-only control has no visible text, so this is its accessible name.
    { name: 'label', kind: 'text', default: 'Close', group: 'Content' },

    {
      name: 'shape',
      kind: 'select',
      options: ['circle', 'rounded', 'square'],
      default: 'rounded',
      group: 'Appearance',
    },
    { name: 'size', kind: 'number', default: 24, min: 14, max: 64, step: 1, group: 'Appearance' },
    // Only applies to the "rounded" shape.
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'background', kind: 'color', default: 'transparent', group: 'Colors' },
    { name: 'color', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: 'transparent', group: 'Colors' },

    { name: 'fontScale', kind: 'number', default: 0.72, min: 0.3, max: 1.2, step: 0.02, group: 'Typography' },

    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },
    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', '(event) => console.log(event.type)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: 'rgba(15, 23, 42, 0.07)', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 1,
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
