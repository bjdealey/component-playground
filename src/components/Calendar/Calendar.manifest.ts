import type { ComponentManifest } from '../../lib/types'
import Calendar from './Calendar'

const manifest: ComponentManifest = {
  name: 'Calendar',
  component: Calendar,
  category: 'Data display',
  // Click a day in the preview to select it.
  bindings: { onSelect: 'selectedDay' },
  props: [
    // Fixed rather than derived from the clock, so the preview is deterministic.
    { name: 'year', kind: 'number', default: 2026, min: 1970, max: 2100, step: 1, group: 'Content' },
    { name: 'month', kind: 'number', default: 7, min: 1, max: 12, step: 1, group: 'Content' },
    { name: 'selectedDay', kind: 'number', default: 15, min: 0, max: 31, step: 1, group: 'Content' },
    { name: 'todayDay', kind: 'number', default: 25, min: 0, max: 31, step: 1, group: 'Content' },
    {
      name: 'weekStartsOn',
      kind: 'select',
      options: ['sunday', 'monday'],
      default: 'monday',
      group: 'Content',
    },
    { name: 'showHeader', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showOutsideDays', kind: 'boolean', default: true, group: 'Content' },

    { name: 'cellSize', kind: 'number', default: 34, min: 20, max: 60, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 8, min: 0, max: 30, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'padding', kind: 'number', default: 0, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'headerWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },

    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#c3c8d0', group: 'Colors' },
    { name: 'headerColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'weekdayColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'selectedBackground', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'selectedTextColor', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'todayRingColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'headerSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'weekdaySize', kind: 'number', default: 11, min: 8, max: 16, step: 1, group: 'Typography' },

    { name: 'gap', kind: 'number', default: 2, min: 0, max: 12, step: 1, group: 'Spacing' },

    {
      name: 'onSelect',
      kind: 'event',
      default: 'handleSelect',
      presets: ['handleSelect', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverBackground', kind: 'color', default: 'rgba(15, 23, 42, 0.05)', group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
    {
      name: 'hoverBrightness',
      kind: 'number',
      default: 0.94,
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
