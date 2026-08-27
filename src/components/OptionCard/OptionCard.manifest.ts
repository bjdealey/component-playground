import type { ComponentManifest } from '../../lib/types'
import OptionCard from './OptionCard'

const manifest: ComponentManifest = {
  name: 'OptionCard',
  component: OptionCard,
  category: 'Content',
  bindings: { onToggle: 'selected' },
  slots: [
    {
      name: 'icon',
      component: 'IconBadge',
      label: 'Leading icon',
      defaults: { glyph: '◈', size: 32, shape: 'rounded', radius: 8, background: '#eef2ff', color: '#4f46e5' },
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'Preview deployments', group: 'Content' },
    {
      name: 'description',
      kind: 'text',
      default: 'Build every branch and get a shareable URL.',
      group: 'Content',
    },
    { name: 'meta', kind: 'text', default: 'Included', group: 'Content' },
    { name: 'showCheckbox', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#f7f8ff', group: 'Colors' },
    { name: 'selectedBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'descriptionColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'descriptionSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 240, max: 560, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    { name: 'selected', kind: 'boolean', default: false, group: 'State' },
    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onToggle',
      kind: 'event',
      default: 'handleToggle',
      presets: ['handleToggle', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
