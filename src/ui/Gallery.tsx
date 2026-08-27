import { useMemo, useState } from 'react'
import type { ComponentManifest, PlaygroundValues } from '../lib/types'
import { defaultValues } from '../lib/values'
import { FALLBACK_CATEGORY, orderCategories } from '../lib/categories'
import PreviewBoundary from './PreviewBoundary'
import ComponentRender from './ComponentRender'
import styles from './Gallery.module.css'

interface GalleryProps {
  manifests: ComponentManifest[]
  /** Open one component in Component mode — the see-it-and-edit-it detail view. */
  onOpen: (name: string) => void
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

export default function Gallery({ manifests, onOpen }: GalleryProps) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()

  // Default values are the same for every render, so compute them once rather
  // than 92 times per keystroke. Stable identities also keep the tiles that
  // survive a filter from re-rendering.
  const valuesByName = useMemo(() => {
    const map: Record<string, PlaygroundValues> = {}
    for (const manifest of manifests) map[manifest.name] = defaultValues(manifest)
    return map
  }, [manifests])

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
