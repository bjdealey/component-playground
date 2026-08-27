import { useEffect, useMemo, useRef, useState } from 'react'
import { manifests } from '../lib/registry'
import { FALLBACK_CATEGORY, orderCategories } from '../lib/categories'
import type { ComponentManifest } from '../lib/types'
import styles from './AddBlockDialog.module.css'

interface AddBlockDialogProps {
  onPick: (manifest: ComponentManifest) => void
  onClose: () => void
}

/**
 * The component picker.
 *
 * Ninety-odd components is too many to scan, so this opens focused on a search
 * field and answers to the keyboard alone: type, arrow, Enter. Adding several
 * components in a row is the common case, so picking one leaves the dialog open
 * — closing is Escape or the backdrop.
 */
export default function AddBlockDialog({ onPick, onClose }: AddBlockDialogProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus the search on open, and hand focus back to whatever opened the dialog
  // (the "+ Add component" button) when it closes, rather than dropping it on the
  // dimmed page behind.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return manifests
    return manifests.filter(
      (manifest) =>
        manifest.name.toLowerCase().includes(needle) ||
        (manifest.category ?? '').toLowerCase().includes(needle),
    )
  }, [query])

  // A shortened list can leave the highlight past its end.
  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(0, matches.length - 1)))
  }, [matches.length])

  const grouped = useMemo(() => {
    const byCategory = new Map<string, ComponentManifest[]>()
    for (const manifest of matches) {
      const category = manifest.category ?? FALLBACK_CATEGORY
      const list = byCategory.get(category)
      if (list) list.push(manifest)
      else byCategory.set(category, [manifest])
    }
    return orderCategories(byCategory.keys()).map((category) => ({
      category,
      items: byCategory.get(category) ?? [],
    }))
  }, [matches])

  /** Flat order the arrow keys walk, matching what is on screen. */
  const ordered = useMemo(() => grouped.flatMap((group) => group.items), [grouped])

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    // The list is walked with the arrows, not Tab, and the items are out of the
    // tab order — so keep Tab from escaping the modal into the page behind it.
    if (event.key === 'Tab') {
      event.preventDefault()
      inputRef.current?.focus()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const manifest = ordered[active]
      if (manifest) onPick(manifest)
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
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Add a component"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.head}>
          <input
            ref={inputRef}
            className={styles.search}
            type="text"
            value={query}
            placeholder="Search components…"
            spellCheck={false}
            aria-label="Search components"
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className={styles.count}>
            {matches.length} of {manifests.length}
          </span>
        </div>

        <div className={styles.list} ref={listRef}>
          {ordered.length === 0 ? (
            <p className={styles.none}>
              Nothing matches <code>{query}</code>.
            </p>
          ) : (
            grouped.map((group) =>
              group.items.length === 0 ? null : (
                <div key={group.category}>
                  <span className={styles.category}>{group.category}</span>
                  <div className={styles.items}>
                    {group.items.map((manifest) => {
                      const index = ordered.indexOf(manifest)
                      return (
                        <button
                          key={manifest.name}
                          type="button"
                          data-index={index}
                          // Arrow-navigated and mouse-clickable, but out of the
                          // Tab order: ninety tab stops in here is how Tab used
                          // to walk straight out of the modal.
                          tabIndex={-1}
                          className={`${styles.item} ${
                            index === active ? styles.itemActive : ''
                          }`}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => onPick(manifest)}
                        >
                          {manifest.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ),
            )
          )}
        </div>

        <div className={styles.foot}>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move · <kbd>Enter</kbd> add · <kbd>Esc</kbd> close
          </span>
          <span className={styles.footNote}>Stays open so you can add several.</span>
        </div>
      </div>
    </div>
  )
}
