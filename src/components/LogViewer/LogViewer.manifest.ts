import type { ComponentManifest } from '../../lib/types'
import LogViewer from './LogViewer'

const manifest: ComponentManifest = {
  name: 'LogViewer',
  component: LogViewer,
  category: 'Data display',
  props: [
    // One line each, as `time|level|message`. Levels: debug, info, ok, warn, error.
    {
      name: 'lines',
      kind: 'textarea',
      rows: 6,
      default:
        '09:14:02|info|Installing dependencies\n09:14:31|ok|Lockfile unchanged, cache hit\n09:15:08|warn|Peer dependency mismatch for react-dom\n09:15:44|error|Type error in src/lib/codegen.ts:42\n09:15:44|debug|Exited with code 1',
      group: 'Content',
    },
    { name: 'showTime', kind: 'boolean', default: true, group: 'Content' },
    { name: 'showLevel', kind: 'boolean', default: true, group: 'Content' },
    { name: 'wrap', kind: 'boolean', default: false, group: 'Content' },

    { name: 'radius', kind: 'number', default: 10, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#17181c', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#2b2d34', group: 'Colors' },
    { name: 'textColor', kind: 'color', default: '#e6e8ec', group: 'Colors' },
    { name: 'timeColor', kind: 'color', default: '#5b616b', group: 'Colors' },

    { name: 'fontSize', kind: 'number', default: 12, min: 9, max: 18, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 480, min: 280, max: 1200, step: 10, group: 'Spacing' },
    { name: 'height', kind: 'number', default: 180, min: 80, max: 400, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 12, min: 4, max: 28, step: 1, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 5, min: 0, max: 20, step: 1, group: 'Spacing' },
  ],
}

export default manifest
