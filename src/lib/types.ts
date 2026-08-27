import type { ComponentType } from 'react'

/**
 * The manifest contract.
 *
 * Every component in `src/components/<X>/` ships a `<X>.manifest.ts` that
 * default-exports a `ComponentManifest`. The manifest — never runtime prop
 * introspection — is what drives the controls panel and the code generator.
 */

/**
 * Optional section header the control is filed under in the panel, e.g.
 * 'Colors' or 'Typography'. Controls sharing a group render together under one
 * collapsible heading, in first-appearance order. Omit it and the control sits
 * ungrouped at the top of the panel.
 */
type Grouped = { group?: string }

/** Free text input. */
export interface TextControl extends Grouped {
  name: string
  kind: 'text'
  default: string
}

/** Multi-line text. Real newlines, so nothing has to be escaped by hand. */
export interface TextareaControl extends Grouped {
  name: string
  kind: 'textarea'
  default: string
  rows?: number
}

/**
 * A handler prop, e.g. `onClick`.
 *
 * The value is the *expression* emitted into the JSX — `handleClick`, or
 * `() => console.log('clicked')`. Unlike every other kind it is emitted even when
 * it equals its default, because a snippet that silently drops its handler
 * pastes as a dead component.
 */
export interface EventControl extends Grouped {
  name: string
  kind: 'event'
  /** Empty string omits the prop entirely. */
  default: string
  /** Offered as autocomplete suggestions; any expression is allowed. */
  presets?: string[]
  /**
   * Fires from pointer movement rather than deliberate interaction — hover being
   * the case. The event log collapses consecutive fires of a noisy handler into a
   * single row, so drifting across the preview can't evict the click you were
   * actually looking at.
   */
  noisy?: boolean
}

/** Slider + numeric input. `min`/`max`/`step` bound the slider. */
export interface NumberControl extends Grouped {
  name: string
  kind: 'number'
  default: number
  min?: number
  max?: number
  step?: number
}

/** On/off switch. */
export interface BooleanControl extends Grouped {
  name: string
  kind: 'boolean'
  default: boolean
}

/** Dropdown constrained to `options`. */
export interface SelectControl extends Grouped {
  name: string
  kind: 'select'
  options: string[]
  default: string
}

/**
 * Color swatch picker + hex field. A default of `''` reads as "inherit" — the
 * component falls back to whatever its variant/tone preset specifies, and the
 * prop stays out of the generated JSX until you actually pick a color.
 */
export interface ColorControl extends Grouped {
  name: string
  kind: 'color'
  default: string
}

export type Control =
  | TextControl
  | TextareaControl
  | EventControl
  | NumberControl
  | BooleanControl
  | SelectControl
  | ColorControl

export type ControlKind = Control['kind']

/** Describes the child text a component accepts, if any. */
export interface ChildrenControl extends Grouped {
  kind: 'text'
  default: string
}

/**
 * A place where a composite renders another registered component.
 *
 * The slot's controls come from the target component's own manifest, so there's
 * exactly one definition of what an `Avatar` can do no matter how many
 * composites embed one.
 */
export interface SlotDefinition {
  /**
   * The prop the finished element is passed through — `avatar={<Avatar … />}`.
   * The special name `children` nests it instead: `<Card><Avatar … /></Card>`.
   */
  name: string
  /** Manifest name of the component that fills this slot. */
  component: string
  /** Section heading in the controls panel; defaults to the component name. */
  label?: string
  /** Overrides for the target's own defaults, for a sensible starting point. */
  defaults?: PropValues
  /** Overrides the target's default child text. */
  childrenDefault?: string
  /**
   * Drive this slot's `width` from the parent's, less the parent's padding.
   *
   * Without it a nested component keeps whatever width its own manifest
   * declared, which is fine while the parent is at its default size and wrong
   * the moment it is not: a `StatCard` fitted to a 520px cell was drawing a
   * 224px sparkline across it, and no amount of resizing the card moved the
   * chart. Only for slots that are *meant* to span — a `Button` slot stretched
   * to the full width of its card would be a different bug.
   *
   * `when` restricts it to a parent layout where spanning is right; StatCard's
   * chart shares a row with the metric when `chartPosition` is `right`, and
   * there the full width is exactly what it must not take.
   */
  fitWidth?: boolean | { when: PropValues }
}

export interface ComponentManifest {
  /** Displayed in the sidebar and used verbatim as the JSX tag name. */
  name: string
  component: ComponentType<any>
  /**
   * Sidebar section this component files under. Anything unrecognised — or
   * omitted — collects under "Other", so a new component still shows up.
   * The section order lives in `src/lib/categories.ts`.
   */
  category?: string
  props: Control[]
  children?: ChildrenControl
  /**
   * Sub-components this one renders. Each becomes its own collapsible section in
   * the controls panel and appears nested in the generated JSX.
   */
  slots?: SlotDefinition[]
  /**
   * Makes the preview two-way. Maps a callback prop to the control it writes
   * back to — `{ onChange: 'checked' }` means calling `onChange(next)` sets the
   * `checked` control to `next`, updating the panel and the generated JSX.
   *
   * The playground supplies these handlers itself, so they never appear in the
   * generated code.
   */
  bindings?: Record<string, string>
}

/** Every control kind resolves to one of these primitives. */
export type ControlValue = string | number | boolean

export type PropValues = Record<string, ControlValue>

/** The live state for one slot — the same shape as a component's own values. */
export interface SlotValues {
  props: PropValues
  children: string
}

/** The live, user-edited state for one component. */
export interface PlaygroundValues {
  props: PropValues
  /** Empty string means "no children" — the component renders self-closing. */
  children: string
  /** Keyed by slot name. Slot components are configured one level deep. */
  slots: Record<string, SlotValues>
}
