import type { CSSProperties } from 'react'
import IconButton from '../IconButton/IconButton'
import Slider from '../Slider/Slider'
import styles from './VideoPlayer.module.css'

export interface VideoPlayerProps {
  title?: string
  playing?: boolean
  position?: number
  duration?: number
  aspect?: '16:9' | '4:3' | '1:1'
  width?: number
  padding?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  buttonSize?: number
  titleSize?: number
  timeSize?: number
  posterColor?: string
  background?: string
  borderColor?: string
  titleColor?: string
  timeColor?: string
  accentColor?: string
  trackColor?: string
  onTogglePlay?: (playing: boolean) => void
  onSeek?: (position: number) => void
}

const RATIOS: Record<string, string> = { '16:9': '16 / 9', '4:3': '4 / 3', '1:1': '1 / 1' }

function clock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds))
  const minutes = Math.floor(total / 60)
  return `${minutes}:${String(total % 60).padStart(2, '0')}`
}

export default function VideoPlayer({
  title = 'Preview deploys in 90 seconds',
  playing = false,
  position = 24,
  duration = 92,
  aspect = '16:9',
  width = 420,
  padding = 12,
  radius = 14,
  borderWidth = 1,
  bordered = true,
  buttonSize = 54,
  titleSize = 13.5,
  timeSize = 11.5,
  posterColor = '#0f141c',
  background = '#ffffff',
  borderColor = '#e3e6ea',
  titleColor = '#17191c',
  timeColor = '#9aa1ab',
  accentColor = '#4f46e5',
  trackColor = '#e3e6ea',
  onTogglePlay,
  onSeek,
}: VideoPlayerProps) {
  const root: CSSProperties = {
    width,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    backgroundColor: background,
  }
  const innerRadius = Math.max(0, radius - 2)

  return (
    <div className={styles.player} style={root}>
      <div
        className={styles.frame}
        style={{
          aspectRatio: RATIOS[aspect] ?? RATIOS['16:9'],
          background: posterColor,
          borderTopLeftRadius: innerRadius,
          borderTopRightRadius: innerRadius,
        }}
      >
        <IconButton
          glyph={playing ? '❚❚' : '▶'}
          label={playing ? 'Pause' : 'Play'}
          size={buttonSize}
          shape="circle"
          background={accentColor}
          color="#ffffff"
          hoverBackground={accentColor}
          fontScale={playing ? 0.32 : 0.38}
          onClick={() => onTogglePlay?.(!playing)}
        />
      </div>

      <div className={styles.bar} style={{ padding, gap: padding * 0.6 }}>
        {title && (
          <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
            {title}
          </span>
        )}

        <div className={styles.seek} style={{ gap: padding * 0.6 }}>
          <span className={styles.time} style={{ fontSize: timeSize, color: timeColor }}>
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
          <span className={styles.time} style={{ fontSize: timeSize, color: timeColor }}>
            {clock(duration)}
          </span>
          <button
            type="button"
            className={styles.fullscreen}
            style={{ color: timeColor }}
            aria-label="Fullscreen"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
