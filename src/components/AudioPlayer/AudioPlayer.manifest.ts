import type { ComponentManifest } from '../../lib/types'
import AudioPlayer from './AudioPlayer'

const manifest: ComponentManifest = {
  name: 'AudioPlayer',
  component: AudioPlayer,
  category: 'Files & media',
  // Press play, or drag the seek bar — both write back.
  bindings: { onTogglePlay: 'playing', onSeek: 'position' },
  props: [
    { name: 'title', kind: 'text', default: 'Build pipeline explained', group: 'Content' },
    { name: 'artist', kind: 'text', default: 'Deploy Notes · Episode 12', group: 'Content' },
    { name: 'position', kind: 'number', default: 96, min: 0, max: 600, step: 1, group: 'Content' },
    { name: 'duration', kind: 'number', default: 265, min: 30, max: 600, step: 5, group: 'Content' },

    { name: 'bordered', kind: 'boolean', default: true, group: 'Appearance' },
    { name: 'radius', kind: 'number', default: 12, min: 0, max: 32, step: 1, group: 'Appearance' },
    { name: 'borderWidth', kind: 'number', default: 1, min: 0, max: 4, step: 1, group: 'Appearance' },
    { name: 'buttonSize', kind: 'number', default: 38, min: 24, max: 64, step: 1, group: 'Appearance' },

    { name: 'background', kind: 'color', default: '#ffffff', group: 'Colors' },
    { name: 'borderColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },
    { name: 'titleColor', kind: 'color', default: '#17191c', group: 'Colors' },
    { name: 'artistColor', kind: 'color', default: '#9aa1ab', group: 'Colors' },
    { name: 'accentColor', kind: 'color', default: '#4f46e5', group: 'Colors' },
    { name: 'trackColor', kind: 'color', default: '#e3e6ea', group: 'Colors' },

    { name: 'titleSize', kind: 'number', default: 13.5, min: 10, max: 20, step: 0.5, group: 'Typography' },
    { name: 'timeSize', kind: 'number', default: 11.5, min: 9, max: 16, step: 0.5, group: 'Typography' },

    { name: 'width', kind: 'number', default: 340, min: 240, max: 1200, step: 10, group: 'Spacing' },
    { name: 'padding', kind: 'number', default: 14, min: 4, max: 32, step: 1, group: 'Spacing' },
    { name: 'gap', kind: 'number', default: 12, min: 2, max: 28, step: 1, group: 'Spacing' },

    { name: 'playing', kind: 'boolean', default: false, group: 'State' },

    {
      name: 'onTogglePlay',
      kind: 'event',
      default: 'handleTogglePlay',
      presets: ['handleTogglePlay', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
    {
      name: 'onSeek',
      kind: 'event',
      default: 'handleSeek',
      presets: ['handleSeek', '(value) => console.log(value)', '() => {}'],
      group: 'Events',
    },
  ],
}

export default manifest
