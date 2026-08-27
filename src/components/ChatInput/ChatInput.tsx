import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import styles from './ChatInput.module.css'

export interface ChatInputProps {
  value?: string
  placeholder?: string
  /** Helper line under the field — 'Claude can make mistakes.' Empty hides it. */
  hint?: ReactNode
  showHint?: boolean
  /** A leading attach affordance. */
  showAttach?: boolean
  /** A response is generating: the send button becomes a stop control. */
  streaming?: boolean
  disabled?: boolean
  width?: number
  radius?: number
  borderWidth?: number
  padding?: number
  gap?: number
  fontSize?: number
  buttonSize?: number
  background?: string
  accentColor?: string
  textColor?: string
  placeholderColor?: string
  borderColor?: string
  metaColor?: string
  onChange?: (value: string) => void
  /** Fires on send — the button, or Enter without Shift. */
  onSend?: (value: string) => void
}

function AttachIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.2-8.2a3.3 3.3 0 0 1 4.7 4.7l-8.3 8.2a1.7 1.7 0 0 1-2.4-2.4l7.6-7.5" />
    </svg>
  )
}

export default function ChatInput({
  value = '',
  placeholder = 'Message Claude…',
  hint = 'Claude can make mistakes. Check important info.',
  showHint = true,
  showAttach = true,
  streaming = false,
  disabled = false,
  width = 560,
  radius = 16,
  borderWidth = 1,
  padding = 10,
  gap = 8,
  fontSize = 14,
  buttonSize = 32,
  background = '#ffffff',
  accentColor = '#4f46e5',
  textColor = '#17191c',
  placeholderColor = '#6b7280',
  borderColor = '#d3d8de',
  metaColor = '#6b7280',
  onChange,
  onSend,
}: ChatInputProps) {
  // Empty send is a no-op, the way a real composer's button is dimmed until
  // there's something to send.
  const canSend = !disabled && (streaming || value.trim().length > 0)

  const composer: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth,
    borderColor,
    background,
    ['--focus-color' as string]: accentColor,
  }

  function submit() {
    if (canSend) onSend?.(value)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className={styles.wrapper} style={{ width }}>
      <div className={styles.composer} style={composer} data-disabled={disabled || undefined}>
        {showAttach && (
          <button
            type="button"
            className={styles.attach}
            style={{ color: metaColor }}
            aria-label="Attach a file"
            disabled={disabled}
          >
            <AttachIcon />
          </button>
        )}

        <textarea
          className={styles.field}
          style={{ fontSize, color: textColor, ['--placeholder' as string]: placeholderColor }}
          rows={1}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck={false}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className={styles.send}
          style={{
            width: buttonSize,
            height: buttonSize,
            background: canSend ? accentColor : 'transparent',
            color: canSend ? '#ffffff' : metaColor,
            ['--send-border' as string]: borderColor,
          }}
          aria-label={streaming ? 'Stop generating' : 'Send message'}
          data-idle={!canSend || undefined}
          disabled={!canSend}
          onClick={submit}
        >
          {streaming ? (
            <span className={styles.stop} aria-hidden="true" />
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5" />
              <path d="m6 11 6-6 6 6" />
            </svg>
          )}
        </button>
      </div>

      {showHint && hint && (
        <p className={styles.hint} style={{ color: metaColor }}>
          {hint}
        </p>
      )}
    </div>
  )
}
