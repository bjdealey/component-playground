import type { ComponentManifest } from '../../lib/types'
import ImageGallery from './ImageGallery'

const manifest: ComponentManifest = {
  name: 'ImageGallery',
  component: ImageGallery,
  category: 'Files & media',
  props: [
    {
      name: 'items',
      kind: 'textarea',
      rows: 6,
      default: [
        'Northern lights',
        'Terminal glow',
        'Studio desk',
        'City at dusk',
        'Paper textures',
        'Morning coffee',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'columns', kind: 'number', default: 3, min: 2, max: 4, step: 1, group: 'Content' },
    { name: 'showCaptions', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'captionSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 640, min: 240, max: 1040, step: 20, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 32, step: 1, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 0, min: 0, max: 40, step: 2, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: '',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
