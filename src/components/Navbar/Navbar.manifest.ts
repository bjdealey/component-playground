import type { ComponentManifest } from '../../lib/types'
import Navbar from './Navbar'

const manifest: ComponentManifest = {
  name: 'Navbar',
  component: Navbar,
  category: 'Navigation',
  bindings: { onSelect: 'activeIndex' },
  slots: [
    {
      name: 'action',
      component: 'Button',
      defaults: { variant: 'primary', paddingX: 12, paddingY: 7, fontSize: 13 },
      childrenDefault: 'New project',
    },
    {
      name: 'avatar',
      component: 'Avatar',
      defaults: { initials: 'BD', size: 28 },
    },
  ],
  props: [
    { name: 'brand', kind: 'text', default: 'Playground', group: 'Content' },
    { name: 'brandGlyph', kind: 'text', default: '◆', group: 'Content' },
    { name: 'links', kind: 'text', default: 'Overview, Deploys, Analytics, Settings', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 8, step: 1, group: 'Content' },
    { name: 'showAction', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'brandColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'linkColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'activeColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'brandSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'linkSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 520, min: 320, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 52, min: 36, max: 88, step: 2, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 16, min: 4, max: 40, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 4, max: 40, step: 1, group: 'Spacing' },
    { name: 'linkGap', kind: 'number', default: 18, min: 4, max: 40, step: 1, group: 'Spacing' },

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
