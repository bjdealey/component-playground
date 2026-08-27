import type { ComponentManifest } from '../../lib/types'
import Modal from './Modal'

const manifest: ComponentManifest = {
  name: 'Modal',
  component: Modal,
  category: 'Feedback',
  // Overlay, ×, and Cancel all close it — flip `open` back on in the panel.
  bindings: { onClose: 'open' },
  // The overlay and × still close it; a slotted button carries its own onClick.
  slots: [
    {
      name: 'secondaryAction',
      component: 'Button',
      label: 'Secondary button',
      defaults: { variant: 'secondary' },
      childrenDefault: 'Cancel',
    },
    {
      name: 'primaryAction',
      component: 'Button',
      label: 'Primary button',
      defaults: { variant: 'danger' },
      childrenDefault: 'Delete',
    },
  ],
  props: [
    { name: 'title', kind: 'text', default: 'Delete preview?', group: 'Content' },
    {
      name: 'body',
      kind: 'text',
      default: 'This removes the deployment and its URL. Builds stay in history.',
      group: 'Content',
    },
    { name: 'showClose', kind: 'boolean', default: true, group: 'Content' },

    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'overlayOpacity', kind: 'number', default: 0.45, min: 0, max: 0.9, step: 0.05, group: 'Appearance' },
    // The preview renders inside a bounded frame rather than covering the page.
    { name: 'showFrame', kind: 'boolean', default: true, group: 'Appearance' },

    { name: 'overlayColor', kind: 'color', default: '#0f172a', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'bodyColor', kind: 'color', default: '#6b7280', group: 'Colors' },
    { name: 'frameColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 15, min: 11, max: 26, step: 1, group: 'Typography' },
    { name: 'bodySize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 320, min: 180, max: 480, step: 10, group: 'Spacing' },
    { name: 'frameWidth', kind: 'number', default: 420, min: 240, max: 640, step: 10, group: 'Spacing' },
    { name: 'frameHeight', kind: 'number', default: 260, min: 160, max: 420, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 20, min: 8, max: 40, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Spacing' },

    { name: 'open', kind: 'boolean', default: true, group: 'State' },

    {
      name: 'onClose',
      kind: 'event',
      default: 'handleClose',
      presets: ['handleClose', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
