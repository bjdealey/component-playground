import type { ComponentManifest } from '../../lib/types'
import PasswordField from './PasswordField'

const manifest: ComponentManifest = {
  name: 'PasswordField',
  component: PasswordField,
  category: 'Forms',
  // Type in the preview; the strength meter follows what you type.
  bindings: { onChange: 'value', onToggleReveal: 'revealed' },
  props: [
    { name: 'label', kind: 'text', default: 'Password', group: 'Content' },
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: '••••••••••', group: 'Content' },
    {
      name: 'helperText',
      kind: 'text',
      default: 'At least 12 characters, one number and one symbol.',
      group: 'Content',
    },
    { name: 'strengthLabel', kind: 'text', default: 'Strength', group: 'Content' },
    { name: 'tiers', kind: 'text', default: 'Weak, Fair, Strong', group: 'Content' },
    { name: 'showStrength', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showReveal', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 6, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'segments', kind: 'number', default: 12, min: 1, max: 30, step: 1, group: 'Appearance' },

    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'width', kind: 'number', default: 300, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    { name: 'revealed', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onChange',
      kind: 'event',
      default: 'handleChange',
      presets: ['handleChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onToggleReveal',
      kind: 'event',
      default: 'handleToggleReveal',
      presets: ['handleToggleReveal', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
