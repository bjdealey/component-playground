import type { ReactNode } from 'react'
import type {
  ComponentManifest,
  ControlValue,
  PlaygroundValues,
  PropValues,
} from '../lib/types'
import { hasChildren } from '../lib/values'
import { getManifest } from '../lib/registry'

/**
 * Rendering one configured component.
 *
 * Shared by the single-component stage and the compose canvas so the two can
 * never disagree about what a given set of values looks like — the canvas is
 * meant to answer "how does this behave next to everything else", which is only
 * worth anything if each block renders identically to its solo preview.
 */

export type EventReporter = (
  name: string,
  args: unknown[],
  noisy?: boolean,
) => void

/**
 * The props to actually render with.
 *
 * An event control's *value* is source text — `handleClick` — which is exactly
 * what React must not receive: it would warn that the listener isn't a function
 * and the handler would never run. So each one is swapped for a real function
 * that reports to the log, which is also what makes a click visible at all.
 *
 * `prefix` namespaces the report, so a slot's `onClick` is distinguishable from
 * its parent's — and on the canvas, one block's from another's.
 */
export function liveProps(
  manifest: ComponentManifest,
  props: PropValues,
  onEvent: EventReporter,
  prefix = '',
): PropValues {
  const live: PropValues = { ...props }

  for (const control of manifest.props) {
    if (control.kind !== 'event') continue
    const label = `${prefix}${control.name}`
    // Supplied even when the expression is blank: the control decides what gets
    // copied, not whether the preview responds.
    live[control.name] = ((...args: unknown[]) =>
      onEvent(label, args, control.noisy)) as unknown as ControlValue
  }

  return live
}

interface ComponentRenderProps {
  manifest: ComponentManifest
  values: PlaygroundValues
  onEvent: EventReporter
  /** Two-way bindings write back here. Omit for a read-only render. */
  onPropChange?: (name: string, value: ControlValue) => void
  /** Prefixes every reported event name. */
  prefix?: string
}

export default function ComponentRender({
  manifest,
  values,
  onEvent,
  onPropChange,
  prefix = '',
}: ComponentRenderProps) {
  const Component = manifest.component

  // Build each slot into a real element from the target's own component and the
  // slot's live values, so the preview shows genuine composition.
  const slotProps: Record<string, ReactNode> = {}
  let slotChildren: ReactNode = null

  for (const slot of manifest.slots ?? []) {
    const target = getManifest(slot.component)
    const slotValues = values.slots[slot.name]
    if (!target || !slotValues) continue

    const Slot = target.component
    const nestedProps = liveProps(
      target,
      slotValues.props,
      onEvent,
      `${prefix}${slot.name}.`,
    )
    const element = hasChildren(target, slotValues) ? (
      <Slot {...nestedProps}>{slotValues.children}</Slot>
    ) : (
      <Slot {...nestedProps} />
    )

    if (slot.name === 'children') slotChildren = element
    else slotProps[slot.name] = element
  }

  const withChildren = slotChildren !== null || hasChildren(manifest, values)
  const renderProps = liveProps(manifest, values.props, onEvent, prefix)

  // Turn each declared binding into a real callback, so interacting with the
  // preview writes straight back into the controls. Spread after the event
  // handlers, so a callback that is both bound and declared as a control gets
  // the write-back — logging is folded in here rather than lost.
  const handlers: Record<string, (value: ControlValue) => void> = {}
  if (onPropChange) {
    for (const [callback, propName] of Object.entries(manifest.bindings ?? {})) {
      if (!manifest.props.some((control) => control.name === propName)) {
        console.warn(
          `[${manifest.name}] binding "${callback}" targets unknown control "${propName}".`,
        )
        continue
      }
      handlers[callback] = (value) => {
        onEvent(`${prefix}${callback}`, [value])
        onPropChange(propName, value)
      }
    }
  }

  return withChildren ? (
    <Component {...renderProps} {...slotProps} {...handlers}>
      {slotChildren ?? values.children}
    </Component>
  ) : (
    <Component {...renderProps} {...slotProps} {...handlers} />
  )
}
