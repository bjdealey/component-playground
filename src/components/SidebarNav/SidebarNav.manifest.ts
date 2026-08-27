import type { ComponentManifest } from '../../lib/types'
import SidebarNav from './SidebarNav'

const manifest: ComponentManifest = {
  name: 'SidebarNav',
  component: SidebarNav,
  category: 'Navigation',
  bindings: { onSelect: 'activeIndex' },
  props: [
    // Rows split on ";", each "glyph|label|badge". A "--Name" row is a heading.
    {
      name: 'items',
      kind: 'text',
      default: '--Workspace;◈|Overview|;⚡|Deploys|12;◷|Activity|;--Settings;⚙|General|;⚿|Access|3',
      group: 'Content',
    },
    { name: 'activeIndex', kind: 'number', default: 1, min: -1, max: 12, step: 1, group: 'Content' },
    { name: 'showGlyphs', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showBadges', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 7, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'rowHeight', kind: 'number', default: 34, min: 22, max: 56, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: 'transparent', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'activeTextColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'sectionColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'badgeBackground', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'badgeColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'sectionSize', kind: 'number', default: 10.5, min: 8, max: 16, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 220, min: 140, max: 380, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 2, min: 0, max: 14, step: 1, group: 'Spacing' },

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
