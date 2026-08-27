import Badge from '../Badge/Badge'
import styles from './LogViewer.module.css'

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

const LEVEL_TONE: Record<string, Tone> = {
  debug: 'neutral',
  info: 'info',
  ok: 'success',
  warn: 'warning',
  error: 'danger',
}

export interface LogViewerProps {
  /** Lines separated by a newline, each `time|level|message`. */
  lines?: string
  showTime?: boolean
  showLevel?: boolean
  wrap?: boolean
  width?: number
  height?: number
  padding?: number
  rowGap?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  background?: string
  borderColor?: string
  textColor?: string
  timeColor?: string
}

interface Line {
  time: string
  level: string
  message: string
}

export function parseLines(lines: string): Line[] {
  return lines
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row.length > 0)
    .map((row) => {
      const [time = '', level = '', ...rest] = row.split('|')
      return { time: time.trim(), level: level.trim(), message: rest.join('|').trim() }
    })
}

/** Level tags are real `Badge`s, so a log level looks like a status anywhere. */
export default function LogViewer({
  lines = '09:14:02|info|Installing dependencies\n09:14:31|ok|Lockfile unchanged, cache hit\n09:15:08|warn|Peer dependency mismatch for react-dom\n09:15:44|error|Type error in src/lib/codegen.ts:42\n09:15:44|debug|Exited with code 1',
  showTime = true,
  showLevel = true,
  wrap = false,
  width = 480,
  height = 180,
  padding = 12,
  rowGap = 5,
  radius = 10,
  borderWidth = 1,
  fontSize = 12,
  background = '#17181c',
  borderColor = '#2b2d34',
  textColor = '#e6e8ec',
  timeColor = '#5b616b',
}: LogViewerProps) {
  const rows = parseLines(lines)

  return (
    <div
      className={styles.viewer}
      style={{ width, height, padding, borderRadius: radius, borderWidth, borderColor, backgroundColor: background }}
    >
      <div className={styles.rows} style={{ gap: rowGap }}>
        {rows.map((row, index) => (
          <div key={index} className={styles.row} style={{ fontSize }}>
            {showTime && row.time && (
              <span className={styles.time} style={{ color: timeColor }}>
                {row.time}
              </span>
            )}
            {showLevel && row.level && (
              <span className={styles.level}>
                <Badge
                  tone={LEVEL_TONE[row.level.toLowerCase()] ?? 'neutral'}
                  fontSize={fontSize * 0.82}
                  paddingX={6}
                  paddingY={2}
                  radius={4}
                  uppercase
                >
                  {row.level}
                </Badge>
              </span>
            )}
            <span
              className={styles.message}
              style={{ color: textColor, whiteSpace: wrap ? 'pre-wrap' : 'pre' }}
            >
              {row.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
