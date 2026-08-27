import type { CSSProperties } from 'react'
import IconButton from '../IconButton/IconButton'
import Slider from '../Slider/Slider'
import styles from './AudioPlayer.module.css'

export interface AudioPlayerProps {
  title?: string
  artist?: string
  playing?: boolean
  position?: number
  duration?: number
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  buttonSize?: number
  titleSize?: number
  timeSize?: number
  background?: string
  borderColor?: string
  titleColor?: string
  artistColor?: string
  accentColor?: string
  trackColor?: string
  onTogglePlay?: (playing: boolean) => void
  onSeek?: (position: number) => void
}

function clock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds))
  const minutes = Math.floor(total / 60)
  return `${minutes}:${String(total % 60).padStart(2, '0')}`
}

export default function AudioPlayer({
  title = 'Build pipeline explained',
  artist = 'Deploy Notes · Episode 12',
  playing = false,
  position = 96,
  duration = 265,
  width = 340,
  padding = 14,
  gap = 12,
  radius = 12,
  borderWidth = 1,
  bordered = true,
  buttonSize = 38,
  titleSize = 13.5,
  timeSize = 11.5,
  background = '#ffffff',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  artistColor = '#9aa1ab',
  accentColor = '#4f46e5',
  trackColor = '#e3e6ea',
  onTogglePlay,
  onSeek,
}: AudioPlayerProps) {
  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
  }

  return (
    <div className={styles.player} style={root}>
      <IconButton
        glyph={playing ? '❚❚' : '▶'}
        label={playing ? 'Pause' : 'Play'}
        size={buttonSize}
        shape="circle"
        background={accentColor}
        color="#ffffff"
        hoverBackground={accentColor}
        fontScale={playing ? 0.34 : 0.4}
        onClick={() => onTogglePlay?.(!playing)}
      />

      <div className={styles.body} style={{ gap: gap / 3 }}>
        <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
          {title}
        </span>
        {artist && (
          <span className={styles.artist} style={{ fontSize: timeSize, color: artistColor }}>
            {artist}
          </span>
        )}

        <div className={styles.seek} style={{ gap: gap / 2 }}>
          <span className={styles.time} style={{ fontSize: timeSize, color: artistColor }}>
            {clock(position)}
          </span>
          <span className={styles.slider}>
            <Slider
              label=""
              value={position}
              min={0}
              max={duration}
              showValue={false}
              trackHeight={4}
              thumbSize={12}
              fillColor={accentColor}
              thumbBorderColor={accentColor}
              trackColor={trackColor}
              gap={0}
              onChange={onSeek}
            />
          </span>
          <span className={styles.time} style={{ fontSize: timeSize, color: artistColor }}>
            {clock(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}
