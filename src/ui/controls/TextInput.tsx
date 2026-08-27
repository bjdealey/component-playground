import { controlId } from './Field'
import styles from './controls.module.css'

interface TextInputProps {
  name: string
  value: string
  onChange: (value: string) => void
}

export default function TextInput({ name, value, onChange }: TextInputProps) {
  return (
    <input
      id={controlId(name)}
      className={styles.text}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
