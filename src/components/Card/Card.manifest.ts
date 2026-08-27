import type { ComponentManifest } from '../../lib/types'
import Card from './Card'

const manifest: ComponentManifest = {
  name: 'Card',
  component: Card,
  category: 'Data display',
  props: [
    { name: 'eyebrow', kind: 'text', default: '', group: 'Content' },
    { name: 'title', kind: 'text', default: 'Deploy preview', group: 'Content' },
    {
      name: 'body',
      kind: 'text',
      default: 'Every push builds a preview you can share with the team.',
      group: 'Content',
    },
    { name: 'footer', kind: 'text', default: '', group: 'Content' },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    {
      name: 'shadow',
      kind: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      default: 'none',
      group: 'Appearance',
    },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center', 'right'],
      default: 'left',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 8, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 15, min: 11, max: 40, step: 1, group: 'Typography' },
    { name: 'titleWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13.5, min: 10, max: 24, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 160, max: 560, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 20, min: 0, max: 56, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 28, step: 1, group: 'Spacing' },

    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', '() => console.log(\'card\')', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.97,
      min: 0.5,
      max: 1.5,
      step: 0.01,
      group: 'Hover',
    },
    {
      name: 'onHoverChange',
      kind: 'event',
      default: 'handleHoverChange',
      presets: ['handleHoverChange', '(hovered) => console.log(hovered)', '() => {}'],
      noisy: true,
      group: 'Events',
    },
  ],
}

export default manifest
