import type { ComponentManifest } from '../../lib/types'
import Drawer from './Drawer'

const manifest: ComponentManifest = {
  name: 'Drawer',
  component: Drawer,
  category: 'Feedback',
  bindings: { onClose: 'open' },
  props: [
    { name: 'title', kind: 'text', default: 'Deploy settings', group: 'Content' },
    { name: 'body', kind: 'text', default: '', group: 'Content' },
    {
      name: 'items',
      kind: 'text',
      default: 'Environment, Build command, Output directory, Node version',
      group: 'Content',
    },
    { name: 'showClose', kind: 'boolean', default: true, group: 'Content' },

    {
      name: 'side',
      kind: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      default: 'right',
      group: 'Appearance',
    },
    { name: 'showOverlay', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'overlayOpacity', kind: 'number', default: 0.4, min: 0, max: 0.9, step: 0.05, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },

    { name: 'overlayColor', kind: 'color', default: '#0f172a', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'frameColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    // Width for left/right, height for top/bottom.
    { name: 'size', kind: 'number', default: 200, min: 80, max: 400, step: 10, group: 'Spacing' },
    { name: 'frameWidth', kind: 'number', default: 420, min: 240, max: 640, step: 10, group: 'Spacing' },
    { name: 'frameHeight', kind: 'number', default: 250, min: 160, max: 420, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 16, min: 4, max: 36, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },

    { name: 'open', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onClose',
      kind: 'event',
      default: 'handleClose',
      presets: ['handleClose', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
