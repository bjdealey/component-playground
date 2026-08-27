import type { ComponentManifest } from '../../lib/types'
import Tooltip from './Tooltip'

const manifest: ComponentManifest = {
  name: 'Tooltip',
  component: Tooltip,
  category: 'Feedback',
  props: [
    { name: 'content', kind: 'text', default: 'Rebuilds on every push', group: 'Content' },
    { name: 'target', kind: 'text', default: 'Auto-deploy', group: 'Content' },
    // Kept on by default so the bubble is always inspectable in the preview.
    { name: 'visible', kind: 'boolean', default: true, group: 'Content' },
    // Switch to "hover" to make the preview behave like a real tooltip.
    {
      name: 'trigger',
      kind: 'select',
      options: ['always', 'hover'],
      default: 'always',
      group: 'Content',
    },

    {
      name: 'placement',
      kind: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      default: 'top',
      group: 'Appearance',
    },
    { name: 'arrow', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'arrowSize', kind: 'number', default: 6, min: 0, max: 16, step: 1, group: 'Appearance' },
    { name: 'offset', kind: 'number', default: 8, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#ffffff', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 700, step: 100, group: 'Typography' },

    { name: 'maxWidth', kind: 'number', default: 220, min: 80, max: 420, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },
  ],
}

export default manifest
