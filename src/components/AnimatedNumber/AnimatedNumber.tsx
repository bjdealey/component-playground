import { useEffect, useRef, useState } from 'react'
import styles from './AnimatedNumber.module.css'

export interface AnimatedNumberProps {
  value?: number
  /** Count-up duration in milliseconds. */
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Group thousands with commas. */
  separator?: boolean
  fontSize?: number
  fontWeight?: number
  color?: string
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

export default function AnimatedNumber({
  value = 2847,
  duration = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = true,
  fontSize = 44,
  fontWeight = 700,
  color = '#4f46e5',
}: AnimatedNumberProps) {
  // Read once. Someone who asked for less motion gets the final number, not a
  // sprint to it.
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  )

  const [display, setDisplay] = useState(() => (reduce ? value : 0))
  // Where the next run starts from, so changing the value on the fly eases from
  // the number on screen rather than snapping back to zero first.
  const fromRef = useRef(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      fromRef.current = value
      return
    }

    const from = fromRef.current
    let raf = 0
    let start: number | null = null

    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min(1, (now - start) / Math.max(1, duration))
      setDisplay(from + (value - from) * easeOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = value
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration, reduce])

  const format = (n: number): string => {
    const fixed = n.toFixed(Math.max(0, decimals))
    const [whole, fraction] = fixed.split('.')
    const grouped = separator ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : whole
    return `${prefix}${grouped}${fraction ? `.${fraction}` : ''}${suffix}`
  }

  return (
    <span className={styles.number} style={{ fontSize, fontWeight, color }}>
      {/* The rolling value is decorative; the real, final number is announced once. */}
      <span aria-hidden="true">{format(display)}</span>
      <span className={styles.srOnly}>{format(value)}</span>
    </span>
  )
}
