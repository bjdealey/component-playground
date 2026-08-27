import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './CommandMenu.module.css'

export interface Command {
  id: string
  label: string
  /** Right-aligned context — a category, a mode name. */
  hint?: string
  group: string
  /** Component names are identifiers, so they wear the mono face; actions don't. */
  mono?: boolean
  run: () => void
}

interface CommandMenuProps {
  commands: Command[]
  onClose: () => void
}

/**
 * The ⌘K menu.
 *
 * Same keyboard-first idiom as the Add-block dialog — open focused on a search,
 * type, arrow, Enter — but over every component plus a few actions, so jumping
 * to any of the ninety-odd components never needs the mouse or the sidebar.
 */
export default function CommandMenu({ commands, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus the search on open; hand focus back to the opener on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(needle) ||
        (command.hint ?? '').toLowerCase().includes(needle) ||
        command.group.toLowerCase().includes(needle),
    )
  }, [commands, query])

  // A shortened list can leave the highlight past its end.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, matches.length - 1)))
  }, [matches.length])

  const grouped = useMemo(() => {
    const byGroup = new Map<string, Command[]>()
    for (const command of matches) {
      const list = byGroup.get(command.group)
      if (list) list.push(command)
      else byGroup.set(command.group, [command])
    }
    return [...byGroup.entries()].map(([group, items]) => ({ group, items }))
  }, [matches])

  /** Flat order the arrows walk, matching what is on screen. */
  const ordered = useMemo(() => grouped.flatMap((group) => group.items), [grouped])

  function runAt(index: number) {
    const command = ordered[index]
    if (command) {
      command.run()
      onClose()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    // The list is walked with the arrows; keep Tab from escaping the modal.
    if (event.key === 'Tab') {
      event.preventDefault()
      inputRef.current?.focus()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      runAt(active)
      return
    }

    const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0
    if (delta === 0 || ordered.length === 0) return

    event.preventDefault()
    setActive((current) => {
      const next = (current + delta + ordered.length) % ordered.length
      listRef.current
        ?.querySelector(`[data-index="${next}"]`)
        ?.scrollIntoView({ block: 'nearest' })
      return next
    })
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.head}>
          <input
            ref={inputRef}
            className={styles.search}
            type="text"
            value={query}
            placeholder="Jump to a component, or type a command…"
            spellCheck={false}
            aria-label="Search commands"
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className={styles.count}>{ordered.length}</span>
        </div>

        <div className={styles.list} ref={listRef}>
          {ordered.length === 0 ? (
            <p className={styles.none}>
              Nothing matches <code>{query}</code>.
            </p>
          ) : (
            grouped.map((group) => (
              <div key={group.group}>
                <span className={styles.category}>{group.group}</span>
                {group.items.map((command) => {
                  const index = ordered.indexOf(command)
                  return (
                    <button
                      key={command.id}
                      type="button"
                      data-index={index}
                      // Arrow-navigated and clickable, but out of the Tab order.
                      tabIndex={-1}
                      className={`${styles.item} ${index === active ? styles.itemActive : ''}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => runAt(index)}
                    >
                      <span className={command.mono ? styles.itemMono : styles.itemLabel}>
                        {command.label}
                      </span>
                      {command.hint && <span className={styles.itemHint}>{command.hint}</span>}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className={styles.foot}>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move · <kbd>↵</kbd> run · <kbd>esc</kbd> close
          </span>
          <span className={styles.footNote}>⌘K</span>
        </div>
      </div>
    </div>
  )
}
