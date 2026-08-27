import type { ComponentManifest } from '../../lib/types'
import Button from './Button'

const manifest: ComponentManifest = {
  name: 'Button',
  component: Button,
  category: 'Primitives',
  children: { kind: 'text', default: 'Click me', group: 'Content' },
  props: [
    { name: 'icon', kind: 'text', default: '', group: 'Content' },
    {
      name: 'iconPosition',
      kind: 'select',
      options: ['left', 'right'],
      default: 'left',
      group: 'Content',
    },

    {
      name: 'variant',
      kind: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success'],
      default: 'primary',
      group: 'Appearance',
    },
    {
      name: 'shadow',
      kind: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      default: 'none',
      group: 'Appearance',
    },
    { name: 'radius', kind: 'number', default: 6, min: 0, max: 40, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 6, step: 1, group: 'Appearance' },
    { name: 'fullWidth', kind: 'boolean', default: false, group: 'Appearance' },

    // Empty means "inherit from variant" — set one to override the preset.
    { name: 'background', kind: 'color', default: '', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 10, max: 32, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'letterSpacing', kind: 'number', default: 0, min: -1, max: 4, step: 0.1, group: 'Typography' },
    { name: 'uppercase', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'paddingX', kind: 'number', default: 16, min: 0, max: 64, step: 2, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 10, min: 0, max: 40, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },
    { name: 'loading', kind: 'boolean', default: false, group: 'State' },
    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', '(event) => console.log(event.type)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: '', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.93,
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
