import type { ComponentManifest } from '../../lib/types'
import Table from './Table'

const manifest: ComponentManifest = {
  name: 'Table',
  component: Table,
  category: 'Data display',
  // Header clicks and checkbox toggles write straight back into the controls, so
  // the preview sorts and selects live and the copied JSX still expresses it.
  bindings: { onSortChange: 'sort', onSelectionChange: 'selected' },
  props: [
    { name: 'headers', kind: 'text', default: 'Service, Status, Latency', group: 'Content' },
    // Rows split on ";", cells split on ",".
    {
      name: 'rows',
      kind: 'text',
      default: 'api, healthy, 42ms; web, healthy, 18ms; worker, degraded, 310ms',
      group: 'Content',
    },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center', 'right'],
      default: 'left',
      group: 'Content',
    },
    { name: 'caption', kind: 'text', default: '', group: 'Content' },
    { name: 'footerRow', kind: 'text', default: '', group: 'Content' },

    // One entry per header, ","-separated; a blank entry inherits.
    { name: 'columnAlign', kind: 'text', default: '', group: 'Columns' },
    { name: 'columnWidths', kind: 'text', default: '', group: 'Columns' },
    { name: 'columnTypes', kind: 'text', default: 'text, status, number', group: 'Columns' },

    { name: 'sortable', kind: 'boolean', default: true, group: 'Behavior' },
    // "<columnIndex>:<asc|desc>" — bound to onSortChange, so clicking a header fills it.
    { name: 'sort', kind: 'text', default: '', group: 'Behavior' },
    { name: 'selectable', kind: 'boolean', default: false, group: 'Behavior' },
    // Comma-separated original-order row indices — bound to onSelectionChange.
    { name: 'selected', kind: 'text', default: '', group: 'Behavior' },
    { name: 'stickyHeader', kind: 'boolean', default: false, group: 'Behavior' },
    { name: 'maxHeight', kind: 'number', default: 0, min: 0, max: 600, step: 10, group: 'Behavior' },

    { name: 'striped', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'compact', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'columnDividers', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'headerBackground', kind: 'color', default: '#fbfbfc', group: 'Colors' },
    { name: 'stripeColor', kind: 'color', default: '#fafafb', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'headerSize', kind: 'number', default: 11.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'headerWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'uppercaseHeaders', kind: 'boolean', default: true, group: 'Typography' },

    { name: 'width', kind: 'number', default: 400, min: 200, max: 1200, step: 10, group: 'Spacing' },

    {
      name: 'onRowClick',
      kind: 'event',
      default: 'handleRowClick',
      presets: ['handleRowClick', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSortChange',
      kind: 'event',
      default: 'handleSortChange',
      presets: ['handleSortChange', '(sort) => console.log(sort)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSelectionChange',
      kind: 'event',
      default: 'handleSelectionChange',
      presets: ['handleSelectionChange', '(selected) => console.log(selected)', '() => {}'],
      group: 'Events',
    },
    // Rows only pick up a hover state when onRowClick is set.
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.97,
      min: 0.5,
      max: 1.5,
      step: 0.01,
      group: 'Hover',
    },
    {
      name: 'onHoverChange',
      kind: 'event',
      default: 'handleHoverChange',
      presets: ['handleHoverChange', '(hovered) => console.log(hovered)', '() => {}'],
      noisy: true,
      group: 'Events',
    },
  ],
}

export default manifest
