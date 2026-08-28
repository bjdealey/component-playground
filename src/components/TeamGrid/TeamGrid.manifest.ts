import type { ComponentManifest } from '../../lib/types'
import TeamGrid from './TeamGrid'

const manifest: ComponentManifest = {
  name: 'TeamGrid',
  component: TeamGrid,
  category: 'Content',
  props: [
    {
      name: 'members',
      kind: 'textarea',
      rows: 4,
      default: [
        'Ada Okafor | Founder & CEO',
        'Ravi Menon | Head of Design',
        'Mia Sørensen | Staff Engineer',
        'Leo Alvarez | Product Lead',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'columns', kind: 'number', default: 4, min: 1, max: 5, step: 1, group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'center',
      group: 'Content',
    },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },
    { name: 'avatarSize', kind: 'number', default: 56, min: 32, max: 96, step: 2, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'nameColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'roleColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'nameSize', kind: 'number', default: 14, min: 11, max: 22, step: 0.5, group: 'Typography' },
    { name: 'roleSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 720, min: 280, max: 1040, step: 20, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 0, max: 40, step: 2, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 20, min: 0, max: 40, step: 1, group: 'Spacing' },

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
