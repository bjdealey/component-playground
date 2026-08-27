import type { ComponentManifest } from '../../lib/types'
import EmptyState from './EmptyState'

const manifest: ComponentManifest = {
  name: 'EmptyState',
  component: EmptyState,
  category: 'Feedback',
  slots: [
    {
      name: 'glyph',
      component: 'IconBadge',
      label: 'Glyph medallion',
      defaults: { glyph: '📭', size: 56, background: '#f3f4f6', color: '#6b7280', fontScale: 0.46, bold: false },
    },
    {
      name: 'action',
      component: 'Button',
      label: 'Action button',
      childrenDefault: 'Read the docs',
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'No deployments yet', group: 'Content' },
    {
      name: 'body',
      kind: 'text',
      default: 'Push to a branch and your first preview will show up here.',
      group: 'Content',
    },
    { name: 'showAction', kind: 'boolean', default: true, group: 'Content' },

    { name: 'dashed', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: 'transparent', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 15, min: 11, max: 28, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 32, min: 8, max: 64, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
  ],
}

export default manifest
