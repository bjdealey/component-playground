import type { ComponentManifest } from '../../lib/types'
import ChipGroup from './ChipGroup'

const manifest: ComponentManifest = {
  name: 'ChipGroup',
  component: ChipGroup,
  category: 'Data display',
  bindings: { onSelect: 'selectedIndex' },
  props: [
    { name: 'items', kind: 'text', default: 'react, typescript, vite, css-modules, playground, manifests', group: 'Content' },
    { name: 'selectedIndex', kind: 'number', default: -1, min: -1, max: 12, step: 1, group: 'Content' },
    // Anything past this collapses into a "+N" chip.
    { name: 'max', kind: 'number', default: 4, min: 1, max: 12, step: 1, group: 'Content' },
    { name: 'removable', kind: 'boolean', default: false, group: 'Content' },

    { name: 'wrap', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'chipRadius', kind: 'number', default: 999, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'selectedTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'selectedBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'overflowBackground', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'overflowTextColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'chipPaddingX', kind: 'number', default: 11, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'chipPaddingY', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
