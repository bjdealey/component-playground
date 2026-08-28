import { getManifest } from './registry'
import { effectDefaults } from './effects'
import type {
  ComponentManifest,
  PlaygroundValues,
  PropValues,
  SlotValues,
} from './types'

function propDefaults(manifest: ComponentManifest): PropValues {
  const props: PropValues = {}
  for (const control of manifest.props) {
    props[control.name] = control.default
  }
  return props
}

/** Starting state for one slot: the target's own defaults, then any overrides. */
function slotDefaults(manifest: ComponentManifest): Record<string, SlotValues> {
  const slots: Record<string, SlotValues> = {}

  for (const slot of manifest.slots ?? []) {
    const target = getManifest(slot.component)
    if (!target) {
      console.warn(
        `[${manifest.name}] slot "${slot.name}" targets unknown component "${slot.component}".`,
      )
      slots[slot.name] = { props: {}, children: '' }
      continue
    }

    slots[slot.name] = {
      props: { ...propDefaults(target), ...(slot.defaults ?? {}) },
      children: slot.childrenDefault ?? target.children?.default ?? '',
    }
  }

  return slots
}

/** The starting state for a component: every control at its manifest default. */
export function defaultValues(manifest: ComponentManifest): PlaygroundValues {
  return {
    props: propDefaults(manifest),
    children: manifest.children?.default ?? '',
    slots: slotDefaults(manifest),
    effects: effectDefaults(),
  }
}

export function defaultValuesForAll(
  manifests: ComponentManifest[],
): Record<string, PlaygroundValues> {
  const byName: Record<string, PlaygroundValues> = {}
  for (const manifest of manifests) {
    byName[manifest.name] = defaultValues(manifest)
  }
  return byName
}

/**
 * Whether the component should render child text. Kept in one place so the
 * preview and the generated code can never disagree about self-closing.
 *
 * Takes anything carrying a `children` string, so it serves slots too.
 */
export function hasChildren(
  manifest: ComponentManifest,
  values: { children: string },
): boolean {
  return manifest.children !== undefined && values.children.length > 0
}

/** Adapts slot state to the shape the renderer and code generator expect. */
export function asPlaygroundValues(slot: SlotValues): PlaygroundValues {
  return { props: slot.props, children: slot.children, slots: {} }
}
