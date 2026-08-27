import type { ComponentManifest } from '../../lib/types'
import Dropzone from './Dropzone'

const manifest: ComponentManifest = {
  name: 'Dropzone',
  component: Dropzone,
  category: 'Files & media',
  slots: [
    {
      name: 'action',
      component: 'Button',
      label: 'Browse button',
      defaults: { variant: 'outline', paddingX: 12, paddingY: 6, fontSize: 12.5 },
      childrenDefault: 'Browse files',
    },
  ],
  props: [
    { name: 'glyph', kind: 'text', default: '⬆', group: 'Content' },
    { name: 'title', kind: 'text', default: 'Drop files to upload', group: 'Content' },
    { name: 'hint', kind: 'text', default: 'PNG, JPG or PDF up to 10 MB', group: 'Content' },
    { name: 'showButton', kind: 'boolean', default: true, group: 'Content' },
    // Files split on ";", each "name|size". Empty hides the list.
    { name: 'files', kind: 'text', default: 'brief.pdf|248 KB;hero@2x.png|1.4 MB', group: 'Content' },

    { name: 'dashed', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 2, min: 0, max: 6, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#fbfbfc', group: 'Colors' },
    { name: 'activeBackground', kind: 'color', default: '#eef2ff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'activeBorderColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'hintColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },

    { name: 'glyphSize', kind: 'number', default: 22, min: 10, max: 48, step: 1, group: 'Typography' },
    { name: 'titleSize', kind: 'number', default: 14, min: 10, max: 24, step: 1, group: 'Typography' },
    { name: 'hintSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'minHeight', kind: 'number', default: 150, min: 80, max: 300, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 24, min: 8, max: 56, step: 2, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    // Stand-in for the drag-over state.
    { name: 'active', kind: 'boolean', default: false, group: 'State' },
    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onBrowse',
      kind: 'event',
      default: 'handleBrowse',
      presets: ['handleBrowse', '() => {}'],
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
