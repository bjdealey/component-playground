import Badge from '../Badge/Badge'
import Card from '../Card/Card'
import IconButton from '../IconButton/IconButton'
import styles from './KanbanColumn.module.css'

export interface KanbanColumnProps {
  title?: string
  /** Cards separated by `;`, each `title|body`. */
  cards?: string
  showCount?: boolean
  showAdd?: boolean
  width?: number
  padding?: number
  gap?: number
  radius?: number
  cardRadius?: number
  cardPadding?: number
  titleSize?: number
  cardTitleSize?: number
  cardBodySize?: number
  background?: string
  titleColor?: string
  cardBackground?: string
  cardBorderColor?: string
  accentColor?: string
}

/** A column of real `Card`s, headed by a real `Badge` count. */
export default function KanbanColumn({
  title = 'In review',
  cards = 'Palette validation|Run the six checks against the dark surface.;Slot contract|Document children vs element props.;Bundle split|Move raw sources behind a dynamic import.',
  showCount = true,
  showAdd = true,
  width = 260,
  padding = 12,
  gap = 10,
  radius = 12,
  cardRadius = 10,
  cardPadding = 12,
  titleSize = 13,
  cardTitleSize = 13,
  cardBodySize = 12,
  background = '#f6f7f9',
  titleColor = '#3f434a',
  cardBackground = '#ffffff',
  cardBorderColor = '#e3e6ea',
  accentColor = '#4f46e5',
}: KanbanColumnProps) {
  const entries = cards
    .split(';')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [cardTitle = '', body = ''] = chunk.split('|')
      return { title: cardTitle.trim(), body: body.trim() }
    })

  return (
    <div
      className={styles.column}
      style={{ width, padding, gap, borderRadius: radius, backgroundColor: background }}
    >
      <div className={styles.header} style={{ gap: gap * 0.7 }}>
        <span className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
          {title}
        </span>
        {showCount && (
          <Badge fontSize={titleSize * 0.85} paddingX={7} paddingY={2}>
            {String(entries.length)}
          </Badge>
        )}
        {showAdd && (
          <span className={styles.add}>
            <IconButton glyph="+" label="Add card" size={22} color={accentColor} fontScale={0.9} />
          </span>
        )}
      </div>

      <div className={styles.cards} style={{ gap }}>
        {entries.map((entry, index) => (
          <Card
            key={index}
            title={entry.title}
            body={entry.body}
            width={width - padding * 2}
            padding={cardPadding}
            radius={cardRadius}
            background={cardBackground}
            borderColor={cardBorderColor}
            titleSize={cardTitleSize}
            bodySize={cardBodySize}
          />
        ))}
      </div>
    </div>
  )
}
