import type { ComponentManifest } from '../../lib/types'
import Pagination from './Pagination'

const manifest: ComponentManifest = {
  name: 'Pagination',
  component: Pagination,
  category: 'Navigation',
  bindings: { onSelect: 'page' },
  props: [
    { name: 'totalPages', kind: 'number', default: 10, min: 1, max: 50, step: 1, group: 'Content' },
    { name: 'page', kind: 'number', default: 1, min: 1, max: 50, step: 1, group: 'Content' },
    // Pages shown either side of the current one before collapsing to "…".
    { name: 'siblings', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Content' },
    { name: 'showArrows', kind: 'boolean', default: true, group: 'Content' },

    { name: 'size', kind: 'number', default: 32, min: 20, max: 56, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'paddingX', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 4, min: 0, max: 16, step: 1, group: 'Spacing' },

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
      default: 0.95,
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
