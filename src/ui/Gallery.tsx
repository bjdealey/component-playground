import { useMemo, useState } from 'react'
import type { ComponentManifest, PlaygroundValues } from '../lib/types'
import { defaultValues } from '../lib/values'
import { applyThemeToValues, type Theme } from '../lib/theme'
import { FALLBACK_CATEGORY, orderCategories } from '../lib/categories'
import PreviewBoundary from './PreviewBoundary'
import ComponentRender from './ComponentRender'
import styles from './Gallery.module.css'

interface GalleryProps {
  manifests: ComponentManifest[]
  /** Open one component in Component mode — the see-it-and-edit-it detail view. */
  onOpen: (name: string) => void
  /**
   * The global design system to render every tile through, or null for plain
   * manifest defaults. The same design the single-component preview and the
   * compose page use, so a randomise lands on all of them at once.
   */
  design: Theme | null
  /** Randomise the global design — from here you watch it land on every tile. */
  onRandomize: () => void
}

/** Tiles are read-only, so nothing they "fire" needs to go anywhere. */
const noop = () => {}

/**
 * Take the preview subtree out of the tab order and hit-testing. Ninety-two
 * tiles, each a real component full of buttons and inputs, would otherwise be
 * hundreds of tab stops — and a component that is itself a button can't sit
 * inside the card's button. `inert` (set on the node, so it works regardless of
 * React version) makes each tile a picture; the card's own button is the control.
 */
function makeInert(node: HTMLDivElement | null) {
  if (node) node.inert = true
}

function controlCount(manifest: ComponentManifest): number {
  return manifest.props.length + (manifest.children ? 1 : 0)
}

/** Same rule as the sidebar: a name match, or a match on what it composes. */
function matches(manifest: ComponentManifest, needle: string): boolean {
  if (manifest.name.toLowerCase().includes(needle)) return true
  return (manifest.slots ?? []).some((slot) =>
    slot.component.toLowerCase().includes(needle),
  )
}

interface Section {
  name: string
  entries: ComponentManifest[]
}

export default function Gallery({
  manifests,
  onOpen,
  design,
  onRandomize,
}: GalleryProps) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()

  // Each tile's values: the manifest defaults with the global design folded in
  // (or just the defaults when no design is active). Recomputed only when the
  // design changes, so it is not 92 theme folds per keystroke — stable
  // identities also keep the tiles that survive a filter from re-rendering.
  const valuesByName = useMemo(() => {
    const map: Record<string, PlaygroundValues> = {}
    for (const manifest of manifests) {
      const base = defaultValues(manifest)
      map[manifest.name] = design
        ? applyThemeToValues(manifest, base, design).values
        : base
    }
    return map
  }, [manifests, design])

  const visible = useMemo(
    () => (needle ? manifests.filter((entry) => matches(entry, needle)) : manifests),
    [manifests, needle],
  )

  const sections = useMemo<Section[]>(() => {
    const byCategory = new Map<string, ComponentManifest[]>()
    for (const manifest of visible) {
      const category = manifest.category ?? FALLBACK_CATEGORY
      const bucket = byCategory.get(category)
      if (bucket) bucket.push(manifest)
      else byCategory.set(category, [manifest])
    }
    return orderCategories(byCategory.keys()).map((name) => ({
      name,
      entries: byCategory.get(name) ?? [],
    }))
  }, [visible])

  return (
    <section className={styles.gallery} aria-label="Component gallery">
      <div className={styles.bar}>
        <input
          type="search"
          className={styles.search}
          value={query}
          placeholder="Filter components…"
          aria-label="Filter components"
          spellCheck={false}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className={styles.count}>
          {needle
            ? `${visible.length} of ${manifests.length}`
            : `${manifests.length} components`}
        </span>
        <button
          type="button"
          className={styles.randomize}
          onClick={onRandomize}
          title="Randomise the design — every tile at once, colours stay legible and colour-blind-safe"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 3h5v5" />
            <path d="M4 20 21 3" />
            <path d="M21 16v5h-5" />
            <path d="m15 15 6 6" />
            <path d="m4 4 5 5" />
          </svg>
          Randomise
        </button>
      </div>

      <div className={styles.scroll}>
        {visible.length === 0 ? (
          <p className={styles.noMatch}>
            Nothing matches <code>{query.trim()}</code>
          </p>
        ) : (
          sections.map((section) => (
            <div key={section.name} className={styles.section}>
              <h2 className={styles.sectionName}>
                {section.name}
                <span className={styles.sectionCount}>{section.entries.length}</span>
              </h2>

              <ul className={styles.grid}>
                {section.entries.map((manifest) => (
                  <li key={manifest.name} className={styles.card}>
                    {/* The live component, shrunk into a clipped well. Inert and
                        aria-hidden: a thumbnail, not an interactive widget. */}
                    <div className={styles.thumb}>
                      <div
                        className={styles.thumbInner}
                        aria-hidden="true"
                        ref={makeInert}
                      >
                        <PreviewBoundary resetKey={manifest.name}>
                          <ComponentRender
                            manifest={manifest}
                            values={valuesByName[manifest.name]}
                            onEvent={noop}
                          />
                        </PreviewBoundary>
                      </div>
                    </div>

                    <span className={styles.meta}>
                      <span className={styles.cardName}>{manifest.name}</span>
                      <span className={styles.cardCount}>{controlCount(manifest)}</span>
                    </span>

                    {/* A transparent button over the whole card. A real button
                        with no interactive descendants — the click and focus target,
                        with none of the button-in-button nesting a wrapper would cause. */}
                    <button
                      type="button"
                      className={styles.open}
                      aria-label={`Open ${manifest.name}`}
                      title={`Open ${manifest.name}`}
                      onClick={() => onOpen(manifest.name)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
