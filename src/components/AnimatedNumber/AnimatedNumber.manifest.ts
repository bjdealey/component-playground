import type { ComponentManifest } from '../../lib/types'
import AnimatedNumber from './AnimatedNumber'

const manifest: ComponentManifest = {
  name: 'AnimatedNumber',
  component: AnimatedNumber,
  category: 'Data display',
  props: [
    { name: 'value', kind: 'number', default: 2847, min: 0, max: 1000000, step: 1, group: 'Content' },
    { name: 'prefix', kind: 'text', default: '', group: 'Content' },
    { name: 'suffix', kind: 'text', default: '', group: 'Content' },
    { name: 'decimals', kind: 'number', default: 0, min: 0, max: 4, step: 1, group: 'Content' },
    { name: 'separator', kind: 'boolean', default: true, group: 'Content' },

    { name: 'duration', kind: 'number', default: 900, min: 0, max: 4000, step: 50, group: 'Motion' },

    { name: 'color', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 44, min: 14, max: 96, step: 1, group: 'Typography' },
    { name: 'fontWeight', kind: 'number', default: 700, min: 300, max: 800, step: 100, group: 'Typography' },
  ],
}

export default manifest
