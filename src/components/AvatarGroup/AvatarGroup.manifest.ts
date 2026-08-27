import type { ComponentManifest } from '../../lib/types'
import AvatarGroup from './AvatarGroup'

const manifest: ComponentManifest = {
  name: 'AvatarGroup',
  component: AvatarGroup,
  category: 'Data display',
  props: [
    { name: 'people', kind: 'text', default: 'BD, AK, MR, JL, TS', group: 'Content' },
    // Anyone past this count collapses into a "+N" face.
    { name: 'max', kind: 'number', default: 4, min: 1, max: 8, step: 1, group: 'Content' },

    {
      name: 'shape',
      kind: 'select',
      options: ['circle', 'rounded', 'square'],
      default: 'circle',
      group: 'Appearance',
    },
    { name: 'size', kind: 'number', default: 36, min: 18, max: 88, step: 2, group: 'Appearance' },
    { name: 'overlap', kind: 'number', default: 10, min: -8, max: 40, step: 1, group: 'Appearance' },
    { name: 'ringWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },

    // Cycled across the faces in order.
    { name: 'palette', kind: 'text', default: '#4f46e5, #0ea5e9, #15803d, #d97706, #db2777', group: 'Colors' },
    { name: 'ringColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'overflowBackground', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'overflowTextColor', kind: 'color', default: '#3f434a', group: 'Colors' },

    { name: 'fontWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onOverflowClick',
      kind: 'event',
      default: 'handleOverflowClick',
      presets: ['handleOverflowClick', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
