import { useMemo, useRef, useState } from 'react'
import type { ComponentManifest } from '../lib/types'
import styles from './HeaderSearch.module.css'

interface HeaderSearchProps {
  manifests: ComponentManifest[]
  /** Opens the picked component in Component mode. */
  onSelect: (name: string) => void
}

/** Kept short — the header has room for a handful, and ⌘K is there for the rest. */
const MAX_RESULTS = 8

/** Matches the name, and also what it composes — "avatar" finds AvatarGroup. */
function matches(manifest: ComponentManifest, needle: string): boolean {
  if (manifest.name.toLowerCase().includes(needle)) return true
  return (manifest.slots ?? []).some((slot) =>
    slot.component.toLowerCase().includes(needle),
  )
}

/**
 * The header's jump-to-a-component finder.
 *
 * Shown at the top-right only while the component list is hidden (the sidebar
 * collapsed). Type a name, pick a match, and it opens that component — the quick
 * navigation the list would otherwise give, without the list taking up room.
 */
export default function HeaderSearch({ manifests, onSelect }: HeaderSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const needle = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      needle
        ? manifests.filter((manifest) => matches(manifest, needle)).slice(0, MAX_RESULTS)
        : [],
    [manifests, needle],
  )

  function choose(name: string) {
    onSelect(name)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setQuery('')
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choose((results[active] ?? results[0]).name)
    }
  }

  const showList = open && results.length > 0

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={query}
        placeholder="Find a component…"
        aria-label="Find a component"
        spellCheck={false}
        role="combobox"
        aria-expanded={showList}
        aria-controls="header-search-list"
        onChange={(event) => {
          setQuery(event.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
      />

      {showList && (
        <ul className={styles.list} id="header-search-list" role="listbox">
          {results.map((manifest, index) => (
            <li key={manifest.name} role="option" aria-selected={index === active}>
              <button
                type="button"
                className={`${styles.item} ${index === active ? styles.itemActive : ''}`}
                // mousedown, not click: it has to fire before the input's blur
                // closes the list out from under the pointer.
                onMouseDown={(event) => {
                  event.preventDefault()
                  choose(manifest.name)
                }}
                onMouseEnter={() => setActive(index)}
              >
                <span className={styles.name}>{manifest.name}</span>
                <span className={styles.cat}>{manifest.category ?? 'Other'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
