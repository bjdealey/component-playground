import type { CSSProperties } from 'react'
import Chip from '../Chip/Chip'
import styles from './TagInput.module.css'

export interface TagInputProps {
  label?: string
  /** Comma-separated tags. Removing one rewrites this list. */
  tags?: string
  placeholder?: string
  helperText?: string
  disabled?: boolean
  invalid?: boolean
  width?: number
  gap?: number
  paddingX?: number
  paddingY?: number
  tagPaddingX?: number
  tagPaddingY?: number
  radius?: number
  tagRadius?: number
  borderWidth?: number
  fontSize?: number
  tagSize?: number
  labelSize?: number
  background?: string
  borderColor?: string
  focusColor?: string
  labelColor?: string
  tagBackground?: string
  tagColor?: string
  mutedColor?: string
  onTagsChange?: (tags: string) => void
}

export default function TagInput({
  label = 'Topics',
  tags = 'react, typescript, vite',
  placeholder = 'Add a topic…',
  helperText = '',
  disabled = false,
  invalid = false,
  width = 300,
  gap = 6,
  paddingX = 8,
  paddingY = 7,
  tagPaddingX = 8,
  tagPaddingY = 4,
  radius = 8,
  tagRadius = 5,
  borderWidth = 1,
  fontSize = 13.5,
  tagSize = 12.5,
  labelSize = 13,
  background = '#ffffff',
  borderColor = '#d3d8de',
  focusColor = '#4f46e5',
  labelColor = '#17191c',
  tagBackground = '#eceef1',
  tagColor = '#3f434a',
  mutedColor = '#9aa1ab',
  onTagsChange,
}: TagInputProps) {
  const list = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  const remove = (index: number) => {
    onTagsChange?.(list.filter((_, i) => i !== index).join(', '))
  }

  const wrapper: CSSProperties = {
    width,
    gap,
    ['--field-border' as string]: invalid ? '#dc2626' : borderColor,
    ['--focus-color' as string]: invalid ? '#dc2626' : focusColor,
  }

  return (
    <div className={styles.wrapper} style={wrapper}>
      {label && <span style={{ fontSize: labelSize, color: labelColor }}>{label}</span>}

      <div
        className={`${styles.field} ${disabled ? styles.disabled : ''}`}
        style={{
          padding: `${paddingY}px ${paddingX}px`,
          gap: gap,
          borderRadius: radius,
          borderWidth,
          backgroundColor: background,
        }}
      >
        {/* Real Chips — one per tag, so removal and styling stay in one place. */}
        {list.map((tag, index) => (
          <Chip
            key={`${tag}-${index}`}
            label={tag}
            removable
            borderWidth={0}
            radius={tagRadius}
            paddingX={tagPaddingX}
            paddingY={tagPaddingY}
            fontSize={tagSize}
            gap={tagPaddingX / 2}
            background={tagBackground}
            textColor={tagColor}
            onRemove={() => remove(index)}
          />
        ))}

        <input
          type="text"
          className={styles.input}
          style={{ fontSize, minWidth: 60 }}
          placeholder={list.length === 0 ? placeholder : ''}
          disabled={disabled}
        />
      </div>

      {helperText && (
        <span style={{ fontSize: tagSize, color: invalid ? '#dc2626' : mutedColor }}>
          {helperText}
        </span>
      )}
    </div>
  )
}
