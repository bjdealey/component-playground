import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { manifests, getManifest } from '../lib/registry'
import { defaultValues, defaultValuesForAll } from '../lib/values'
import { generateJSX, generateUsage } from '../lib/codegen'
import { readUrl, writeUrl } from '../lib/urlState'
import { readComposeUrl, writeComposeUrl } from '../lib/compositionUrl'
import { appendEvent, eventTime, type LoggedEvent } from '../lib/eventLog'
import type { Composition, PageSettings } from '../lib/composition'
import {
  addBlock,
  createBlock,
  pruneBlocks,
  updateBlock,
} from '../lib/composition'
import { DEFAULT_SCENE, buildScene, sceneByName } from '../lib/scenes'
import { generatePage, generateTokens } from '../lib/compositionCodegen'
import { defaultTheme, type Theme } from '../lib/theme'
import { randomizeValues } from '../lib/randomize'
import type {
  ComponentManifest,
  ControlValue,
  PlaygroundValues,
  SlotValues,
} from '../lib/types'
import { SPLITTER, usePane } from '../lib/panes'
import Splitter from './Splitter'
import Sidebar from './Sidebar'
import Gallery from './Gallery'
import PreviewStage, { type StageTheme } from './PreviewStage'
import ComposeStage from './ComposeStage'
import ThemePanel from './ThemePanel'
import AddBlockDialog from './AddBlockDialog'
import CommandMenu, { type Command } from './CommandMenu'
import ControlsPanel from './ControlsPanel'
import CodePanel, { COMPONENT_VIEWS, PAGE_VIEWS } from './CodePanel'
import EventLog from './EventLog'
import { Glyph } from './icons'
import styles from './App.module.css'

type Mode = 'gallery' | 'component' | 'compose'

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: 'gallery', label: 'Gallery', hint: 'Every component as a tile' },
  { id: 'component', label: 'Component', hint: 'One component, every prop' },
  {
    id: 'compose',
    label: 'Compose',
    hint: 'A page of components under one shared theme',
  },
]

/** The three layout regions become tabs on a narrow screen. */
type MobileTab = 'list' | 'view' | 'edit'

/** Width of the collapsed component rail — wide enough for a 20px icon + hit area. */
const RAIL_WIDTH = 54

const NAV_COLLAPSED_KEY = 'playground:nav:collapsed'

function readNavCollapsed(): boolean {
  try {
    return window.localStorage.getItem(NAV_COLLAPSED_KEY) === '1'
  } catch {
    return false
  }
}

