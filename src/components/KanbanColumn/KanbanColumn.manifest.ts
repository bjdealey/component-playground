import type { ComponentManifest } from '../../lib/types'
import KanbanColumn from './KanbanColumn'

const manifest: ComponentManifest = {
  name: 'KanbanColumn',
  component: KanbanColumn,
  category: 'Content',
  props: [
    { name: 'title', kind: 'text', default: 'In review', group: 'Content' },
    // Cards split on ";", title and body on "|".
    {
      name: 'cards',
      kind: 'textarea',
      rows: 5,
      default:
        'Palette validation|Run the six checks against the dark surface.;Slot contract|Document children vs element props.;Bundle split|Move raw sources behind a dynamic import.',
      group: 'Content',
    },
    { name: 'showCount', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAdd', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'cardRadius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#f6f7f9', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'cardBackground', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'cardBorderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'cardTitleSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'cardBodySize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 180, max: 420, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 28, step: 1, group: 'Spacing' },
    { name: 'cardPadding', kind: 'number', default: 12, min: 4, max: 28, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 2, max: 24, step: 1, group: 'Spacing' },
  ],
}

export default manifest
