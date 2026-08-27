import type { ComponentManifest } from '../../lib/types'
import Combobox from './Combobox'

const manifest: ComponentManifest = {
  name: 'Combobox',
  component: Combobox,
  category: 'Forms',
  bindings: { onQueryChange: 'query', onSelect: 'activeIndex' },
  props: [
    { name: 'label', kind: 'text', default: 'Framework', group: 'Content' },
    {
      name: 'options',
      kind: 'text',
      default: 'Astro, Next.js, Nuxt, Remix, SolidStart, SvelteKit, Vite',
      group: 'Content',
    },
    // Type in the preview's field to filter — this control follows along.
    { name: 'query', kind: 'text', default: '', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'Search frameworks…', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 10, step: 1, group: 'Content' },
    { name: 'emptyText', kind: 'text', default: 'No matches', group: 'Content' },

    { name: 'open', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'maxRows', kind: 'number', default: 4, min: 1, max: 8, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 160, max: 1200, step: 10, group: 'Spacing' },
    { name: 'rowHeight', kind: 'number', default: 32, min: 22, max: 52, step: 1, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onQueryChange',
      kind: 'event',
      default: 'handleQueryChange',
      presets: ['handleQueryChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
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
