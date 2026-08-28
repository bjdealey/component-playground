import type { ComponentManifest } from '../../lib/types'
import ComparisonTable from './ComparisonTable'

const manifest: ComponentManifest = {
  name: 'ComparisonTable',
  component: ComparisonTable,
  category: 'Data display',
  props: [
    { name: 'plans', kind: 'text', default: 'Free, Pro, Enterprise', group: 'Content' },
    {
      name: 'features',
      kind: 'textarea',
      rows: 6,
      default: [
        'Projects | 3 | Unlimited | Unlimited',
        'Team members | 1 | 10 | Unlimited',
        'Analytics | no | yes | yes',
        'Priority support | no | no | yes',
        'Custom domains | no | yes | yes',
        'SSO & SAML | no | no | yes',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'firstColLabel', kind: 'text', default: '', group: 'Content' },
    { name: 'highlightIndex', kind: 'number', default: 1, min: -1, max: 5, step: 1, group: 'Content' },
    { name: 'highlightLabel', kind: 'text', default: 'Popular', group: 'Content' },
    { name: 'showBadge', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 560, min: 320, max: 840, step: 20, group: 'Spacing' },
    { name: 'rowPadding', kind: 'number', default: 11, min: 4, max: 22, step: 1, group: 'Spacing' },

    {
      name: 'onSelectPlan',
      kind: 'event',
      default: 'handleSelectPlan',
      presets: ['handleSelectPlan', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
