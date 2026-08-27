import type { ComponentManifest } from './types'

/**
 * Auto-registration.
 *
 * Every `*.manifest.ts` one level deep inside `src/components/` is picked up at
 * build time by Vite's glob import. Dropping in a new folder with a `.tsx` and a
 * `.manifest.ts` is the entire workflow — no edits to this file, no imports to
 * add anywhere else.
 */
const modules = import.meta.glob<{ default?: ComponentManifest }>(
  '../components/*/*.manifest.ts',
  { eager: true },
)

function collect(): ComponentManifest[] {
  const found: ComponentManifest[] = []

  for (const [path, mod] of Object.entries(modules)) {
    const manifest = mod?.default
    if (!manifest) {
      console.warn(`[registry] ${path} has no default export — skipping.`)
      continue
    }
    if (!manifest.name || !manifest.component) {
      console.warn(`[registry] ${path} is missing "name" or "component" — skipping.`)
      continue
    }
    found.push(manifest)
  }

  return found.sort((a, b) => a.name.localeCompare(b.name))
}

export const manifests: ComponentManifest[] = collect()

export function getManifest(name: string): ComponentManifest | undefined {
  return manifests.find((manifest) => manifest.name === name)
}
