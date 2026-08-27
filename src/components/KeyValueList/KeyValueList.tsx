import styles from './KeyValueList.module.css'

export interface KeyValueListProps {
  /** Rows separated by `;`, each `key|value`. */
  items?: string
  layout?: 'rows' | 'stacked'
  width?: number
  keyWidth?: number
  rowGap?: number
  columnGap?: number
  dividers?: boolean
  rowPaddingY?: number
  keySize?: number
  valueSize?: number
  keyColor?: string
  valueColor?: string
  dividerColor?: string
  monoValues?: boolean
  uppercaseKeys?: boolean
}

interface Row {
  key: string
  value: string
}

export function parseRows(items: string): Row[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [key = '', ...rest] = chunk.split('|')
      return { key: key.trim(), value: rest.join('|').trim() }
    })
}

export default function KeyValueList({
  items = 'Environment|Production;Region|eu-west-2;Build|#4f2a91c;Node|22.11.0;Deployed|12m ago',
  layout = 'rows',
  width = 340,
  keyWidth = 120,
  rowGap = 0,
  columnGap = 16,
  dividers = true,
  rowPaddingY = 9,
  keySize = 12.5,
  valueSize = 13,
  keyColor = '#9aa1ab',
  valueColor = '#17191c',
  dividerColor = '#eceef1',
  monoValues = true,
  uppercaseKeys = false,
}: KeyValueListProps) {
  const rows = parseRows(items)

  return (
    <dl className={styles.list} style={{ width, gap: rowGap }}>
      {rows.map((row, index) => (
        <div
          key={index}
          className={`${styles.row} ${layout === 'stacked' ? styles.stacked : ''}`}
          style={{
            gap: layout === 'stacked' ? 2 : columnGap,
            padding: `${rowPaddingY}px 0`,
            borderBottomWidth: dividers && index < rows.length - 1 ? 1 : 0,
            borderBottomColor: dividerColor,
          }}
        >
          <dt
            className={styles.key}
            style={{
              width: layout === 'stacked' ? undefined : keyWidth,
              fontSize: keySize,
              color: keyColor,
              textTransform: uppercaseKeys ? 'uppercase' : 'none',
              letterSpacing: uppercaseKeys ? '0.05em' : 0,
            }}
          >
            {row.key}
          </dt>
          <dd
            className={`${styles.value} ${monoValues ? styles.mono : ''}`}
            style={{ fontSize: valueSize, color: valueColor }}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
