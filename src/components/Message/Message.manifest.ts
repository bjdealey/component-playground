import type { ComponentManifest } from '../../lib/types'
import Message from './Message'

const manifest: ComponentManifest = {
  name: 'Message',
  component: Message,
  category: 'Content',
  slots: [
    {
      name: 'avatar',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'MR', size: 28, background: '#0284c7' },
    },
  ],
  props: [
    {
      name: 'body',
      kind: 'textarea',
      rows: 3,
      default: 'Pushed a fix for the palette drift — preview is rebuilding now.',
      group: 'Content',
    },
    { name: 'author', kind: 'text', default: 'Maya', group: 'Content' },
    { name: 'timestamp', kind: 'text', default: '14:02', group: 'Content' },
    {
      name: 'status',
      kind: 'select',
      options: ['none', 'sent', 'delivered', 'read'],
      default: 'read',
      group: 'Content',
    },
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showMeta', kind: 'boolean', default: true, group: 'Content' },

    {
      name: 'side',
      kind: 'select',
      options: ['left', 'right'],
      default: 'left',
      group: 'Appearance',
    },
    { name: 'showTail', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'tailSize', kind: 'number', default: 7, min: 0, max: 16, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 14, min: 0, max: 30, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#f3f4f6', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'bodySize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'metaSize', kind: 'number', default: 11, min: 8, max: 16, step: 0.5, group: 'Typography' },

    { name: 'maxWidth', kind: 'number', default: 280, min: 140, max: 480, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 11, min: 4, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },
  ],
}

export default manifest
