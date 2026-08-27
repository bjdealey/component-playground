import type { ComponentManifest } from '../../lib/types'
import NotificationItem from './NotificationItem'

const manifest: ComponentManifest = {
  name: 'NotificationItem',
  component: NotificationItem,
  category: 'Content',
  // Click the unread dot in the preview to toggle read state.
  bindings: { onToggleRead: 'unread' },
  slots: [
    {
      name: 'primaryAction',
      component: 'Button',
      label: 'Primary button',
      defaults: { variant: 'primary', paddingX: 11, paddingY: 6, fontSize: 12, fontWeight: 600 },
      childrenDefault: 'Review',
    },
    {
      name: 'secondaryAction',
      component: 'Button',
      label: 'Secondary button',
      defaults: { variant: 'ghost', paddingX: 4, paddingY: 6, fontSize: 12, borderWidth: 0 },
      childrenDefault: 'Dismiss',
    },
    {
      name: 'children',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'MR', size: 34, background: '#0284c7' },
    },
  ],
  props: [
    { name: 'actor', kind: 'text', default: 'Maya Reyes', group: 'Content' },
    { name: 'action', kind: 'text', default: 'requested review on', group: 'Content' },
    { name: 'target', kind: 'text', default: 'feat/manifest-bindings', group: 'Content' },
    { name: 'timestamp', kind: 'text', default: '12m ago', group: 'Content' },
    { name: 'showActions', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showUnreadDot', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'dotSize', kind: 'number', default: 7, min: 4, max: 14, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'unreadBackground', kind: 'color', default: '#f7f8ff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'timeSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 380, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    { name: 'unread', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onToggleRead',
      kind: 'event',
      default: 'handleToggleRead',
      presets: ['handleToggleRead', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
