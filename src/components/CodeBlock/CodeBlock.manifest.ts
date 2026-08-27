import type { ComponentManifest } from '../../lib/types'
import CodeBlock from './CodeBlock'

const manifest: ComponentManifest = {
  name: 'CodeBlock',
  component: CodeBlock,
  category: 'Data display',
  props: [
    {
      name: 'code',
      kind: 'textarea',
      rows: 5,
      default: 'const manifest = {\n  name: "Button",\n  props: [],\n}',
      group: 'Content',
    },
    { name: 'filename', kind: 'text', default: 'Button.manifest.ts', group: 'Content' },
    { name: 'language', kind: 'text', default: 'ts', group: 'Content' },
    { name: 'showHeader', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showLineNumbers', kind: 'boolean', default: true, group: 'Content' },
    { name: 'startLine', kind: 'number', default: 1, min: 1, max: 500, step: 1, group: 'Content' },
    // 0 highlights nothing.
    { name: 'highlightLine', kind: 'number', default: 0, min: 0, max: 40, step: 1, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'wrap', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#17181c', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#2b2d34', group: 'Colors' },
    { name: 'headerBackground', kind: 'color', default: '#1f2126', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'lineNumberColor', kind: 'color', default: '#5b616b', group: 'Colors' },
    { name: 'highlightColor', kind: 'color', default: '#2a2d36', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'lineHeight', kind: 'number', default: 1.65, min: 1, max: 2.4, step: 0.05, group: 'Typography' },

    { name: 'width', kind: 'number', default: 400, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },

    { name: 'showCopy', kind: 'boolean', default: true, group: 'Content' },
    { name: 'copyGlyph', kind: 'text', default: '⧉', group: 'Content' },

    {
      name: 'onCopy',
      kind: 'event',
      default: 'handleCopy',
      presets: ['handleCopy', '(code) => navigator.clipboard.writeText(code)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
