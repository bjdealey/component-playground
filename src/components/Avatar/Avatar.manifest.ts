import type { ComponentManifest } from '../../lib/types'
import Avatar from './Avatar'

const manifest: ComponentManifest = {
  name: 'Avatar',
  component: Avatar,
  category: 'Primitives',
  props: [
    { name: 'initials', kind: 'text', default: 'BD', group: 'Content' },

    {
      name: 'shape',
      kind: 'select',
      options: ['circle', 'rounded', 'square'],
      default: 'circle',
      group: 'Appearance',
    },
    { name: 'size', kind: 'number', default: 44, min: 20, max: 140, step: 2, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'ringWidth', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'ringColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },

    {
      name: 'status',
      kind: 'select',
      options: ['none', 'online', 'busy', 'away', 'offline'],
      default: 'none',
      group: 'Status',
    },
    {
      name: 'statusPosition',
      kind: 'select',
      options: ['bottom-right', 'top-right'],
      default: 'bottom-right',
      group: 'Status',
    },
    { name: 'statusSize', kind: 'number', default: 12, min: 6, max: 28, step: 1, group: 'Status' },
    // Empty inherits the color implied by `status`.
    { name: 'statusColor', kind: 'color', default: '', group: 'Status' },

    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', '() => console.log(\'avatar\')', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
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
