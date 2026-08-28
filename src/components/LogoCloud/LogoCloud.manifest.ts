import type { ComponentManifest } from '../../lib/types'
import LogoCloud from './LogoCloud'

const manifest: ComponentManifest = {
  name: 'LogoCloud',
  component: LogoCloud,
  category: 'Content',
  props: [
    { name: 'label', kind: 'text', default: 'Trusted by fast-moving teams', group: 'Content' },
    { name: 'showLabel', kind: 'boolean', default: true, group: 'Content' },
    {
      name: 'logos',
      kind: 'text',
      default: 'Vercel, Linear, Raycast, Supabase, Framer, Retool',
      group: 'Content',
    },

    { name: 'faded', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'columns', kind: 'number', default: 3, min: 2, max: 6, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 11.5, min: 9, max: 16, step: 0.5, group: 'Typography' },
    { name: 'logoSize', kind: 'number', default: 19, min: 12, max: 32, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 640, min: 280, max: 1040, step: 20, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 24, min: 0, max: 48, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 20, min: 6, max: 48, step: 2, group: 'Spacing' },

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
