import IconButton from '../IconButton/IconButton'
import Input from '../Input/Input'
import Meter from '../Meter/Meter'
import styles from './PasswordField.module.css'

export interface PasswordFieldProps {
  label?: string
  value?: string
  placeholder?: string
  revealed?: boolean
  showStrength?: boolean
  showReveal?: boolean
  helperText?: string
  width?: number
  gap?: number
  radius?: number
  segments?: number
  strengthLabel?: string
  tiers?: string
  focusColor?: string
  onChange?: (value: string) => void
  onToggleReveal?: (revealed: boolean) => void
}

/**
 * A password field with a live strength read-out.
 *
 * Composes by import rather than by slot: the meter's value is *derived* from
 * what's typed, so it can't be configured independently — there'd be nothing
 * sensible for a separate control to set.
 */
export default function PasswordField({
  label = 'Password',
  value = '',
  placeholder = '••••••••••',
  revealed = false,
  showStrength = true,
  showReveal = true,
  helperText = 'At least 12 characters, one number and one symbol.',
  width = 300,
  gap = 8,
  radius = 6,
  segments = 12,
  strengthLabel = 'Strength',
  tiers = 'Weak, Fair, Strong',
  focusColor = '#4f46e5',
  onChange,
  onToggleReveal,
}: PasswordFieldProps) {
  // A deliberately simple estimate — length plus character variety.
  const variety =
    (/[a-z]/.test(value) ? 1 : 0) +
    (/[A-Z]/.test(value) ? 1 : 0) +
    (/[0-9]/.test(value) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(value) ? 1 : 0)
  const score = Math.min(100, Math.round((Math.min(value.length, 16) / 16) * 60 + variety * 10))

  return (
    <div className={styles.field} style={{ width, gap }}>
      <span className={styles.row}>
        <span className={styles.input}>
          <Input
            label={label}
            value={revealed ? value : '•'.repeat(value.length)}
            placeholder={placeholder}
            helperText={helperText}
            fullWidth
            radius={radius}
            focusColor={focusColor}
            onChange={onChange}
          />
        </span>
        {showReveal && (
          <span className={styles.reveal}>
            <IconButton
              glyph={revealed ? '⊘' : '◉'}
              label={revealed ? 'Hide password' : 'Show password'}
              size={30}
              radius={radius}
              onClick={() => onToggleReveal?.(!revealed)}
            />
          </span>
        )}
      </span>

      {showStrength && (
        <Meter
          value={score}
          label={strengthLabel}
          tiers={tiers}
          segments={segments}
          width={width}
          height={6}
        />
      )}
    </div>
  )
}
