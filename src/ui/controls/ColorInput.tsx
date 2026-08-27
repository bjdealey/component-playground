import { controlId } from './Field'
import styles from './controls.module.css'

interface ColorInputProps {
  name: string
  value: string
  onChange: (value: string) => void
}

const FULL_HEX = /^#[0-9a-f]{6}$/i

/**
 * `<input type="color">` only accepts 7-character hex, but the text field lets
 * you type freely — fall back to black while a value is mid-edit.
 */
function swatchValue(value: string): string {
  return FULL_HEX.test(value.trim()) ? value.trim() : '#000000'
}

export default function ColorInput({ name, value, onChange }: ColorInputProps) {
  return (
    <div className={styles.colorRow}>
      <input
        id={controlId(name)}
        className={`${styles.swatch} ${value.trim() === '' ? styles.swatchUnset : ''}`}
        type="color"
        value={swatchValue(value)}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        className={styles.hex}
        type="text"
        value={value}
        spellCheck={false}
        // Clearing the field returns the prop to its inherited preset value.
        placeholder="inherit"
        aria-label={`${name} hex value`}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
