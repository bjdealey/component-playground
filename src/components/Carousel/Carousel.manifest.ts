import type { ComponentManifest } from '../../lib/types'
import Carousel from './Carousel'

const manifest: ComponentManifest = {
  name: 'Carousel',
  component: Carousel,
  category: 'Content',
  // Arrows and dots both write back to activeIndex.
  bindings: { onSelect: 'activeIndex' },
  props: [
    { name: 'slides', kind: 'text', default: 'Build once;Preview everywhere;Ship on merge', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: 0, max: 10, step: 1, group: 'Content' },
    { name: 'showArrows', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showDots', kind: 'boolean', default: true, group: 'Content' },
    { name: 'loop', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'dotSize', kind: 'number', default: 7, min: 4, max: 16, step: 1, group: 'Appearance' },
    { name: 'buttonSize', kind: 'number', default: 28, min: 18, max: 56, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },

    // Cycled across the slides in order.
    { name: 'palette', kind: 'text', default: '#4f46e5, #0ea5e9, #15803d', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'arrowColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'activeDotColor', kind: 'color', default: '#ffffff', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 18, min: 11, max: 36, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 180, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 160, min: 80, max: 320, step: 10, group: 'Spacing' },
    { name: 'dotGap', kind: 'number', default: 6, min: 2, max: 20, step: 1, group: 'Spacing' },

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
