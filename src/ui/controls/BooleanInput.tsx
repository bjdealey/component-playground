import { controlId } from './Field'
import styles from './controls.module.css'

interface BooleanInputProps {
  name: string
  value: boolean
  onChange: (value: boolean) => void
}

export default function BooleanInput({
  name,
  value,
  onChange,
}: BooleanInputProps) {
  return (
    <label className={styles.switch}>
      <input
        id={controlId(name)}
        className={styles.switchInput}
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={styles.switchTrack}>
        <span className={styles.switchKnob} />
      </span>
    </label>
  )
}
