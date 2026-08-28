import type { CSSProperties } from 'react'
import styles from './FAQ.module.css'

export interface FAQProps {
  title?: string
  subtitle?: string
  /** One Q&A per line: `Question | Answer`. */
  items?: string
  /** Index of the open answer; `-1` closes them all. */
  openIndex?: number
  align?: 'left' | 'center'
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  titleSize?: number
  questionSize?: number
  answerSize?: number
  background?: string
  titleColor?: string
  textColor?: string
  bodyColor?: string
  accentColor?: string
  borderColor?: string
  onToggle?: (index: number) => void
}

interface QA {
  question: string
  answer: string
}

function parseItems(items: string): QA[] {
  return items
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [question, ...rest] = line.split('|')
      return { question: question.trim(), answer: rest.join('|').trim() }
    })
}

const DEFAULT_ITEMS = [
  'Is it free? | Yes — every component is source you own, dropped straight into your repo.',
  "Do I need a UI framework? | No. It's plain React and CSS Modules, nothing else to install.",
  'Does it work offline? | Completely. Nothing phones home, so it runs on a plane.',
  'Can I theme it all at once? | Yes — one shared theme retints, re-rounds and re-scales every component.',
].join('\n')

export default function FAQ({
  title = 'Frequently asked questions',
  subtitle = 'Everything you need before you drop it in.',
  items = DEFAULT_ITEMS,
  openIndex = 0,
  align = 'left',
  width = 520,
  padding = 18,
  gap = 10,
  radius = 12,
  borderWidth = 1,
  titleSize = 22,
  questionSize = 14.5,
  answerSize = 13.5,
  background = '#ffffff',
  titleColor = '#17191c',
  textColor = '#17191c',
  bodyColor = '#6b7280',
  accentColor = '#4f46e5',
  borderColor = '#e3e6ea',
  onToggle,
}: FAQProps) {
  const rows = parseItems(items)

  const root: CSSProperties = { width, gap: gap * 1.6, textAlign: align }

  return (
    <section className={styles.faq} style={root}>
      {(title || subtitle) && (
        <header className={styles.head} style={{ alignItems: align === 'center' ? 'center' : 'flex-start' }}>
          {title && (
            <h2 className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={styles.subtitle} style={{ color: bodyColor }}>
              {subtitle}
            </p>
          )}
        </header>
      )}

      <div className={styles.list} style={{ gap }}>
        {rows.map((row, index) => {
          const open = index === openIndex
          return (
            <div
              key={`${row.question}-${index}`}
              className={styles.item}
              style={{
                borderRadius: radius,
                borderWidth,
                borderColor,
                borderStyle: borderWidth > 0 ? 'solid' : undefined,
                background,
              }}
            >
              <button
                type="button"
                className={styles.question}
                style={{ padding, textAlign: 'left' }}
                aria-expanded={open}
                onClick={() => onToggle?.(open ? -1 : index)}
              >
                <span
                  style={{
                    fontSize: questionSize,
                    fontWeight: 600,
                    color: open ? accentColor : textColor,
                  }}
                >
                  {row.question}
                </span>
                <span
                  className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                  style={{ borderTopColor: open ? accentColor : bodyColor }}
                  aria-hidden="true"
                />
              </button>

              {open && row.answer && (
                <div
                  className={styles.answer}
                  style={{ padding: `0 ${padding}px ${padding}px`, fontSize: answerSize, color: bodyColor }}
                >
                  {row.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
