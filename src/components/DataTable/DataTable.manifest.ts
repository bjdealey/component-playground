import type { ComponentManifest } from '../../lib/types'
import DataTable from './DataTable'

const manifest: ComponentManifest = {
  name: 'DataTable',
  component: DataTable,
  category: 'Data display',
  // One page drives both the visible rows and the pager.
  bindings: { onSelectPage: 'page' },
  props: [
    { name: 'headers', kind: 'text', default: 'Service, Status, Latency', group: 'Content' },
    {
      name: 'rows',
      kind: 'textarea',
      rows: 6,
      default:
        'api, healthy, 42ms; web, healthy, 18ms; worker, degraded, 310ms; cron, healthy, 63ms; queue, healthy, 27ms; cache, healthy, 9ms; search, degraded, 480ms',
      group: 'Content',
    },
    { name: 'page', kind: 'number', default: 1, min: 1, max: 20, step: 1, group: 'Content' },
    { name: 'pageSize', kind: 'number', default: 3, min: 1, max: 20, step: 1, group: 'Content' },
    { name: 'showFooter', kind: 'boolean', default: true, group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center', 'right'],
      default: 'left',
      group: 'Content',
    },

    { name: 'striped', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'compact', kind: 'boolean', default: false, group: 'Appearance' },

    // Forwarded to the Table it wraps. None of these existed, so a themed
    // page reached the wrapper's gap and nothing the reader actually sees.
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'buttonSize', kind: 'number', default: 26, min: 16, max: 48, step: 1, group: 'Appearance' },

    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'headerBackground', kind: 'color', default: '#fafbfc', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'stripeColor', kind: 'color', default: '#fafbfc', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'headerSize', kind: 'number', default: 11.5, min: 8, max: 18, step: 0.5, group: 'Typography' },
    { name: 'headerWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'footerSize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 420, min: 260, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    {
      name: 'onSelectPage',
      kind: 'event',
      default: 'handleSelectPage',
      presets: ['handleSelectPage', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
