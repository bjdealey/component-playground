import type { ComponentManifest } from '../../lib/types'
import FAQ from './FAQ'

const manifest: ComponentManifest = {
  name: 'FAQ',
  component: FAQ,
  category: 'Content',
  // Click a question to open it; click the open one to close (sets -1).
  bindings: { onToggle: 'openIndex' },
  props: [
    { name: 'title', kind: 'text', default: 'Frequently asked questions', group: 'Content' },
    {
      name: 'subtitle',
      kind: 'text',
      default: 'Everything you need before you drop it in.',
      group: 'Content',
    },
    {
      name: 'items',
      kind: 'textarea',
      rows: 5,
      default: [
        'Is it free? | Yes — every component is source you own, dropped straight into your repo.',
        "Do I need a UI framework? | No. It's plain React and CSS Modules, nothing else to install.",
        'Does it work offline? | Completely. Nothing phones home, so it runs on a plane.',
        'Can I theme it all at once? | Yes — one shared theme retints, re-rounds and re-scales every component.',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'openIndex', kind: 'number', default: 0, min: -1, max: 12, step: 1, group: 'Content' },
    {
      name: 'align',
      kind: 'select',
      options: ['left', 'center'],
      default: 'left',
      group: 'Content',
    },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 22, min: 14, max: 40, step: 1, group: 'Typography' },
    { name: 'questionSize', kind: 'number', default: 14.5, min: 11, max: 22, step: 0.5, group: 'Typography' },
    { name: 'answerSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 520, min: 280, max: 900, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 18, min: 6, max: 36, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },

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
