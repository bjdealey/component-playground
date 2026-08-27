import type { ComponentManifest } from '../../lib/types'
import DiffView from './DiffView'

const manifest: ComponentManifest = {
  name: 'DiffView',
  component: DiffView,
  category: 'Data display',
  props: [
    // A leading + or - on a line marks the change.
    {
      name: 'diff',
      kind: 'textarea',
      rows: 6,
      default:
        ' const manifest = {\n   name: "Button",\n-  props: [],\n+  props: [variant, size],\n+  bindings: { onChange: "value" },\n }',
      group: 'Content',
    },
    { name: 'filename', kind: 'text', default: 'Button.manifest.ts', group: 'Content' },
    { name: 'showHeader', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showLineNumbers', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showMarkers', kind: 'boolean', default: true, group: 'Content' },
    { name: 'startLine', kind: 'number', default: 1, min: 1, max: 500, step: 1, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'headerBackground', kind: 'color', default: '#fbfbfc', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'addBackground', kind: 'color', default: '#e7f8ed', group: 'Colors' },
    { name: 'addColor', kind: 'color', default: '#14532d', group: 'Colors' },
    { name: 'removeBackground', kind: 'color', default: '#fdeaea', group: 'Colors' },
    { name: 'removeColor', kind: 'color', default: '#7f1d1d', group: 'Colors' },
    { name: 'lineNumberColor', kind: 'color', default: '#c3c8d0', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'lineHeight', kind: 'number', default: 1.7, min: 1, max: 2.4, step: 0.05, group: 'Typography' },

    { name: 'width', kind: 'number', default: 420, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
