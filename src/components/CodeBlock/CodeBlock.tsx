import IconButton from '../IconButton/IconButton'
import styles from './CodeBlock.module.css'

export interface CodeBlockProps {
  /** Multi-line source. Real newlines. */
  code?: string
  filename?: string
  language?: string
  showHeader?: boolean
  showLineNumbers?: boolean
  startLine?: number
  highlightLine?: number
  wrap?: boolean
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
  lineNumberColor?: string
  highlightColor?: string
  showCopy?: boolean
  copyGlyph?: string
  /** Fires from the header's copy button, with the code as its argument. */
  onCopy?: (code: string) => void
}

export default function CodeBlock({
  code = 'const manifest = {\n  name: "Button",\n  props: [],\n}',
  filename = 'Button.manifest.ts',
  language = 'ts',
  showHeader = true,
  showLineNumbers = true,
  startLine = 1,
  highlightLine = 0,
  wrap = false,
  width = 400,
  padding = 14,
  radius = 10,
  borderWidth = 1,
  fontSize = 12.5,
  lineHeight = 1.65,
  background = '#17181c',
  textColor = '#e6e8ec',
  borderColor = '#2b2d34',
  headerBackground = '#1f2126',
  headerColor = '#9aa1ab',
  lineNumberColor = '#5b616b',
  highlightColor = '#2a2d36',
  showCopy = true,
  copyGlyph = '⧉',
  onCopy,
}: CodeBlockProps) {
  const lines = code.split('\n')
  const gutter = String(startLine + lines.length - 1).length

  return (
    <div
      className={styles.block}
      style={{
        width,
        borderRadius: radius,
        borderWidth,
        borderColor,
        backgroundColor: background,
      }}
    >
      {showHeader && (filename || language) && (
        <div
          className={styles.header}
          style={{
            padding: `${Math.round(padding * 0.6)}px ${padding}px`,
            backgroundColor: headerBackground,
            color: headerColor,
            borderBottomWidth: borderWidth,
            borderBottomColor: borderColor,
            fontSize: fontSize * 0.92,
          }}
        >
          <span className={styles.filename}>{filename}</span>
          <span className={styles.headerEnd}>
            {language && <span className={styles.language}>{language}</span>}
            {showCopy && onCopy && (
              <IconButton
                glyph={copyGlyph}
                label="Copy code"
                size={20}
                color={headerColor}
                fontScale={0.8}
                onClick={() => onCopy(code)}
              />
            )}
          </span>
        </div>
      )}

      <pre
        className={styles.pre}
        style={{ padding, fontSize, lineHeight, color: textColor }}
      >
        {lines.map((line, index) => {
          const number = startLine + index
          const highlighted = number === highlightLine

          return (
            <span
              key={index}
              className={styles.line}
              style={{
                backgroundColor: highlighted ? highlightColor : undefined,
                // Bleed the highlight to the block's edges.
                margin: highlighted ? `0 -${padding}px` : undefined,
                padding: highlighted ? `0 ${padding}px` : undefined,
                whiteSpace: wrap ? 'pre-wrap' : 'pre',
              }}
            >
              {showLineNumbers && (
                <span
                  className={styles.number}
                  style={{ color: lineNumberColor, minWidth: `${gutter}ch` }}
                >
                  {number}
                </span>
              )}
              <span className={styles.text}>{line || ' '}</span>
            </span>
          )
        })}
      </pre>
    </div>
  )
}
