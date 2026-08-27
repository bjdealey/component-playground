import type { CSSProperties } from 'react'
import IconButton from '../IconButton/IconButton'
import styles from './Carousel.module.css'

export interface CarouselProps {
  /** Slides separated by `;`. */
  slides?: string
  activeIndex?: number
  width?: number
  height?: number
  radius?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  dotSize?: number
  buttonSize?: number
  borderWidth?: number
  borderColor?: string
  dotGap?: number
  fontSize?: number
  /** Comma-separated backgrounds, cycled across the slides. */
  palette?: string
  textColor?: string
  arrowBackground?: string
  arrowColor?: string
  dotColor?: string
  activeDotColor?: string
  onSelect?: (index: number) => void
}

function splitList(value: string, delimiter: string): string[] {
  return value
    .split(delimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

export default function Carousel({
  slides = 'Build once;Preview everywhere;Ship on merge',
  activeIndex = 0,
  width = 320,
  height = 160,
  radius = 12,
  showArrows = true,
  showDots = true,
  loop = true,
  dotSize = 7,
  buttonSize = 28,
  borderWidth = 0,
  borderColor = '#e3e6ea',
  dotGap = 6,
  fontSize = 18,
  palette = '#4f46e5, #0ea5e9, #15803d',
  textColor = '#ffffff',
  arrowBackground = 'rgba(255,255,255,0.85)',
  arrowColor = '#17191c',
  dotColor = 'rgba(255,255,255,0.45)',
  activeDotColor = '#ffffff',
  onSelect,
}: CarouselProps) {
  const items = splitList(slides, ';')
  const colors = splitList(palette, ',')
  const count = Math.max(1, items.length)
  const index = Math.min(Math.max(0, activeIndex), count - 1)

  const step = (delta: number) => {
    const next = index + delta
    if (next < 0) return loop ? count - 1 : 0
    if (next >= count) return loop ? 0 : count - 1
    return next
  }

  const track: CSSProperties = {
    width: `${count * 100}%`,
    transform: `translateX(-${(index * 100) / count}%)`,
  }

  return (
    <div className={styles.carousel} style={{ width, height, borderRadius: radius }}>
      <div className={styles.track} style={track}>
        {items.map((slide, i) => (
          <div
            key={`${slide}-${i}`}
            className={styles.slide}
            style={{
              width: `${100 / count}%`,
              backgroundColor: colors[i % Math.max(1, colors.length)] ?? '#4f46e5',
              color: textColor,
              fontSize,
            }}
            aria-hidden={i !== index}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <span className={`${styles.arrow} ${styles.prev}`}>
            <IconButton
              glyph="‹"
              label="Previous slide"
              size={buttonSize}
              shape="circle"
              borderWidth={borderWidth}
              borderColor={borderColor}
              shadow
              background={arrowBackground}
              color={arrowColor}
              fontScale={0.62}
              disabled={!loop && index === 0}
              onClick={() => onSelect?.(step(-1))}
            />
          </span>
          <span className={`${styles.arrow} ${styles.next}`}>
            <IconButton
              glyph="›"
              label="Next slide"
              size={buttonSize}
              shape="circle"
              borderWidth={borderWidth}
              borderColor={borderColor}
              shadow
              background={arrowBackground}
              color={arrowColor}
              fontScale={0.62}
              disabled={!loop && index === count - 1}
              onClick={() => onSelect?.(step(1))}
            />
          </span>
        </>
      )}

      {showDots && count > 1 && (
        <div className={styles.dots} style={{ gap: dotGap }}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={styles.dot}
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: i === index ? activeDotColor : dotColor,
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => onSelect?.(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
