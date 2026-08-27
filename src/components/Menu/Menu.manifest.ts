import type { ComponentManifest } from '../../lib/types'
import Menu from './Menu'

const manifest: ComponentManifest = {
  name: 'Menu',
  component: Menu,
  category: 'Navigation',
  bindings: { onSelect: 'activeIndex' },
  props: [
    // Items split on ";", each "label|shortcut". A bare "---" is a divider.
    {
      name: 'items',
      kind: 'text',
      default: 'Rename|⌘R;Duplicate|⌘D;Move to…|;---;Delete|⌫',
      group: 'Content',
    },
    // Counts dividers too, so it lines up with the items string. -1 highlights none.
    { name: 'activeIndex', kind: 'number', default: 0, min: -1, max: 10, step: 1, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'itemRadius', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'shadow', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'shortcutColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'dividerColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 22, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 220, min: 140, max: 400, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'itemPaddingX', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'itemPaddingY', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },

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
