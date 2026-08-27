import type { ComponentManifest } from '../../lib/types'
import Tree from './Tree'

const manifest: ComponentManifest = {
  name: 'Tree',
  component: Tree,
  category: 'Navigation',
  bindings: { onSelect: 'selectedIndex' },
  props: [
    // Leading "-" sets depth; a trailing "/" marks a folder.
    {
      name: 'items',
      kind: 'text',
      default:
        'src/;-components/;--Button.tsx;--Button.manifest.ts;-lib/;--types.ts;-main.tsx;README.md',
      group: 'Content',
    },
    { name: 'selectedIndex', kind: 'number', default: -1, min: -1, max: 20, step: 1, group: 'Content' },
    { name: 'showIcons', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showGuides', kind: 'boolean', default: true, group: 'Content' },
    { name: 'folderGlyph', kind: 'text', default: '▸', group: 'Content' },
    { name: 'fileGlyph', kind: 'text', default: '·', group: 'Content' },

    { name: 'indent', kind: 'number', default: 16, min: 4, max: 40, step: 1, group: 'Appearance' },
    { name: 'rowHeight', kind: 'number', default: 26, min: 16, max: 48, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Appearance' },

    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'folderColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'guideColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'selectedTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 280, min: 160, max: 1200, step: 10, group: 'Spacing' },
    { name: 'rowPaddingX', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
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
