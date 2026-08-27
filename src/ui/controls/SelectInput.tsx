import { controlId } from './Field'
import styles from './controls.module.css'

interface SelectInputProps {
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function SelectInput({
  name,
  options,
  value,
  onChange,
}: SelectInputProps) {
  return (
    <select
      id={controlId(name)}
      className={styles.select}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
