import type { ComponentManifest } from '../../lib/types'
import SkeletonCard from './SkeletonCard'

const manifest: ComponentManifest = {
  name: 'SkeletonCard',
  component: SkeletonCard,
  category: 'Feedback',
  props: [
    { name: 'showAvatar', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showMedia', kind: 'boolean', default: false, group: 'Content' },
    { name: 'lines', kind: 'number', default: 3, min: 1, max: 8, step: 1, group: 'Content' },

    { name: 'shimmer', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'speed', kind: 'number', default: 1.4, min: 0.4, max: 4, step: 0.1, group: 'Appearance' },
    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'baseColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'highlightColor', kind: 'color', default: '#f4f5f7', group: 'Colors' },

    { name: 'width', kind: 'number', default: 300, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'mediaHeight', kind: 'number', default: 110, min: 40, max: 240, step: 10, group: 'Spacing' },
    { name: 'avatarSize', kind: 'number', default: 36, min: 20, max: 72, step: 2, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 16, min: 4, max: 36, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },
  ],
}

export default manifest
