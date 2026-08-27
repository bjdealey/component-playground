import type { ComponentManifest } from '../../lib/types'
import CommandPalette from './CommandPalette'

const manifest: ComponentManifest = {
  name: 'CommandPalette',
  component: CommandPalette,
  category: 'Navigation',
  // Typing filters the list live; clicking a row sets the active one.
  bindings: { onQueryChange: 'query', onSelect: 'activeIndex' },
  props: [
    {
      name: 'items',
      kind: 'text',
      default:
        'Open preview|⌘O;Redeploy|⌘R;Roll back|⌘⇧R;Copy deploy URL|⌘C;View build logs|⌘L;Invite teammate|',
      group: 'Content',
    },
    // Type in the preview's field to filter — this control follows along.
    { name: 'query', kind: 'text', default: '', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'Type a command…', group: 'Content' },
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 10, step: 1, group: 'Content' },
    { name: 'emptyText', kind: 'text', default: 'No matching commands', group: 'Content' },
    { name: 'showFooter', kind: 'boolean', default: true, group: 'Content' },
    { name: 'footerText', kind: 'text', default: '↑↓ to navigate · ↵ to run', group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'rowRadius', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'maxRows', kind: 'number', default: 5, min: 1, max: 10, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'shortcutColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'placeholderColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'inputSize', kind: 'number', default: 14, min: 10, max: 22, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 220, max: 560, step: 10, group: 'Spacing' },
    { name: 'rowHeight', kind: 'number', default: 34, min: 22, max: 56, step: 1, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onQueryChange',
      kind: 'event',
      default: 'handleQueryChange',
      presets: ['handleQueryChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
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
