import type { ComponentManifest } from '../../lib/types'
import TagInput from './TagInput'

const manifest: ComponentManifest = {
  name: 'TagInput',
  component: TagInput,
  category: 'Forms',
  // Removing a tag in the preview rewrites the whole `tags` list.
  bindings: { onTagsChange: 'tags' },
  props: [
    { name: 'label', kind: 'text', default: 'Topics', group: 'Content' },
    { name: 'tags', kind: 'text', default: 'react, typescript, vite', group: 'Content' },
    { name: 'placeholder', kind: 'text', default: 'Add a topic…', group: 'Content' },
    { name: 'helperText', kind: 'text', default: '', group: 'Content' },

    { name: 'radius', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Appearance' },
    { name: 'tagRadius', kind: 'number', default: 5, min: 0, max: 999, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#d3d8de', group: 'Colors' },
    { name: 'focusColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'labelColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'tagBackground', kind: 'color', default: '#eceef1', group: 'Colors' },
    { name: 'tagColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'mutedColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'tagSize', kind: 'number', default: 12.5, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'labelSize', kind: 'number', default: 13, min: 9, max: 20, step: 1, group: 'Typography' },

    { name: 'width', kind: 'number', default: 300, min: 180, max: 1200, step: 10, group: 'Spacing' },
    { name: 'paddingX', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'paddingY', kind: 'number', default: 7, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'tagPaddingX', kind: 'number', default: 8, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'tagPaddingY', kind: 'number', default: 4, min: 0, max: 16, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 6, min: 0, max: 20, step: 1, group: 'Spacing' },

    { name: 'invalid', kind: 'boolean', default: false, group: 'State' },
    { name: 'disabled', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onTagsChange',
      kind: 'event',
      default: 'handleTagsChange',
      presets: ['handleTagsChange', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
