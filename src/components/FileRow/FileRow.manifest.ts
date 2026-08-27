import type { ComponentManifest } from '../../lib/types'
import FileRow from './FileRow'

const manifest: ComponentManifest = {
  name: 'FileRow',
  component: FileRow,
  category: 'Files & media',
  bindings: { onRemove: 'removed' },
  slots: [
    {
      name: 'icon',
      component: 'IconBadge',
      label: 'File icon',
      defaults: { glyph: 'PDF', size: 34, shape: 'rounded', radius: 8, background: '#dc2626', fontScale: 0.32 },
    },
  ],
  props: [
    { name: 'name', kind: 'text', default: 'quarterly-report.pdf', group: 'Content' },
    { name: 'meta', kind: 'text', default: '2.4 MB', group: 'Content' },
    { name: 'progress', kind: 'number', default: 64, min: 0, max: 100, step: 1, group: 'Content' },
    {
      name: 'status',
      kind: 'select',
      options: ['uploading', 'done', 'failed'],
      default: 'uploading',
      group: 'Content',
    },
    { name: 'showProgress', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showRemove', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'nameColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'barColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'doneColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'failedColor', kind: 'color', default: '#dc2626', group: 'Colors' },

    { name: 'nameSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'metaSize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 360, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    { name: 'removed', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onRemove',
      kind: 'event',
      default: 'handleRemove',
      presets: ['handleRemove', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
