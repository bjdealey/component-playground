import type { ComponentManifest } from '../../lib/types'
import ChatThread from './ChatThread'

const manifest: ComponentManifest = {
  name: 'ChatThread',
  component: ChatThread,
  category: 'Content',
  slots: [
    {
      name: 'composer',
      component: 'ChatInput',
      label: 'Composer',
      // Sized to sit inside the panel's padding; fitWidth keeps the generated
      // page code in step when the thread is resized on the canvas.
      defaults: {
        width: 508,
        showHint: false,
        placeholder: 'Reply to Claude…',
        radius: 12,
      },
      fitWidth: true,
    },
  ],
  props: [
    {
      name: 'transcript',
      kind: 'textarea',
      rows: 5,
      default: [
        'user: How do I center a div?',
        'assistant: The simplest way is flexbox — set the parent to `display: flex`, then `justify-content: center` and `align-items: center`.',
        'user: Both axes at once?',
        'assistant: Those two cover both. For a one-liner, `display: grid; place-items: center` does the same thing.',
      ].join('\n'),
      group: 'Content',
    },
    { name: 'title', kind: 'text', default: 'Claude', group: 'Content' },
    { name: 'typing', kind: 'boolean', default: false, group: 'Content' },
    { name: 'showHeader', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showAvatars', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 16, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'bubbleRadius', kind: 'number', default: 14, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 3, step: 1, group: 'Appearance' },
    { name: 'userTint', kind: 'number', default: 14, min: 0, max: 40, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 14, min: 11, max: 20, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 540, min: 300, max: 760, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 420, min: 240, max: 640, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 16, min: 4, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 16, min: 4, max: 32, step: 1, group: 'Spacing' },
  ],
}

export default manifest
