import type { ComponentManifest } from '../../lib/types'
import Breadcrumb from './Breadcrumb'

const manifest: ComponentManifest = {
  name: 'Breadcrumb',
  component: Breadcrumb,
  category: 'Navigation',
  props: [
    {
      name: 'items',
      kind: 'text',
      default: 'Home, Projects, component-playground, Settings',
      group: 'Content',
    },
    { name: 'separator', kind: 'text', default: '/', group: 'Content' },
    // 0 keeps every crumb; above 0 collapses the middle into "…".
    { name: 'maxItems', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Content' },

    { name: 'linkColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'currentColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'separatorColor', kind: 'color', default: '#cbd2da', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },
    { name: 'currentWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
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
