import type { ComponentManifest } from '../../lib/types'
import CTASection from './CTASection'

const manifest: ComponentManifest = {
  name: 'CTASection',
  component: CTASection,
  category: 'Content',
  slots: [
    {
      name: 'primaryAction',
      component: 'Button',
      label: 'Primary button',
      defaults: { variant: 'primary', paddingX: 18, paddingY: 11, fontSize: 14 },
      childrenDefault: 'Get started',
    },
    {
      name: 'secondaryAction',
      component: 'Button',
      label: 'Secondary button',
      defaults: { variant: 'secondary', paddingX: 18, paddingY: 11, fontSize: 14 },
      childrenDefault: 'Talk to us',
    },
  ],
  props: [
    { name: 'headline', kind: 'text', default: 'Ship your first preview today', group: 'Content' },
    {
      name: 'subhead',
      kind: 'text',
      default: 'Drop a folder in, get a shareable build. No config, no account, no waiting.',
      group: 'Content',
    },
    {
      name: 'layout',
      kind: 'select',
      options: ['center', 'split'],
      default: 'center',
      group: 'Content',
    },

    { name: 'radius', kind: 'number', default: 18, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#f6f6fb', group: 'Colors' },
    { name: 'headlineColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'subheadColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e6e6f0', group: 'Colors' },

    { name: 'headlineSize', kind: 'number', default: 24, min: 15, max: 44, step: 1, group: 'Typography' },
    { name: 'subheadSize', kind: 'number', default: 14.5, min: 10, max: 22, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 640, min: 300, max: 1040, step: 20, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 32, min: 12, max: 64, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 4, max: 40, step: 1, group: 'Spacing' },
  ],
}

export default manifest
