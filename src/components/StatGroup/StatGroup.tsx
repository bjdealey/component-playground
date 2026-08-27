import Divider from '../Divider/Divider'
import Stat from '../Stat/Stat'
import styles from './StatGroup.module.css'

export interface StatGroupProps {
  /** Metrics separated by `;`, each `label|value|delta|trend`. */
  items?: string
  orientation?: 'horizontal' | 'vertical'
  showDividers?: boolean
  align?: 'left' | 'center'
  gap?: number
  valueSize?: number
  labelSize?: number
  dividerColor?: string
  labelColor?: string
  valueColor?: string
  upColor?: string
  downColor?: string
  uppercaseLabels?: boolean
  /** Receives the index of the metric that was activated. */
  onSelect?: (index: number) => void
}

interface Metric {
  label: string
  value: string
  delta: string
  trend: 'none' | 'up' | 'down'
}

export function parseMetrics(items: string): Metric[] {
  return items
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [label = '', value = '', delta = '', trend = 'none'] = chunk.split('|')
      const clean = trend.trim()
      return {
        label: label.trim(),
        value: value.trim(),
        delta: delta.trim(),
        trend: clean === 'up' || clean === 'down' ? clean : 'none',
      }
    })
}

/** Real `Stat`s separated by real `Divider`s. */
export default function StatGroup({
  items = 'Deploys|128|12%|up;Build time|3m 41s|8%|down;Success rate|99.2%||none',
  orientation = 'horizontal',
  showDividers = true,
  align = 'left',
  gap = 24,
  valueSize = 26,
  labelSize = 11.5,
  dividerColor = '#e3e6ea',
  labelColor = '#9aa1ab',
  valueColor = '#17191c',
  upColor = '#15803d',
  downColor = '#dc2626',
  uppercaseLabels = true,
  onSelect,
}: StatGroupProps) {
  const metrics = parseMetrics(items)
  const vertical = orientation === 'vertical'

  return (
    <div className={`${styles.group} ${vertical ? styles.vertical : ''}`} style={{ gap }}>
      {metrics.map((metric, index) => (
        <div key={index} className={`${styles.cell} ${vertical ? styles.vertical : ''}`} style={{ gap }}>
          <Stat
            onClick={onSelect ? () => onSelect(index) : undefined}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
            trend={metric.trend}
            align={align}
            valueSize={valueSize}
            labelSize={labelSize}
            labelColor={labelColor}
            valueColor={valueColor}
            upColor={upColor}
            downColor={downColor}
            uppercaseLabel={uppercaseLabels}
          />
          {showDividers && index < metrics.length - 1 && (
            <span className={styles.divider} style={{ height: vertical ? undefined : valueSize * 1.8 }}>
              <Divider
                orientation={vertical ? 'horizontal' : 'vertical'}
                color={dividerColor}
                length={vertical ? 160 : 40}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
