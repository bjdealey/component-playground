/**
 * Raw source registry.
 *
 * Vite can import a file's text instead of its module, so the playground can
 * show the actual source of whatever is on the stage — not a reconstruction of
 * it. Same glob mechanism as the manifest registry, `?raw` instead of a module.
 */
type RawMap = Record<string, string>

const rawComponents = import.meta.glob('../components/*/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as RawMap

const rawStyles = import.meta.glob('../components/*/*.module.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as RawMap

// Shared modules a component might import. Written as './' because this file
// already lives in src/lib — '../lib/*.ts' points at the same directory but Vite
// resolves it to nothing.
const rawLib = import.meta.glob('./*.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as RawMap

const sources: RawMap = {}

/** Glob keys are relative to this file — rewrite them to project-root paths. */
function register(map: RawMap, prefix: string, replacement: string) {
  for (const [key, code] of Object.entries(map)) {
    sources[key.replace(prefix, replacement)] = code
  }
}

register(rawComponents, '../', 'src/')
register(rawStyles, '../', 'src/')
register(rawLib, './', 'src/lib/')

/** Resolves a relative import specifier against the file that declared it. */
function resolveImport(fromPath: string, specifier: string): string | null {
  if (!specifier.startsWith('.')) return null

  const directory = fromPath.slice(0, fromPath.lastIndexOf('/'))
  const stack: string[] = []
  for (const segment of `${directory}/${specifier}`.split('/')) {
    if (segment === '' || segment === '.') continue
    if (segment === '..') stack.pop()
    else stack.push(segment)
  }

  // CSS modules are imported with their extension; TS imports omit it.
  const base = stack.join('/')
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`]) {
    if (candidate in sources) return candidate
  }
  return null
}

const IMPORT_SPECIFIER = /from\s+'([^']+)'/g

export interface SourceFile {
  path: string
  code: string
}

/**
 * Every local file needed to run one component, dependencies first.
 *
 * Walks relative imports so a component that leans on a shared module — the
 * charts pull in `lib/palette.ts` — still copies out complete. Bare specifiers
 * like `react` are left alone; they're the caller's to install.
 */
export function collectSources(componentName: string): SourceFile[] {
  const entry = `src/components/${componentName}/${componentName}.tsx`
  if (!(entry in sources)) return []

  const visited = new Set<string>()
  const ordered: string[] = []

  function walk(path: string) {
    if (visited.has(path)) return
    visited.add(path)

    const code = sources[path]
    if (code === undefined) return

    // Depth-first, so a file's dependencies are emitted before the file itself.
    for (const match of code.matchAll(IMPORT_SPECIFIER)) {
      const dependency = resolveImport(path, match[1])
      if (dependency) walk(dependency)
    }

    ordered.push(path)
  }

  walk(entry)
  return ordered.map((path) => ({ path, code: sources[path] }))
}
