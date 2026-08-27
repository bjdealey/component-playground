import type { ComponentManifest } from '../../lib/types'
import Timeline from './Timeline'

const manifest: ComponentManifest = {
  name: 'Timeline',
  component: Timeline,
  category: 'Data display',
  props: [
    // Events split on ";", fields split on "|": time|title|body.
    {
      name: 'items',
      kind: 'text',
      default:
        '09:14|Build started|Installing dependencies from the lockfile.;09:16|Tests passed|312 tests, 0 failures.;09:18|Deployed|Live behind the preview flag.',
      group: 'Content',
    },
    // Events before this index use the completed colour.
    { name: 'activeIndex', kind: 'number', default: 3, min: 0, max: 10, step: 1, group: 'Content' },
    { name: 'showTime', kind: 'boolean', default: true, group: 'Content' },

    { name: 'dotSize', kind: 'number', default: 11, min: 5, max: 28, step: 1, group: 'Appearance' },
    { name: 'lineWidth', kind: 'number', default: 2, min: 1, max: 8, step: 1, group: 'Appearance' },
    { name: 'filled', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'dotColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'pastColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'lineColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'timeColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13.5, min: 10, max: 22, step: 0.5, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'timeSize', kind: 'number', default: 12, min: 9, max: 18, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 360, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'timeWidth', kind: 'number', default: 48, min: 24, max: 120, step: 4, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 20, min: 4, max: 48, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(index) => console.log(index)', '() => {}'],
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
