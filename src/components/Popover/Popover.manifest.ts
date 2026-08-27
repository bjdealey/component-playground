import type { ComponentManifest } from '../../lib/types'
import Popover from './Popover'

const manifest: ComponentManifest = {
  name: 'Popover',
  component: Popover,
  category: 'Feedback',
  bindings: { onClose: 'open' },
  slots: [
    {
      name: 'action',
      component: 'Button',
      label: 'Action button',
      defaults: { variant: 'primary', paddingX: 12, paddingY: 7, fontSize: 12.5 },
      childrenDefault: 'Got it',
    },
  ],
  props: [
    { name: 'target', kind: 'text', default: 'Deploy settings', group: 'Content' },
    { name: 'title', kind: 'text', default: 'Preview builds', group: 'Content' },
    {
      name: 'body',
      kind: 'text',
      default: 'Every push to a branch gets its own URL. Builds expire after 30 days.',
      group: 'Content',
    },
    { name: 'showClose', kind: 'boolean', default: true, group: 'Content' },

    {
      name: 'placement',
      kind: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      default: 'bottom',
      group: 'Appearance',
    },
    { name: 'arrow', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'arrowSize', kind: 'number', default: 7, min: 0, max: 16, step: 1, group: 'Appearance' },
    { name: 'offset', kind: 'number', default: 10, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13.5, min: 10, max: 22, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 160, max: 420, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'open', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onClose',
      kind: 'event',
      default: 'handleClose',
      presets: ['handleClose', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
