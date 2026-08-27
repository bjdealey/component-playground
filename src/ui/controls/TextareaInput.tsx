import { controlId } from './Field'
import styles from './controls.module.css'

interface TextareaInputProps {
  name: string
  value: string
  rows?: number
  onChange: (value: string) => void
}

export default function TextareaInput({
  name,
  value,
  rows = 4,
  onChange,
}: TextareaInputProps) {
  return (
    <textarea
      id={controlId(name)}
      className={styles.textarea}
      rows={rows}
      value={value}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
