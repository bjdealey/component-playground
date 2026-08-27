import type { CSSProperties } from 'react'
import styles from './Divider.module.css'

export interface DividerProps {
  label?: string
  orientation?: 'horizontal' | 'vertical'
  labelPosition?: 'left' | 'center' | 'right'
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  thickness?: number
  length?: number
  gap?: number
  color?: string
  labelSize?: number
  labelColor?: string
  uppercase?: boolean
}

export default function Divider({
  label = '',
  orientation = 'horizontal',
  labelPosition = 'center',
  lineStyle = 'solid',
  thickness = 1,
  length = 300,
  gap = 12,
  color = '#e3e6ea',
  labelSize = 12,
  labelColor = '#9aa1ab',
  uppercase = false,
}: DividerProps) {
  const vertical = orientation === 'vertical'

  const line: CSSProperties = {
    borderColor: color,
    borderStyle: lineStyle,
    ...(vertical
      ? { borderLeftWidth: thickness, height: length }
      : { borderTopWidth: thickness }),
  }

  // A vertical rule, or an unlabelled horizontal one, is just the line.
  if (vertical || !label) {
    return (
      <div
        className={vertical ? styles.vertical : styles.plain}
        style={vertical ? line : { ...line, width: length }}
        role="separator"
      />
    )
  }

  const text = (
    <span
      className={styles.label}
      style={{
        fontSize: labelSize,
        color: labelColor,
        textTransform: uppercase ? 'uppercase' : 'none',
        letterSpacing: uppercase ? '0.07em' : 0,
      }}
    >
      {label}
    </span>
  )

  return (
    <div className={styles.labelled} style={{ width: length, gap }} role="separator">
      {labelPosition !== 'left' && <span className={styles.rule} style={line} />}
      {text}
      {labelPosition !== 'right' && <span className={styles.rule} style={line} />}
    </div>
  )
}
