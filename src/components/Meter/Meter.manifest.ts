import type { ComponentManifest } from '../../lib/types'
import Meter from './Meter'

const manifest: ComponentManifest = {
  name: 'Meter',
  component: Meter,
  category: 'Charts',
  props: [
    { name: 'value', kind: 'number', default: 68, min: 0, max: 100, step: 1, group: 'Content' },
    { name: 'max', kind: 'number', default: 100, min: 1, max: 200, step: 1, group: 'Content' },
    { name: 'label', kind: 'text', default: 'Password strength', group: 'Content' },
    { name: 'tiers', kind: 'text', default: 'Weak, Fair, Strong', group: 'Content' },
    { name: 'showTier', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showValue', kind: 'boolean', default: false, group: 'Content' },

    { name: 'segments', kind: 'number', default: 10, min: 1, max: 30, step: 1, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 3, min: 0, max: 20, step: 1, group: 'Appearance' },
    // Fractions of max at which the colour steps up.
    { name: 'lowThreshold', kind: 'number', default: 0.34, min: 0.05, max: 0.9, step: 0.01, group: 'Appearance' },
    { name: 'midThreshold', kind: 'number', default: 0.67, min: 0.1, max: 0.95, step: 0.01, group: 'Appearance' },

    // Status colours, reserved for state — not reused as series colours.
    { name: 'lowColor', kind: 'color', default: '#dc2626', group: 'Colors' },
    { name: 'midColor', kind: 'color', default: '#d97706', group: 'Colors' },
    { name: 'highColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'trackColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'labelSize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 260, min: 120, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 8, min: 3, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 3, min: 0, max: 12, step: 1, group: 'Spacing' },
  ],
}

export default manifest
