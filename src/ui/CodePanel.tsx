import { useEffect, useState } from 'react'
import styles from './CodePanel.module.css'

export type CodeView = string

/**
 * A tab's worth of code. `null` means "still loading" — the full-source view
 * arrives from a lazily imported chunk.
 */
export type CodeSnippets = Record<CodeView, string | null | undefined>

export interface CodeViewOption {
  id: CodeView
  label: string
  hint: string
}

interface CodePanelProps {
  snippets: CodeSnippets
  /** Which tabs to offer. Compose mode swaps in a page and a token view. */
  views?: CodeViewOption[]
  includeDefaults: boolean
  onIncludeDefaultsChange: (includeDefaults: boolean) => void
  /** Signals that the caller should start loading the full-source chunk. */
  onNeedFull: () => void
  /** Driven by the splitter above it; the code area takes whatever is left. */
  height: number
}

type CopyState = 'idle' | 'copied' | 'error'

export const COMPONENT_VIEWS: CodeViewOption[] = [
  { id: 'jsx', label: 'JSX', hint: 'Just the tag, defaults omitted' },
  { id: 'usage', label: 'Usage', hint: 'Import plus the snippet' },
  { id: 'full', label: 'Full source', hint: 'Every file needed to run it from scratch' },
]

export const PAGE_VIEWS: CodeViewOption[] = [
  {
    id: 'page',
    label: 'Page',
    hint: 'The whole composition, theme resolved into the props',
  },
  { id: 'tokens', label: 'Tokens', hint: 'The shared theme on its own' },
]

/** Last-resort path for browsers/contexts without the async Clipboard API. */
function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Permission denied or insecure context — try the legacy path instead.
  }
  return legacyCopy(text)
}

const LABELS: Record<CopyState, string> = {
  idle: 'Copy code',
  copied: 'Copied!',
  error: 'Copy failed',
}

export default function CodePanel({
  snippets,
  views = COMPONENT_VIEWS,
  includeDefaults,
  onIncludeDefaultsChange,
  onNeedFull,
  height,
}: CodePanelProps) {
  const [view, setView] = useState<CodeView>(views[0]?.id ?? 'jsx')
  // The nonce restarts the timer even when the state value is unchanged, so
  // copying twice in a row still shows a fresh confirmation.
  const [feedback, setFeedback] = useState({ state: 'idle' as CopyState, nonce: 0 })

  useEffect(() => {
    if (feedback.state === 'idle') return
    const timer = window.setTimeout(
      () => setFeedback({ state: 'idle', nonce: 0 }),
      1600,
    )
    return () => window.clearTimeout(timer)
  }, [feedback])

  // Switching modes replaces the tab set, and the old selection is not in it.
  const known = views.some((option) => option.id === view)
  const active = known ? view : (views[0]?.id ?? '')
  useEffect(() => {
    if (!known) setView(views[0]?.id ?? '')
  }, [known, views])

  const pending = snippets[active] === null
  const code = pending ? 'Loading component sources…' : (snippets[active] ?? '')
  const lines = code.trimEnd().split('\n').length

  async function handleCopy() {
    if (pending) return
    const ok = await writeToClipboard(code)
    setFeedback((prev) => ({
      state: ok ? 'copied' : 'error',
      nonce: prev.nonce + 1,
    }))
  }

  return (
    <section className={styles.panel} style={{ height }} aria-label="Generated code">
      <div className={styles.header}>
        <div className={styles.tabs} role="tablist" aria-label="Code view">
          {views.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active === option.id}
              title={option.hint}
              className={`${styles.tab} ${active === option.id ? styles.tabActive : ''}`}
              onClick={() => {
                if (option.id === 'full') onNeedFull()
                setView(option.id)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.meta}>
          <label className={styles.allProps} title="Include props still at their default">
            <input
              type="checkbox"
              checked={includeDefaults}
              onChange={(event) => onIncludeDefaultsChange(event.target.checked)}
            />
            All props
          </label>
          <span className={styles.lines}>
            {pending ? '…' : `${lines} line${lines === 1 ? '' : 's'}`}
          </span>
          <button
            type="button"
            className={`${styles.copy} ${feedback.state === 'copied' ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {LABELS[feedback.state]}
          </button>
        </div>
      </div>

      <pre className={styles.code}>
        <code>{code}</code>
      </pre>

      <span aria-live="polite" className={styles.srOnly}>
        {feedback.state === 'copied' ? 'Code copied to clipboard' : ''}
      </span>
    </section>
  )
}
