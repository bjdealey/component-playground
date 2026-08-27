import type { ComponentManifest } from '../../lib/types'
import ProfileCard from './ProfileCard'

const manifest: ComponentManifest = {
  name: 'ProfileCard',
  component: ProfileCard,
  category: 'Content',
  slots: [
    {
      name: 'avatar',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'AK', size: 64, status: 'online', statusSize: 14 },
    },
    {
      name: 'badge',
      component: 'Badge',
      label: 'Badge',
      defaults: { tone: 'info', fontSize: 11, paddingX: 7, paddingY: 3 },
      childrenDefault: 'Admin',
    },
    {
      name: 'action',
      component: 'Button',
      label: 'Action button',
      defaults: { variant: 'secondary', fullWidth: true },
      childrenDefault: 'View profile',
    },
  ],
  props: [
    { name: 'name', kind: 'text', default: 'Ana Kowalski', group: 'Content' },
    { name: 'role', kind: 'text', default: 'Staff Engineer', group: 'Content' },
    {
      name: 'bio',
      kind: 'text',
      default: 'Works on the build pipeline and preview infrastructure.',
      group: 'Content',
    },
    // Stats split on ";", each "value|label".
    { name: 'stats', kind: 'text', default: '128|Deploys;42|Reviews;7|Projects', group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'center',
      group: 'Content',
    },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 14, min: 0, max: 36, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'nameColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'roleColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'bioColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'statValueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'statLabelColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'nameSize', kind: 'number', default: 15.5, min: 11, max: 26, step: 0.5, group: 'Typography' },
    { name: 'roleSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'bioSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 300, min: 220, max: 480, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 22, min: 8, max: 48, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
