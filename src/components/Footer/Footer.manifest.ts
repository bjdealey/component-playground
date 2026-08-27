import type { ComponentManifest } from '../../lib/types'
import Footer from './Footer'

const manifest: ComponentManifest = {
  name: 'Footer',
  component: Footer,
  category: 'Content',
  props: [
    // Columns split on ";", each "Heading|link,link,link".
    {
      name: 'columns',
      kind: 'textarea',
      rows: 4,
      default:
        'Product|Previews,Deploys,Analytics;Developers|Docs,API,Changelog;Company|About,Careers,Contact',
      group: 'Content',
    },
    { name: 'brand', kind: 'text', default: '◆ Playground', group: 'Content' },
    { name: 'copyright', kind: 'text', default: '© 2026 Playground Ltd.', group: 'Content' },
    { name: 'showDivider', kind: 'boolean', default: true, group: 'Content' },
    { name: 'radius', kind: 'number', default: 0, min: 0, max: 28, step: 1, group: 'Appearance' },
    { name: 'dividerThickness', kind: 'number', default: 1, min: 0, max: 6, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: 'transparent', group: 'Colors' },
    { name: 'headingColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'linkColor', kind: 'color', default: '#3f434a', group: 'Colors' },
    { name: 'brandColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'dividerColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'headingSize', kind: 'number', default: 11.5, min: 9, max: 16, step: 0.5, group: 'Typography' },
    { name: 'headingWeight', kind: 'number', default: 600, min: 300, max: 800, step: 100, group: 'Typography' },
    { name: 'linkSize', kind: 'number', default: 13, min: 9, max: 18, step: 0.5, group: 'Typography' },
    { name: 'brandSize', kind: 'number', default: 13.5, min: 10, max: 22, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 520, min: 320, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 24, min: 8, max: 48, step: 2, group: 'Spacing' },
    { name: 'columnGap', kind: 'number', default: 40, min: 12, max: 80, step: 2, group: 'Spacing' },
    { name: 'rowGap', kind: 'number', default: 8, min: 0, max: 24, step: 1, group: 'Spacing' },

    // Links get the underline they've always had, plus the other half of the
    // usual link idiom — a colour shift. No brightness: these sit on whatever
    // background the page supplies, and a filter would drag the text with it.
    { name: 'hovered', kind: 'boolean', default: false, group: 'Hover' },
    { name: 'hoverUnderline', kind: 'boolean', default: true, group: 'Hover' },
    { name: 'hoverTextColor', kind: 'color', default: '', group: 'Hover' },
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
