import type { ComponentManifest } from '../../lib/types'
import ButtonGroup from './ButtonGroup'

const VARIANTS = ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success']

const manifest: ComponentManifest = {
  name: 'ButtonGroup',
  component: ButtonGroup,
  category: 'Actions',
  bindings: { onSelect: 'activeIndex' },
  props: [
    { name: 'items', kind: 'text', default: 'Left, Centre, Right', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 8, step: 1, group: 'Content' },

    { name: 'variant', kind: 'select', options: VARIANTS, default: 'secondary', group: 'Appearance' },
    { name: 'activeVariant', kind: 'select', options: VARIANTS, default: 'primary', group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 22, step: 1, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 14, min: 0, max: 40, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 8, min: 0, max: 28, step: 1, group: 'Spacing' },

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
