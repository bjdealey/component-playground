import type { ComponentManifest } from '../../lib/types'
import Link from './Link'

const manifest: ComponentManifest = {
  name: 'Link',
  component: Link,
  category: 'Primitives',
  children: { kind: 'text', default: 'Read the documentation', group: 'Content' },
  props: [
    { name: 'href', kind: 'text', default: '#', group: 'Content' },
    { name: 'external', kind: 'boolean', default: false, group: 'Content' },

    {
      name: 'underline',
      kind: 'select',
      options: ['hover', 'always', 'none'],
      default: 'hover',
      group: 'Appearance',
    },

    { name: 'color', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 22, step: 0.5, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 500, min: 300, max: 800, step: 100, group: 'Typography' },

    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.85,
      min: 0.5,
      max: 1.5,
      step: 0.01,
      group: 'Hover',
    },

    {
      name: 'onClick',
      kind: 'event',
      default: 'handleClick',
      presets: ['handleClick', "() => console.log('link')", '() => {}'],
      group: 'Events',
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
