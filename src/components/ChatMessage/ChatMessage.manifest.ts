import type { ComponentManifest } from '../../lib/types'
import ChatMessage from './ChatMessage'

const manifest: ComponentManifest = {
  name: 'ChatMessage',
  component: ChatMessage,
  category: 'Content',
  children: {
    kind: 'text',
    default:
      'You can center a div with flexbox: set the parent to `display: flex` and use `justify-content: center` and `align-items: center`. Grid works too — `display: grid; place-items: center`.',
    group: 'Content',
  },
  slots: [
    {
      name: 'avatar',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'AI', size: 30, background: '#4f46e5', shape: 'rounded' },
    },
  ],
  props: [
    {
      name: 'role',
      kind: 'select',
      options: ['assistant', 'user'],
      default: 'assistant',
      group: 'Content',
    },
    { name: 'name', kind: 'text', default: 'Claude', group: 'Content' },
    { name: 'timestamp', kind: 'text', default: '', group: 'Content' },
    { name: 'showName', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },
    { name: 'streaming', kind: 'boolean', default: false, group: 'Content' },
    { name: 'showActions', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 14, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 3, step: 1, group: 'Appearance' },
    {
      name: 'userTint',
      kind: 'number',
      default: 14,
      min: 0,
      max: 40,
      step: 1,
      group: 'Appearance',
    },

    { name: 'background', kind: 'color', default: '#f4f5f7', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 20, step: 0.5, group: 'Typography' },
    { name: 'metaSize', kind: 'number', default: 12, min: 10, max: 16, step: 0.5, group: 'Typography' },

    { name: 'maxWidth', kind: 'number', default: 560, min: 200, max: 720, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 11, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onCopy',
      kind: 'event',
      default: 'handleCopy',
      presets: ['handleCopy', '() => navigator.clipboard.writeText(text)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onRetry',
      kind: 'event',
      default: 'handleRetry',
      presets: ['handleRetry', '() => regenerate()', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
