import type { ComponentManifest } from '../../lib/types'
import Onboarding from './Onboarding'

const manifest: ComponentManifest = {
  name: 'Onboarding',
  component: Onboarding,
  category: 'Feedback',
  slots: [
    {
      name: 'primaryAction',
      component: 'Button',
      label: 'CTA button',
      defaults: { variant: 'primary', paddingX: 16, paddingY: 10, fontSize: 13.5, fullWidth: true },
      childrenDefault: 'Invite a teammate',
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'Get set up', group: 'Content' },
    {
      name: 'subtitle',
      kind: 'text',
      default: 'Finish these to unlock your workspace.',
      group: 'Content',
    },
    {
      name: 'steps',
      kind: 'textarea',
      rows: 4,
      default: [
        'Create your workspace | done',
        'Connect a repository | done',
        'Invite a teammate | todo',
        'Ship your first preview | todo',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'showProgress', kind: 'boolean', default: true, group: 'Content' },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 16, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'pendingColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 17, min: 12, max: 28, step: 0.5, group: 'Typography' },
    { name: 'stepSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 360, min: 260, max: 560, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 22, min: 8, max: 44, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },

    {
      name: 'onStep',
      kind: 'event',
      default: 'handleStep',
      presets: ['handleStep', '(index) => console.log(index)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
