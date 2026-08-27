import { controlId } from './Field'
import styles from './controls.module.css'

interface EventInputProps {
  name: string
  value: string
  /** Offered as suggestions only — the field stays free text. */
  presets?: string[]
  onChange: (value: string) => void
}

/**
 * Editor for a handler expression.
 *
 * A `datalist` rather than a select-plus-custom-field: it offers the common
 * choices in one click while still accepting any expression, and it's native, so
 * it costs nothing.
 */
export default function EventInput({
  name,
  value,
  presets,
  onChange,
}: EventInputProps) {
  const listId = `${controlId(name)}-presets`

  return (
    <>
      <input
        id={controlId(name)}
        className={styles.event}
        type="text"
        value={value}
        list={presets && presets.length > 0 ? listId : undefined}
        placeholder="handleClick"
        spellCheck={false}
        autoComplete="off"
        aria-describedby={`${controlId(name)}-hint`}
        onChange={(event) => onChange(event.target.value)}
      />
      {presets && presets.length > 0 && (
        <datalist id={listId}>
          {presets.map((preset) => (
            <option key={preset} value={preset} />
          ))}
        </datalist>
      )}
      <p id={`${controlId(name)}-hint`} className={styles.hint}>
        Emitted as <code>{name.split('.').pop()}={'{…}'}</code>. Empty omits it.
      </p>
    </>
  )
}
