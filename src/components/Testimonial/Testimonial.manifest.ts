import type { ComponentManifest } from '../../lib/types'
import Testimonial from './Testimonial'

const manifest: ComponentManifest = {
  name: 'Testimonial',
  component: Testimonial,
  category: 'Content',
  // The avatar is a real Avatar, nested as children. Its controls come from
  // Avatar's own manifest rather than being restated here.
  slots: [
    {
      name: 'children',
      component: 'Avatar',
      label: 'Avatar',
      defaults: { initials: 'AK', size: 36 },
    },
    {
      name: 'rating',
      component: 'Rating',
      label: 'Rating',
      defaults: { value: 5, size: 14, gap: 2 },
    },
  ],
  props: [
    {
      name: 'quote',
      kind: 'text',
      default: 'We replaced a week of design QA with a link. Everyone reviews the same build now.',
      group: 'Content',
    },
    { name: 'name', kind: 'text', default: 'Ana Kowalski', group: 'Content' },
    { name: 'role', kind: 'text', default: 'Staff Engineer, Northwind', group: 'Content' },
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },
    { name: 'mark', kind: 'text', default: '“', group: 'Content' },
    { name: 'showMark', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showRating', kind: 'boolean', default: false, group: 'Content' },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'quoteColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'nameColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'roleColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'quoteSize', kind: 'number', default: 14.5, min: 10, max: 26, step: 0.5, group: 'Typography' },
    { name: 'nameSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },
    { name: 'markSize', kind: 'number', default: 40, min: 16, max: 80, step: 2, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 220, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 22, min: 8, max: 48, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 14, min: 2, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
