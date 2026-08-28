import type { CSSProperties } from 'react'
import styles from './ComparisonTable.module.css'

export interface ComparisonTableProps {
  /** Column headers, comma-separated. */
  plans?: string
  /** One feature per line: `name | plan1 | plan2 | …`. A cell of yes/no draws a
   *  check or a dash; anything else prints as text (e.g. `5 GB`, `Unlimited`). */
  features?: string
  firstColLabel?: string
  highlightIndex?: number
  highlightLabel?: string
  showBadge?: boolean
  width?: number
  radius?: number
  borderWidth?: number
  rowPadding?: number
  fontSize?: number
  background?: string
  textColor?: string
  headerColor?: string
  mutedColor?: string
  accentColor?: string
  selectedBackground?: string
  borderColor?: string
  onSelectPlan?: (index: number) => void
}

const YES = new Set(['yes', 'true', 'y', '✓', '✔', 'included', 'incl'])
const NO = new Set(['no', 'false', 'n', '-', '–', '—', '', 'x', '✕', '✗'])

type Cell = { kind: 'check' } | { kind: 'dash' } | { kind: 'text'; text: string }

function classify(raw: string): Cell {
  const value = raw.trim()
  const lower = value.toLowerCase()
  if (YES.has(lower)) return { kind: 'check' }
  if (NO.has(lower)) return { kind: 'dash' }
  return { kind: 'text', text: value }
}

function splitList(value: string, separator: string): string[] {
  return value
    .split(separator)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

const DEFAULT_FEATURES = [
  'Projects | 3 | Unlimited | Unlimited',
  'Team members | 1 | 10 | Unlimited',
  'Analytics | no | yes | yes',
  'Priority support | no | no | yes',
  'Custom domains | no | yes | yes',
  'SSO & SAML | no | no | yes',
].join('\n')

export default function ComparisonTable({
  plans = 'Free, Pro, Enterprise',
  features = DEFAULT_FEATURES,
  firstColLabel = '',
  highlightIndex = 1,
  highlightLabel = 'Popular',
  showBadge = true,
  width = 560,
  radius = 12,
  borderWidth = 1,
  rowPadding = 11,
  fontSize = 13.5,
  background = '#ffffff',
  textColor = '#17191c',
  headerColor = '#17191c',
  mutedColor = '#6b7280',
  accentColor = '#4f46e5',
  selectedBackground = '#eef2ff',
  borderColor = '#e3e6ea',
  onSelectPlan,
}: ComparisonTableProps) {
  const planNames = splitList(plans, ',')
  const rows = splitList(features, '\n').map((line) => {
    const parts = line.split('|').map((part) => part.trim())
    return { name: parts[0] ?? '', cells: parts.slice(1) }
  })

  const container: CSSProperties = {
    width,
    borderRadius: radius,
    borderWidth,
    borderColor,
    borderStyle: borderWidth > 0 ? 'solid' : undefined,
    background,
  }

  const cellPad = `${rowPadding}px 14px`
  const highlightBg = (index: number): string | undefined =>
    index === highlightIndex ? selectedBackground : undefined

  return (
    <div className={styles.wrap} style={container}>
      <table className={styles.table} style={{ fontSize }}>
        <thead>
          <tr>
            <th
              className={styles.corner}
              style={{ padding: cellPad, color: mutedColor, borderColor }}
            >
              {firstColLabel}
            </th>
            {planNames.map((plan, index) => {
              const highlighted = index === highlightIndex
              return (
                <th
                  key={index}
                  className={styles.planHead}
                  style={{
                    padding: cellPad,
                    borderColor,
                    background: highlightBg(index),
                    color: highlighted ? accentColor : headerColor,
                    boxShadow: highlighted ? `inset 0 2px 0 ${accentColor}` : undefined,
                  }}
                >
                  {onSelectPlan ? (
                    <button type="button" className={styles.planButton} onClick={() => onSelectPlan(index)}>
                      {plan}
                    </button>
                  ) : (
                    plan
                  )}
                  {showBadge && highlighted && highlightLabel && (
                    <span className={styles.badge} style={{ background: accentColor }}>
                      {highlightLabel}
                    </span>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className={styles.feature}
                style={{ padding: cellPad, color: textColor, borderColor }}
              >
                {row.name}
              </td>
              {planNames.map((_, colIndex) => {
                const cell = classify(row.cells[colIndex] ?? '')
                return (
                  <td
                    key={colIndex}
                    className={styles.cell}
                    style={{ padding: cellPad, borderColor, background: highlightBg(colIndex) }}
                  >
                    {cell.kind === 'check' ? (
                      <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-label="Included">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : cell.kind === 'dash' ? (
                      <span className={styles.dash} style={{ color: mutedColor }} aria-label="Not included">
                        –
                      </span>
                    ) : (
                      <span style={{ color: textColor }}>{cell.text}</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
