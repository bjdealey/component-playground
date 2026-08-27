import type { ComponentManifest } from '../../lib/types'
import Hero from './Hero'

const manifest: ComponentManifest = {
  name: 'Hero',
  component: Hero,
  category: 'Content',
  slots: [
    {
      name: 'primaryAction',
      component: 'Button',
      label: 'Primary button',
      defaults: { variant: 'primary', paddingX: 18, paddingY: 11, fontSize: 14 },
      childrenDefault: 'Start free',
    },
    {
      name: 'secondaryAction',
      component: 'Button',
      label: 'Secondary button',
      defaults: { variant: 'secondary', paddingX: 18, paddingY: 11, fontSize: 14 },
      childrenDefault: 'Read the docs',
    },
  ],
  props: [
    { name: 'eyebrow', kind: 'text', default: 'Preview deployments', group: 'Content' },
    { name: 'headline', kind: 'text', default: 'Every push gets a URL', group: 'Content' },
    {
      name: 'subhead',
      kind: 'text',
      default: 'Share a working build before it ships. No staging queue, no screenshots.',
      group: 'Content',
    },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'center',
      group: 'Content',
    },

    { name: 'radius', kind: 'number', default: 16, min: 0, max: 40, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#fbfbfc', group: 'Colors' },
    { name: 'eyebrowColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'headlineColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'subheadColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'eyebrowSize', kind: 'number', default: 11.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'headlineSize', kind: 'number', default: 28, min: 16, max: 56, step: 1, group: 'Typography' },
    { name: 'subheadSize', kind: 'number', default: 14, min: 10, max: 24, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 460, min: 280, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 34, min: 8, max: 64, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 2, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
