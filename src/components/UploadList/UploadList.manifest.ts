import type { ComponentManifest } from '../../lib/types'
import UploadList from './UploadList'

const manifest: ComponentManifest = {
  name: 'UploadList',
  component: UploadList,
  category: 'Files & media',
  slots: [
    {
      name: 'dropzone',
      component: 'Dropzone',
      label: 'Dropzone',
      defaults: { width: 380, minHeight: 110, files: '', showButton: true },
      // The list already passes its own width to the rows and to the fallback
      // drop area; the slot is the one path that was left behind.
      fitWidth: true,
    },
  ],
  props: [
    // Files split on ";", fields on "|": name|size|progress|status|kind.
    {
      name: 'files',
      kind: 'textarea',
      rows: 4,
      default:
        'brief.pdf|248 KB|100|done|PDF;hero@2x.png|1.4 MB|64|uploading|PNG;archive.zip|18 MB|0|failed|ZIP',
      group: 'Content',
    },
    { name: 'showDropzone', kind: 'boolean', default: true, group: 'Content' },

    // Forwarded to every row it builds. The list declared none of these, so a
    // themed page left the rows at their own defaults — square corners inside
    // round cards, and the kind badges at a fixed 34px whatever the scale.
    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'doneColor', kind: 'color', default: '#15803d', group: 'Colors' },
    { name: 'failedColor', kind: 'color', default: '#dc2626', group: 'Colors' },
    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'nameColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'metaColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },

    { name: 'nameSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'metaSize', kind: 'number', default: 11.5, min: 8, max: 16, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 380, min: 260, max: 1200, step: 10, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 10, min: 2, max: 28, step: 1, group: 'Spacing' },
    { name: 'rowPadding', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Spacing' },
    { name: 'iconSize', kind: 'number', default: 34, min: 16, max: 56, step: 1, group: 'Spacing' },
  ],
}

export default manifest
