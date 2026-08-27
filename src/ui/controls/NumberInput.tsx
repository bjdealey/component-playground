import type { NumberControl } from '../../lib/types'
import { controlId } from './Field'
import styles from './controls.module.css'

interface NumberInputProps {
  control: NumberControl
  /** DOM id — may carry a slot prefix, so it isn't always `control.name`. */
  id: string
  value: number
  onChange: (value: number) => void
}

export default function NumberInput({
  control,
  id,
  value,
  onChange,
}: NumberInputProps) {
  const min = control.min ?? 0
  const max = control.max ?? 100
  const step = control.step ?? 1

  function handleTyped(raw: string) {
    // Ignore intermediate states (empty field, "-") rather than snapping to 0.
    if (raw === '') return
    const next = Number(raw)
    if (Number.isNaN(next)) return
    onChange(next)
  }

  return (
    <div className={styles.numberRow}>
      <input
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={`${id} slider`}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <input
        id={controlId(id)}
        className={styles.number}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => handleTyped(event.target.value)}
        // Clamp on blur, not on change — clamping mid-keystroke fights typing.
        onBlur={() => {
          const clamped = Math.min(max, Math.max(min, value))
          if (clamped !== value) onChange(clamped)
        }}
      />
    </div>
  )
}
