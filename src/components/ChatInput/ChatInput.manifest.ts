import type { ComponentManifest } from '../../lib/types'
import ChatInput from './ChatInput'

const manifest: ComponentManifest = {
  name: 'ChatInput',
  component: ChatInput,
  category: 'Forms',
  bindings: { onChange: 'value' },
  props: [
    { name: 'value', kind: 'text', default: '', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'Message Claude…', group: 'Content' },
    {
      name: 'hint',
      kind: 'text',
      default: 'Claude can make mistakes. Check important info.',
      group: 'Content',
    },
    { name: 'showHint', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAttach', kind: 'boolean', default: true, group: 'Content' },
    { name: 'streaming', kind: 'boolean', default: false, group: 'Content' },
    { name: 'disabled', kind: 'boolean', default: false, group: 'Content' },

    { name: 'radius', kind: 'number', default: 16, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'placeholderColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#6b7280', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 560, min: 240, max: 760, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 10, min: 4, max: 20, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'buttonSize', kind: 'number', default: 32, min: 24, max: 48, step: 1, group: 'Spacing' },

    {
      name: 'onSend',
      kind: 'event',
      default: 'handleSend',
      presets: ['handleSend', '(text) => console.log(text)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
