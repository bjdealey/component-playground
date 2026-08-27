import type { ComponentManifest } from '../../lib/types'
import Accordion from './Accordion'

const manifest: ComponentManifest = {
  name: 'Accordion',
  component: Accordion,
  category: 'Navigation',
  // Click a header to open it; click the open one to close (sets -1).
  bindings: { onToggle: 'openIndex' },
  props: [
    // Sections split on ";", title and body split on "|".
    {
      name: 'items',
      kind: 'text',
      default:
        'Build|Compiles your app and caches dependencies.;Test|Runs the suite against the preview build.;Deploy|Ships it to production behind a flag.',
      group: 'Content',
    },
    { name: 'openIndex', kind: 'number', default: 0, min: -1, max: 8, step: 1, group: 'Content' },
    { name: 'chevron', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'activeColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'titleWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },
    // Above zero, each section becomes its own separated card.
    { name: 'gap', kind: 'number', default: 0, min: 0, max: 20, step: 1, group: 'Spacing' },

    {
      name: 'onToggle',
      kind: 'event',
      default: 'handleToggle',
      presets: ['handleToggle', '(value) => console.log(value)', '() => {}'],
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