/** Tracks a media query, so the layout can switch to tabs below the breakpoint. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    setMatches(mql.matches)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export default function App() {
  // A hash written by a previous session (or pasted in) wins over the defaults.
  const fromUrl = readUrl()
  const fromComposeUrl = readComposeUrl()

  // A deep link (component hash or compose hash) opens straight to that view;
  // a bare load lands on the gallery — the browse-all overview.
  const [mode, setMode] = useState<Mode>(
    fromComposeUrl ? 'compose' : fromUrl ? 'component' : 'gallery',
  )

  const [selected, setSelected] = useState(() => {
    const named = fromUrl && manifests.some((entry) => entry.name === fromUrl.name)
    return named ? fromUrl.name : (manifests[0]?.name ?? '')
  })

  const [valuesByName, setValuesByName] = useState<
    Record<string, PlaygroundValues>
  >(() => {
    const seeded = defaultValuesForAll(manifests)
    const target = fromUrl && manifests.find((entry) => entry.name === fromUrl.name)
    if (target) seeded[target.name] = fromUrl.apply(target)
    return seeded
  })

  const [stageTheme, setStageTheme] = useState<StageTheme>('light')

  /* ---------------- compose mode ---------------- */

  const [composition, setComposition] = useState<Composition>(() =>
    // Pruned on the way in: a link, or a scene, may name a component that has
    // since been removed from `src/components/`.
    pruneBlocks(fromComposeUrl?.composition ?? buildScene(DEFAULT_SCENE)),
  )
  const [theme, setTheme] = useState<Theme>(
    () => fromComposeUrl?.theme ?? defaultTheme(),
  )
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [picking, setPicking] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  // Below 900px the panes stop sitting side by side and become one-at-a-time
  // tabs; `mobileTab` is which region is on screen. It's harmless to set on a
  // wide screen (the tab bar isn't rendered there), so the tab-switches below
  // don't need to guard on width.
  const isMobile = useMediaQuery('(max-width: 899px)')
  const [mobileTab, setMobileTab] = useState<MobileTab>('view')

  // The component list can fold to an icon rail to give the preview its width
  // back. Only on the wide layout — on a phone the list is its own full tab.
  const [navCollapsed, setNavCollapsed] = useState(readNavCollapsed)
  useEffect(() => {
    try {
      window.localStorage.setItem(NAV_COLLAPSED_KEY, navCollapsed ? '1' : '0')
    } catch {
      // A rail that forgets its state across reloads is not worth throwing over.
    }
  }, [navCollapsed])
  const railMode = navCollapsed && !isMobile

  /**
   * Interact mode: the page, and nothing else.
   *
   * The right column goes with the chrome. Half the reason to hand the page
   * over to its components is to try it at a real device width, and keeping a
   * 344px panel would be taking back most of what the Mobile button just gave.
   */
  const [interactive, setInteractive] = useState(false)

  const [events, setEvents] = useState<LoggedEvent[]>([])
  const nextEventId = useRef(0)

  // Stable, so it never re-renders the preview on its own account.
  const handleEvent = useCallback(
    (name: string, args: unknown[], noisy?: boolean) => {
      nextEventId.current += 1
      const id = nextEventId.current
      setEvents((prev) => appendEvent(prev, name, args, id, eventTime(), noisy))
    },
    [],
  )

  // Fall back to the first entry so a stale selection — a folder that was
  // renamed or removed while the dev server was running — can't strand the UI.
  const manifest: ComponentManifest | undefined =
    manifests.find((entry) => entry.name === selected) ?? manifests[0]
  const activeName = manifest?.name ?? ''

  // A component registered after mount (a new folder added while the dev server
  // is running) has no stored entry yet, so fall back to its manifest defaults.
  const values = useMemo(
    () =>
      manifest ? valuesByName[activeName] ?? defaultValues(manifest) : undefined,
    [manifest, activeName, valuesByName],
  )

  // Events from the component you just left would read as this one's. Switching
  // modes is the same problem: a page's events are not one component's.
  useEffect(() => {
    setEvents([])
  }, [activeName, mode])

  // Mirror the live state into the hash so a reload or a shared link restores
  // it. Which state that is depends on the mode, so the two routes never fight
  // over the hash.
  useEffect(() => {
    if (mode === 'compose') writeComposeUrl(composition, theme)
    else if (mode === 'component' && manifest && values) writeUrl(manifest, values)
    else if (mode === 'gallery' && window.location.hash) {
      // The gallery isn't a single component, so it owns no hash — and clearing
      // a stale one means a reload returns to the gallery, not the last component.
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }
  }, [mode, composition, theme, manifest, values])

  // Adopt a hash pasted into an already-open playground. Without this the
  // effect above would simply overwrite it with whatever is on screen.
  useEffect(() => {
    function adopt() {
      const composed = readComposeUrl()
      if (composed) {
        setMode('compose')
        setComposition(pruneBlocks(composed.composition))
        setTheme(composed.theme)
        setSelectedBlockId(null)
        return
      }

      const parsed = readUrl()
      if (!parsed) return
      const target = manifests.find((entry) => entry.name === parsed.name)
      if (!target) return

      setMode('component')
      setSelected(target.name)
      setValuesByName((prev) => ({ ...prev, [target.name]: parsed.apply(target) }))
    }

    window.addEventListener('hashchange', adopt)
    return () => window.removeEventListener('hashchange', adopt)
  }, [])

  const [includeDefaults, setIncludeDefaults] = useState(false)
  const [wantFull, setWantFull] = useState(false)
  const [full, setFull] = useState<string | null>(null)

  const options = useMemo(() => ({ includeDefaults }), [includeDefaults])

  const snippets = useMemo(
    () =>
      manifest && values
        ? {
            jsx: generateJSX(manifest, values, options),
            usage: generateUsage(manifest, values, options),
          }
        : { jsx: '', usage: '' },
    [manifest, values, options],
  )

  const pageSnippets = useMemo(
    () => ({
      page: generatePage(composition, { ...options, theme }),
      tokens: generateTokens(theme),
    }),
    [composition, theme, options],
  )

  // The raw component sources are a separate chunk — fetch it the first time
  // the Full source tab is opened, then keep it in step with the controls.
  useEffect(() => {
    if (!wantFull || !manifest || !values) return
    let live = true
    setFull(null)

    import('../lib/fullSource')
      .then(({ generateFullSource }) => {
        if (live) setFull(generateFullSource(manifest, values, options))
      })
      .catch((error: unknown) => {
        console.error('[playground] could not load the full-source module:', error)
        if (live) setFull('// Failed to load component sources — see the console.')
      })

    return () => {
      live = false
    }
  }, [wantFull, manifest, values, options])

  /** Computed from the previous selection, so rapid keypresses can't collide. */
  function handleStep(delta: number, pool: string[]) {
    if (pool.length === 0) return
    setSelected((prev) => {
      const current = pool.indexOf(prev)
      if (current === -1) return delta === 1 ? pool[0] : pool[pool.length - 1]
      return pool[(current + delta + pool.length) % pool.length]
    })
  }

  /** Open a component from the gallery into its see-it-and-edit-it detail view. */
  function openComponent(name: string) {
    setInteractive(false)
    setMode('component')
    setSelected(name)
    // On the phone the detail opens straight to the preview, not the list tab.
    setMobileTab('view')
  }

  /* ---------------- editing ---------------- */

  const selectedBlock = useMemo(
    () => composition.blocks.find((block) => block.id === selectedBlockId) ?? null,
    [composition, selectedBlockId],
  )
  const selectedBlockManifest = selectedBlock
    ? getManifest(selectedBlock.component)
    : undefined

  /**
   * One editing path for both modes.
   *
   * The controls panel is shared, so the difference between "editing Button" and
   * "editing the Button on the page" lives here rather than in every handler.
   */
  function editActive(update: (prev: PlaygroundValues) => PlaygroundValues) {
    if (mode === 'compose') {
      if (!selectedBlock) return
      setComposition((prev) => updateBlock(prev, selectedBlock.id, update))
      return
    }

    if (!manifest) return
    setValuesByName((prev) => ({
      ...prev,
      [activeName]: update(prev[activeName] ?? defaultValues(manifest)),
    }))
  }

  function handlePropChange(name: string, value: ControlValue) {
    editActive((prev) => ({ ...prev, props: { ...prev.props, [name]: value } }))
  }

  function handleChildrenChange(text: string) {
    editActive((prev) => ({ ...prev, children: text }))
  }

  function editSlot(slot: string, update: (prev: SlotValues) => SlotValues) {
    editActive((prev) => ({
      ...prev,
      slots: {
        ...prev.slots,
        [slot]: update(prev.slots[slot] ?? { props: {}, children: '' }),
      },
    }))
  }

  function handleSlotPropChange(slot: string, name: string, value: ControlValue) {
    editSlot(slot, (prev) => ({ ...prev, props: { ...prev.props, [name]: value } }))
  }

  function handleSlotChildrenChange(slot: string, text: string) {
    editSlot(slot, (prev) => ({ ...prev, children: text }))
  }

  function handleReset() {
    if (mode === 'compose') {
      if (!selectedBlock || !selectedBlockManifest) return
      setComposition((prev) =>
        updateBlock(prev, selectedBlock.id, () =>
          defaultValues(selectedBlockManifest),
        ),
      )
      return
    }

    if (!manifest) return
    setValuesByName((prev) => ({
      ...prev,
      [manifest.name]: defaultValues(manifest),
    }))
  }

  /**
   * Fill every setting with a fresh value. Colours are drawn from one coherent,
   * WCAG-legible, colour-blind-safe palette keyed to the stage's light/dark — see
   * `randomizeValues`. Content and handlers are left alone.
   */
  function handleRandomize() {
    if (mode === 'compose') {
      if (!selectedBlock || !selectedBlockManifest) return
      setComposition((prev) =>
        updateBlock(prev, selectedBlock.id, (current) =>
          randomizeValues(selectedBlockManifest, current, theme.mode),
        ),
      )
      return
    }

    if (!manifest || !values) return
    setValuesByName((prev) => ({
      ...prev,
      [manifest.name]: randomizeValues(manifest, values, stageTheme),
    }))
  }

  /** A binding firing on the canvas writes back to that block, not the selection. */
  function handleBlockPropChange(id: string, name: string, value: ControlValue) {
    setComposition((prev) =>
      updateBlock(prev, id, (current) => ({
        ...current,
        props: { ...current.props, [name]: value },
      })),
    )
  }

  /**
   * The page size survives a scene change.
   *
   * It is a viewport you are inspecting at, not a property of the layout — being
   * thrown back to desktop every time you wanted to see a different page on a
   * phone would make the size buttons useless for the one thing they are for.
   * A scene that states its own size still wins, since that is a deliberate
   * choice about the layout rather than about the window.
   */
  function handleSceneChange(name: string) {
    const scene = sceneByName(name)
    if (!scene) return

    setComposition((prev) => {
      const built = pruneBlocks(buildScene(scene))
      return {
        ...built,
        page: {
          ...built.page,
          width: scene.page?.width ?? prev.page.width,
          padding: scene.page?.padding ?? prev.page.padding,
          minSpan: scene.page?.minSpan ?? prev.page.minSpan,
        },
      }
    })
    setSelectedBlockId(null)
    setEvents([])
  }

  function handlePageChange(page: PageSettings) {
    setComposition((prev) => ({ ...prev, page }))
  }

  // ⌘K (Ctrl+K) opens the command menu from anywhere.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const commands = useMemo<Command[]>(
    () => [
      {
        id: 'mode-gallery',
        group: 'Go',
        label: 'Gallery',
        hint: 'all components',
        run: () => {
          setInteractive(false)
          setMode('gallery')
        },
      },
      {
        id: 'mode-component',
        group: 'Go',
        label: 'Component mode',
        hint: 'one component',
        run: () => {
          setInteractive(false)
          setMode('component')
        },
      },
      {
        id: 'mode-compose',
        group: 'Go',
        label: 'Compose mode',
        hint: 'a page',
        run: () => {
          setInteractive(false)
          setMode('compose')
        },
      },
      {
        id: 'add-block',
        group: 'Go',
        label: 'Add a component to the page',
        hint: 'compose',
        run: () => {
          setInteractive(false)
          setMode('compose')
          setPicking(true)
        },
      },
      ...manifests.map((entry) => ({
        id: `jump-${entry.name}`,
        group: 'Components',
        label: entry.name,
        hint: entry.category,
        mono: true,
        run: () => {
          setInteractive(false)
          setMode('component')
          setSelected(entry.name)
          setMobileTab('view')
        },
      })),
    ],
    // manifests is a module constant and every setter below is stable.
    [],
  )

  function handlePick(picked: ComponentManifest) {
    const block = createBlock(picked, { component: picked.name, span: 12 })
    setComposition((prev) => ({
      // An edited scene is no longer that scene, and saying so keeps the menu
      // honest about what is on screen.
      ...addBlock(prev, block, selectedBlockId ?? undefined),
      name: sceneByName(prev.name) ? `${prev.name} (edited)` : prev.name,
    }))
    setSelectedBlockId(block.id)
  }

  /* ---------------- panes ---------------- */

  // Ceilings are read off the window rather than measured from the DOM: these
  // three panes each sit against the viewport edge, so the window is the
  // container, and a ResizeObserver would only tell us what we already know.
  // The subtracted figures are the room the *other* side needs to stay usable.
  const rightPane = usePane('right', {
    initial: 344,
    min: 260,
    max: () => window.innerWidth - 420,
    direction: -1,
    axis: 'x',
  })

  const codePane = usePane('code', {
    initial: 236,
    min: 96,
    max: () => window.innerHeight - 260,
    direction: -1,
    axis: 'y',
  })

  const themePane = usePane('theme', {
    initial: 372,
    min: 140,
    max: () => window.innerHeight - 240,
    direction: 1,
    axis: 'y',
  })

  /* ---------------- render ---------------- */

  const composing = mode === 'compose'

  // The full-source view is far longer than anything else and used to get its
  // own taller cap. It still does — right up until the pane is sized by hand,
  // at which point that is the answer and nothing should be overriding it.
  const codeHeight =
    !codePane.custom && wantFull && !composing
      ? Math.max(codePane.size, Math.round(window.innerHeight * 0.46))
      : codePane.size

  const bare = composing && interactive

  // Tabs replace the side-by-side panes on a narrow screen. Interact mode is the
  // page alone, so it keeps no tabs. The list tab only exists in Component mode,
  // so a stale 'list' falls back to the preview in Compose.
  const tabbed = isMobile && !bare && mode !== 'gallery'
  const activeTab: MobileTab = composing && mobileTab === 'list' ? 'view' : mobileTab
  const hidden = (tab: MobileTab) => (tabbed && activeTab !== tab ? styles.paneHidden : '')

  const columns = bare
    ? 'minmax(0, 1fr)'
    : composing
      ? `minmax(0, 1fr) ${SPLITTER}px ${rightPane.size}px`
      : `${railMode ? RAIL_WIDTH : 216}px minmax(0, 1fr) ${SPLITTER}px ${rightPane.size}px`

  // In compose mode the controls panel follows the canvas selection, so with
  // nothing selected there is nothing to configure.
  const panelManifest = composing ? selectedBlockManifest : manifest
  const panelValues = composing ? selectedBlock?.values : values

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          {mode === 'component' && !isMobile && (
            <button
              type="button"
              className={styles.hamburger}
              title={
                navCollapsed ? 'Expand the component list' : 'Collapse the component list'
              }
              aria-label="Toggle the component list"
              aria-expanded={!navCollapsed}
              onClick={() => setNavCollapsed((v) => !v)}
            >
              <Glyph name="hamburger" />
            </button>
          )}
          <span className={styles.mark} aria-hidden="true" />
          <h1 className={styles.title}>Component Playground</h1>
          <button
            type="button"
            className={styles.command}
            title="Command menu (⌘K)"
            onClick={() => setCommandOpen(true)}
          >
            ⌘K
          </button>
        </div>

        <div className={styles.modes} role="group" aria-label="Mode">
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              title={option.hint}
              aria-pressed={mode === option.id}
              className={`${styles.mode} ${mode === option.id ? styles.modeActive : ''}`}
              onClick={() => setMode(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className={styles.tagline}>
          {composing ? (
            <>
              {composition.blocks.length} component
              {composition.blocks.length === 1 ? '' : 's'} on the page, one shared
              theme.
            </>
          ) : mode === 'gallery' ? (
            <>Every component, at a glance. Click one to open it.</>
          ) : (
            <>
              Manifest-driven. Drop a folder in <code>src/components/</code> to add
              one.
            </>
          )}
        </p>
      </header>

      {mode === 'gallery' && manifests.length > 0 ? (
        <Gallery manifests={manifests} onOpen={openComponent} />
      ) : manifest && values ? (
        <div
          className={styles.layout}
          style={{ gridTemplateColumns: columns }}
        >
          {!composing && (
            <Sidebar
              className={hidden('list')}
              manifests={manifests}
              selected={activeName}
              onSelect={(name) => {
                setSelected(name)
                // Picking a component on the phone jumps to its preview.
                setMobileTab('view')
              }}
              onStep={handleStep}
              railMode={railMode}
            />
          )}

          <main className={`${styles.center} ${hidden('view')}`}>
            {composing ? (
              <ComposeStage
                composition={composition}
                theme={theme}
                interactive={interactive}
                onInteractiveChange={(next) => {
                  setInteractive(next)
                  // A selection outlined behind the chrome that just went away
                  // would come back on exit pointing at whatever you last
                  // clicked, which by then is not what you selected.
                  if (next) setSelectedBlockId(null)
                }}
                selectedId={selectedBlockId}
                onSelect={setSelectedBlockId}
                onChange={setComposition}
                onSelectAndChange={(next, id) => {
                  setComposition(next)
                  setSelectedBlockId(id)
                }}
                onEvent={handleEvent}
                onBlockPropChange={handleBlockPropChange}
                onAdd={() => setPicking(true)}
                onSceneChange={handleSceneChange}
                onPageChange={handlePageChange}
              />
            ) : (
              <PreviewStage
                manifest={manifest}
                values={values}
                theme={stageTheme}
                onThemeChange={setStageTheme}
                onPropChange={handlePropChange}
                onEvent={handleEvent}
              />
            )}

            <EventLog events={events} onClear={() => setEvents([])} />

            <Splitter pane={codePane} label="Code panel height" />

            <CodePanel
              height={codeHeight}
              snippets={composing ? pageSnippets : { ...snippets, full }}
              views={composing ? PAGE_VIEWS : COMPONENT_VIEWS}
              includeDefaults={includeDefaults}
              onIncludeDefaultsChange={setIncludeDefaults}
              onNeedFull={() => setWantFull(true)}
            />
          </main>

          {!bare && <Splitter pane={rightPane} label="Controls panel width" />}

          {!bare && (
          <div className={`${styles.right} ${hidden('edit')}`}>
            {composing && (
              <>
                <div className={styles.themeSlot} style={{ height: themePane.size }}>
                  <ThemePanel
                    theme={theme}
                    onChange={setTheme}
                    onPresetPage={(background) =>
                      setComposition((prev) => ({
                        ...prev,
                        page: { ...prev.page, background },
                      }))
                    }
                    composition={composition}
                  />
                </div>
                <Splitter pane={themePane} label="Theme panel height" />
              </>
            )}

            {panelManifest && panelValues ? (
              <ControlsPanel
                manifest={panelManifest}
                values={panelValues}
                note={
                  composing ? (
                    <>
                      Editing the <strong>{panelManifest.name}</strong> on the page.
                      A value you set here outranks the shared theme.
                    </>
                  ) : undefined
                }
                onPropChange={handlePropChange}
                onChildrenChange={handleChildrenChange}
                onSlotPropChange={handleSlotPropChange}
                onSlotChildrenChange={handleSlotChildrenChange}
                onReset={handleReset}
                onRandomize={handleRandomize}
              />
            ) : (
              <div className={styles.noSelection}>
                <p className={styles.noSelectionTitle}>Nothing selected</p>
                <p className={styles.noSelectionBody}>
                  Click a component on the page to edit just that one. The theme
                  above drives all of them at once.
                </p>
              </div>
            )}
          </div>
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>No components registered</h2>
          <p className={styles.emptyBody}>
            Add a folder under <code>src/components/</code> containing a component
            and a matching <code>*.manifest.ts</code> that default-exports its
            manifest. The registry picks it up automatically.
          </p>
        </div>
      )}

      {tabbed && (
        <nav className={styles.mobileTabs} aria-label="Panel">
          {(composing
            ? [
                { id: 'view' as const, label: 'Canvas', icon: 'canvas' },
                { id: 'edit' as const, label: 'Controls', icon: 'sliders' },
              ]
            : [
                { id: 'list' as const, label: 'Components', icon: 'list' },
                { id: 'view' as const, label: 'Preview', icon: 'eye' },
                { id: 'edit' as const, label: 'Controls', icon: 'sliders' },
              ]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.mobileTab} ${
                activeTab === tab.id ? styles.mobileTabActive : ''
              }`}
              aria-pressed={activeTab === tab.id}
              onClick={() => setMobileTab(tab.id)}
            >
              <Glyph name={tab.icon} className={styles.mobileTabIcon} />
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      {picking && (
        <AddBlockDialog onPick={handlePick} onClose={() => setPicking(false)} />
      )}

      {commandOpen && (
        <CommandMenu commands={commands} onClose={() => setCommandOpen(false)} />
      )}
    </div>
  )
}
