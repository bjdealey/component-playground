import type { ComponentManifest } from '../../lib/types'
import Toast from './Toast'

const manifest: ComponentManifest = {
  name: 'Toast',
  component: Toast,
  category: 'Feedback',
  bindings: { onClose: 'visible' },
  slots: [
    {
      name: 'icon',
      component: 'IconBadge',
      label: 'Tone icon',
      defaults: { glyph: '✓', size: 18, background: '#16a34a', fontScale: 0.62 },
    },
    {
      name: 'action',
      component: 'Button',
      label: 'Action button',
      defaults: { variant: 'ghost', paddingX: 8, paddingY: 4, fontSize: 12.5 },
      childrenDefault: 'View',
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'Deployed to production', group: 'Content' },
    { name: 'body', kind: 'text', default: 'preview-4f2a is now live.', group: 'Content' },
    { name: 'showIcon', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showClose', kind: 'boolean', default: true, group: 'Content' },

    {
      name: 'position',
      kind: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      default: 'bottom-right',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'showFrame', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'frameColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13.5, min: 10, max: 22, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 160, max: 420, step: 10, group: 'Spacing' },
    { name: 'frameWidth', kind: 'number', default: 400, min: 240, max: 620, step: 10, group: 'Spacing' },
    { name: 'frameHeight', kind: 'number', default: 200, min: 120, max: 400, step: 10, group: 'Spacing' },
    { name: 'inset', kind: 'number', default: 14, min: 0, max: 40, step: 1, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'visible', kind: 'boolean', default: true, group: 'State' },

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
