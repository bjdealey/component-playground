import styles from './DiffView.module.css'

export interface DiffViewProps {
  /**
   * Multi-line diff with real newlines. A leading `+` marks an addition, `-` a
   * removal, anything else is context.
   */
  diff?: string
  filename?: string
  showHeader?: boolean
  showLineNumbers?: boolean
  showMarkers?: boolean
  startLine?: number
  width?: number
  padding?: number
  radius?: number
  borderWidth?: number
  fontSize?: number
  lineHeight?: number
  background?: string
  textColor?: string
  borderColor?: string
  headerBackground?: string
  headerColor?: string
  addBackground?: string
  addColor?: string
  removeBackground?: string
  removeColor?: string
  lineNumberColor?: string
}

interface Line {
  kind: 'add' | 'remove' | 'context'
  text: string
}

export function parseDiff(diff: string): Line[] {
  return diff.split('\n').map((raw) => {
    if (raw.startsWith('+')) return { kind: 'add' as const, text: raw.slice(1) }
    if (raw.startsWith('-')) return { kind: 'remove' as const, text: raw.slice(1) }
    return { kind: 'context' as const, text: raw }
  })
}

export default function DiffView({
  diff = ' const manifest = {\n   name: "Button",\n-  props: [],\n+  props: [variant, size],\n+  bindings: { onChange: "value" },\n }',
  filename = 'Button.manifest.ts',
  showHeader = true,
  showLineNumbers = true,
  showMarkers = true,
  startLine = 1,
  width = 420,
  padding = 12,
  radius = 10,
  borderWidth = 1,
  fontSize = 12.5,
  lineHeight = 1.7,
  background = '#ffffff',
  textColor = '#3f434a',
  borderColor = '#e3e6ea',
  headerBackground = '#fbfbfc',
  headerColor = '#6b7280',
  addBackground = '#e7f8ed',
  addColor = '#14532d',
  removeBackground = '#fdeaea',
  removeColor = '#7f1d1d',
  lineNumberColor = '#c3c8d0',
}: DiffViewProps) {
  const lines = parseDiff(diff)
  const added = lines.filter((line) => line.kind === 'add').length
  const removed = lines.filter((line) => line.kind === 'remove').length

  // Removed lines don't advance the new-file line number.
  let cursor = startLine - 1

  return (
    <div
      className={styles.diff}
      style={{ width, borderRadius: radius, borderWidth, borderColor, backgroundColor: background }}
    >
      {showHeader && (
        <div
          className={styles.header}
          style={{
            padding: `${Math.round(padding * 0.65)}px ${padding}px`,
            backgroundColor: headerBackground,
            color: headerColor,
            borderBottomWidth: borderWidth,
            borderBottomColor: borderColor,
            fontSize: fontSize * 0.95,
          }}
        >
          <span className={styles.filename}>{filename}</span>
          <span className={styles.counts}>
            <span style={{ color: addColor }}>+{added}</span>
            <span style={{ color: removeColor }}>−{removed}</span>
          </span>
        </div>
      )}

      <pre className={styles.pre} style={{ padding: `${padding}px 0`, fontSize, lineHeight }}>
        {lines.map((line, index) => {
          if (line.kind !== 'remove') cursor += 1

          const background =
            line.kind === 'add' ? addBackground : line.kind === 'remove' ? removeBackground : 'transparent'
          const color =
            line.kind === 'add' ? addColor : line.kind === 'remove' ? removeColor : textColor

          return (
            <span
              key={index}
              className={styles.line}
              style={{ backgroundColor: background, color, padding: `0 ${padding}px` }}
            >
              {showLineNumbers && (
                <span className={styles.number} style={{ color: lineNumberColor }}>
                  {line.kind === 'remove' ? '' : cursor}
                </span>
              )}
              {showMarkers && (
                <span className={styles.marker}>
                  {line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ' '}
                </span>
              )}
              <span>{line.text || ' '}</span>
            </span>
          )
        })}
      </pre>
    </div>
  )
}
