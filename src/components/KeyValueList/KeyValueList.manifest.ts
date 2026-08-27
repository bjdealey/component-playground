import type { ComponentManifest } from '../../lib/types'
import KeyValueList from './KeyValueList'

const manifest: ComponentManifest = {
  name: 'KeyValueList',
  component: KeyValueList,
  category: 'Data display',
  props: [
    // Rows split on ";", key and value split on "|".
    {
      name: 'items',
      kind: 'textarea',
      rows: 5,
      default: 'Environment|Production;Region|eu-west-2;Build|#4f2a91c;Node|22.11.0;Deployed|12m ago',
      group: 'Content',
    },
    {
      name: 'layout',
      kind: 'select',
      options: ['rows', 'stacked'],
      default: 'rows',
      group: 'Content',
    },
    { name: 'dividers', kind: 'boolean', default: true, group: 'Content' },

    { name: 'keyColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'valueColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'dividerColor', kind: 'color', default: '#eceef1', group: 'Colors' },

    { name: 'keySize', kind: 'number', default: 12.5, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'valueSize', kind: 'number', default: 13, min: 9, max: 20, step: 0.5, group: 'Typography' },
    { name: 'monoValues', kind: 'boolean', default: true, group: 'Typography' },
    { name: 'uppercaseKeys', kind: 'boolean', default: false, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 200, max: 1200, step: 10, group: 'Spacing' },
    { name: 'keyWidth', kind: 'number', default: 120, min: 60, max: 240, step: 5, group: 'Spacing' },
    { name: 'rowPaddingY', kind: 'number', default: 9, min: 0, max: 24, step: 1, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 0, min: 0, max: 20, step: 1, group: 'Spacing' },
    { name: 'columnGap', kind: 'number', default: 16, min: 0, max: 40, step: 1, group: 'Spacing' },
  ],
}

export default manifest
