import type { ComponentManifest } from '../../lib/types'
import Comment from './Comment'

const manifest: ComponentManifest = {
  name: 'Comment',
  component: Comment,
  category: 'Content',
  bindings: { onToggleLike: 'liked' },
  slots: [
    {
      name: 'avatar',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'MR', size: 32, background: '#0284c7' },
    },
  ],
  props: [
    { name: 'author', kind: 'text', default: 'Maya Reyes', group: 'Content' },
    { name: 'timestamp', kind: 'text', default: '2h ago', group: 'Content' },
    {
      name: 'body',
      kind: 'textarea',
      rows: 3,
      default: 'Pinning the palette in one module was the right call — the charts were drifting apart before.',
      group: 'Content',
    },
    { name: 'likes', kind: 'number', default: 4, min: 0, max: 999, step: 1, group: 'Content' },
    { name: 'showActions', kind: 'boolean', default: true, group: 'Content' },

    // Above 0 the comment indents as a reply.
    { name: 'depth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'indent', kind: 'number', default: 34, min: 8, max: 72, step: 2, group: 'Appearance' },
    { name: 'showThreadLine', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'authorColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'threadColor', kind: 'color', default: '#eceef1', group: 'Colors' },

    { name: 'authorSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'metaSize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 400, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    { name: 'liked', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onToggleLike',
      kind: 'event',
      default: 'handleToggleLike',
      presets: ['handleToggleLike', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
