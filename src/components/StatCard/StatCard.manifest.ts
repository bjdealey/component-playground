import type { ComponentManifest } from '../../lib/types'
import StatCard from './StatCard'

const manifest: ComponentManifest = {
  name: 'StatCard',
  component: StatCard,
  category: 'Data display',
  // Nothing here is drawn twice — the metric, trend and label are real components.
  slots: [
    {
      name: 'stat',
      component: 'Stat',
      label: 'Stat',
      defaults: { label: 'Requests', value: '84.2k', delta: '9%', trend: 'up' },
    },
    {
      name: 'chart',
      component: 'Sparkline',
      label: 'Sparkline',
      defaults: { width: 224, height: 40, area: true },
      // Stacked under the metric, the trend line is the width of the card.
      // Beside it, it is sharing the row and must not be.
      fitWidth: { when: { chartPosition: 'below' } },
    },
    {
      name: 'badge',
      component: 'Badge',
      label: 'Badge',
      defaults: { tone: 'success', fontSize: 11, paddingX: 8, paddingY: 4 },
      childrenDefault: 'Live',
    },
  ],
  props: [
    { name: 'caption', kind: 'text', default: 'Last 12 hours', group: 'Content' },
    {
      name: 'chartPosition',
      kind: 'select',
      options: ['below', 'right'],
      default: 'below',
      group: 'Content',
    },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: false, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'captionColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'captionSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 180, max: 520, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 18, min: 4, max: 40, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
