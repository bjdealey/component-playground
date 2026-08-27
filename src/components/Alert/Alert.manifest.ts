import type { ComponentManifest } from '../../lib/types'
import Alert from './Alert'

const manifest: ComponentManifest = {
  name: 'Alert',
  component: Alert,
  category: 'Feedback',
  // Clicking × sets `dismissed` — flip it back in the panel to restore.
  bindings: { onDismiss: 'dismissed' },
  slots: [
    {
      name: 'icon',
      component: 'IconBadge',
      label: 'Severity icon',
      defaults: { glyph: 'i', size: 18, background: '#2563eb', fontScale: 0.66 },
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'Heads up', group: 'Content' },
    {
      name: 'body',
      kind: 'text',
      default: 'Your preview environment will sleep after 30 minutes of inactivity.',
      group: 'Content',
    },
    { name: 'showIcon', kind: 'boolean', default: true, group: 'Content' },
    { name: 'dismissible', kind: 'boolean', default: false, group: 'Content' },
    { name: 'dismissed', kind: 'boolean', default: false, group: 'Content' },

    {
      name: 'severity',
      kind: 'select',
      options: ['info', 'success', 'warning', 'error'],
      default: 'info',
      group: 'Appearance',
    },
    { name: 'accentBar', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'accentWidth', kind: 'number', default: 4, min: 1, max: 12, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },

    // Empty means "inherit from severity".
    { name: 'background', kind: 'color', default: '', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 14, min: 10, max: 26, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 380, min: 200, max: 620, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 0, max: 40, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },

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
