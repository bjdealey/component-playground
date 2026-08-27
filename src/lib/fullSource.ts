import type { ComponentManifest, PlaygroundValues } from './types'
import { componentNames, generateUsage, type CodegenOptions } from './codegen'
import { collectSources } from './sources'

/**
 * The "Full source" view, kept in its own module so it can be a separate chunk.
 *
 * `sources.ts` inlines every component's own source as a string — a few hundred
 * KB that nobody needs until they open this tab. Import it lazily
 * (`await import('../lib/fullSource')`), never statically, or the raw text ends
 * up in the main bundle again.
 */
const BANNER_WIDTH = 68

function banner(label: string): string {
  const rule = '─'.repeat(Math.max(3, BANNER_WIDTH - label.length - 7))
  return `/* ── ${label} ${rule} */`
}

/**
 * Everything needed to run the component from an empty machine: its stylesheet,
 * its own source, any local module it imports, and the usage that renders it.
 */
export function generateFullSource(
  manifest: ComponentManifest,
  values: PlaygroundValues,
  options: CodegenOptions = {},
): string {
  const { name } = manifest

  // Slots aren't imports, so the walker can't see them — pull each slot
  // component's files in explicitly or the bundle wouldn't compile.
  const files: { path: string; code: string }[] = []
  const seen = new Set<string>()
  for (const componentName of componentNames(manifest)) {
    for (const file of collectSources(componentName)) {
      if (seen.has(file.path)) continue
      seen.add(file.path)
      files.push(file)
    }
  }

  const header = [
    '/* ' + '─'.repeat(BANNER_WIDTH - 3),
    `   ${name} — self-contained.`,
    '',
    '   Plain React + CSS Modules. The only runtime dependency is react itself,',
    '   so nothing below needs a UI library, a styling library, or a build',
    '   plugin beyond what a stock React + TypeScript template already has.',
    '',
    '   Starting from nothing:',
    '     npm create vite@latest my-app -- --template react-ts',
    '     cd my-app && npm install',
    '',
    // +1 for Example.tsx, which is emitted below the collected sources.
    `   Then add the ${files.length + 1} files below and render <Example />.`,
    '   ' + '─'.repeat(BANNER_WIDTH - 4) + ' */',
    '',
  ].join('\n')

  const bodies = files.map((file) => `${banner(file.path)}\n\n${file.code.trimEnd()}\n`)

  const usage = [
    banner('src/Example.tsx'),
    '',
    generateUsage(manifest, values, options).trimEnd(),
    '',
  ].join('\n')

  return [header, ...bodies, usage].join('\n')
}
