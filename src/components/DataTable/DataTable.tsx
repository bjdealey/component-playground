import Pagination from '../Pagination/Pagination'
import Table from '../Table/Table'
import styles from './DataTable.module.css'

export interface DataTableProps {
  headers?: string
  /** Every row, `;`-separated; the table shows one page at a time. */
  rows?: string
  page?: number
  pageSize?: number
  width?: number
  gap?: number
  striped?: boolean
  bordered?: boolean
  radius?: number
  borderWidth?: number
  buttonSize?: number
  background?: string
  headerBackground?: string
  borderColor?: string
  textColor?: string
  headerColor?: string
  stripeColor?: string
  fontSize?: number
  headerSize?: number
  headerWeight?: number
  compact?: boolean
  showFooter?: boolean
  align?: 'left' | 'center' | 'right'
  accentColor?: string
  mutedColor?: string
  footerSize?: number
  onSelectPage?: (page: number) => void
}

/**
 * A paged table.
 *
 * `Table` and `Pagination` arrive by import because this component has to *read*
 * the page to slice the rows — a slotted Pagination would hold its own page and
 * the two would disagree.
 */
export default function DataTable({
  headers = 'Service, Status, Latency',
  rows = 'api, healthy, 42ms; web, healthy, 18ms; worker, degraded, 310ms; cron, healthy, 63ms; queue, healthy, 27ms; cache, healthy, 9ms; search, degraded, 480ms',
  page = 1,
  pageSize = 3,
  width = 420,
  gap = 12,
  striped = true,
  bordered = true,
  radius = 10,
  borderWidth = 1,
  buttonSize = 26,
  background = '#ffffff',
  headerBackground = '#fafbfc',
  borderColor = '#e3e6ea',
  textColor = '#17191c',
  headerColor = '#6b7280',
  stripeColor = '#fafbfc',
  fontSize = 13,
  headerSize = 11.5,
  headerWeight = 600,
  compact = false,
  showFooter = true,
  align = 'left',
  accentColor = '#4f46e5',
  mutedColor = '#9aa1ab',
  footerSize = 12,
  onSelectPage,
}: DataTableProps) {
  const all = rows
    .split(';')
    .map((row) => row.trim())
    .filter((row) => row.length > 0)

  const size = Math.max(1, Math.round(pageSize))
  const totalPages = Math.max(1, Math.ceil(all.length / size))
  const current = Math.min(Math.max(1, page), totalPages)

  const start = (current - 1) * size
  const slice = all.slice(start, start + size)

  return (
    <div className={styles.wrapper} style={{ width, gap }}>
      <Table
        headers={headers}
        rows={slice.join(';')}
        width={width}
        striped={striped}
        bordered={bordered}
        compact={compact}
        align={align}
        radius={radius}
        borderWidth={borderWidth}
        background={background}
        headerBackground={headerBackground}
        borderColor={borderColor}
        textColor={textColor}
        headerColor={headerColor}
        stripeColor={stripeColor}
        fontSize={fontSize}
        headerSize={headerSize}
        headerWeight={headerWeight}
      />

      {showFooter && (
        <div className={styles.footer} style={{ fontSize: footerSize, color: mutedColor }}>
          <span>
            {all.length === 0 ? 'No rows' : `${start + 1}–${start + slice.length} of ${all.length}`}
          </span>
          <Pagination
            totalPages={totalPages}
            page={current}
            siblings={0}
            size={buttonSize}
            fontSize={footerSize}
            radius={radius}
            borderWidth={borderWidth}
            background={background}
            borderColor={borderColor}
            textColor={textColor}
            activeColor={accentColor}
            onSelect={onSelectPage}
          />
        </div>
      )}
    </div>
  )
}
