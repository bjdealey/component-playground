import type { ComponentManifest } from '../../lib/types'
import Banner from './Banner'

const manifest: ComponentManifest = {
  name: 'Banner',
  component: Banner,
  category: 'Feedback',
  bindings: { onDismiss: 'dismissed' },
  slots: [
    {
      name: 'icon',
      component: 'IconBadge',
      label: 'Leading icon',
      defaults: { glyph: '!', size: 20, background: '#4f46e5', fontScale: 0.62 },
    },
    {
      name: 'action',
      component: 'Button',
      label: 'Action button',
      defaults: { variant: 'ghost', paddingX: 10, paddingY: 5, fontSize: 12.5 },
      childrenDefault: 'Details',
    },
  ],
  props: [
    {
      name: 'message',
      kind: 'text',
      default: 'Scheduled maintenance on Sunday 02:00–04:00 UTC.',
      group: 'Content',
    },
    { name: 'dismissible', kind: 'boolean', default: true, group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'left',
      group: 'Content',
    },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#1e3a8a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#c7d2fe', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 520, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Spacing' },

    { name: 'dismissed', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onDismiss',
      kind: 'event',
      default: 'handleDismiss',
      presets: ['handleDismiss', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
