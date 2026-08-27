import type { ComponentManifest } from '../../lib/types'
import TabbedCard from './TabbedCard'

const manifest: ComponentManifest = {
  name: 'TabbedCard',
  component: TabbedCard,
  category: 'Navigation',
  // One activeIndex drives both the strip and the panel.
  bindings: { onSelect: 'activeIndex' },
  props: [
    { name: 'items', kind: 'text', default: 'Overview, Logs, Settings', group: 'Content' },
    // Panels split on ";", matched to the tabs by position.
    {
      name: 'panels',
      kind: 'textarea',
      rows: 4,
      default: 'Deployed 12 minutes ago from main.;No errors in the last hour.;Auto-deploy is enabled for all branches.',
      group: 'Content',
    },
    { name: 'activeIndex', kind: 'number', default: 0, min: 0, max: 8, step: 1, group: 'Content' },

    {
      name: 'variant',
      kind: 'select',
      options: ['underline', 'pill', 'enclosed'],
      default: 'underline',
      group: 'Appearance',
    },
    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 360, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 16, min: 4, max: 36, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 2, max: 32, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
