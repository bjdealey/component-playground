/**
 * The controls panel's information architecture.
 *
 * The manifests grew twelve different group names across ninety components —
 * `Events` on one, `Motion` on another, one-off `Options` / `Social` / `Status`
 * — and the panel rendered each component's sections in whatever order that
 * manifest happened to declare its props. Read across components that is not one
 * design system, it is ninety of them: the same panel shows Colours before
 * Appearance here and after it there, `hovered` (a live preview state) sits in a
 * "Hover" section beside the styling of the hover state, and behaviour is filed
 * under a heading called "Events".
 *
 * This module is the single place that says what the sections *are*, what they
 * are *called*, and what order they read in. Canonicalising the taxonomy is one
 * edit here rather than ninety edits spread through the manifests — and a group
 * name nobody mapped still appears (as its own trailing section) so a new
 * component with a new group is never silently dropped.
 */

export interface PanelSection {
  id: string
  label: string
}

/**
 * The canonical sections, top to bottom: what the component *is* (content),
 * then how it looks (appearance, colour, type, spacing, effects), then the
 * states it can be previewed in, then how it behaves. Every component reads in
 * this order, so the panel is one shape to learn rather than ninety.
 */
export const SECTIONS: readonly PanelSection[] = [
  { id: 'content', label: 'Content' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'colors', label: 'Colours' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'effects', label: 'Effects' },
  { id: 'states', label: 'States' },
  { id: 'behavior', label: 'Behaviour' },
]

const SECTION_BY_ID = new Map(SECTIONS.map((section, index) => [section.id, index]))

/**
 * Every manifest group string, mapped onto a canonical section — by intent, not
 * spelling.
 *
 *   - `Events` is behaviour; `Motion` (an animation duration) is an effect.
 *   - The sign-in forms' `Options` / `Social` are content toggles and labels.
 *   - Avatar's `Status` dot is a piece of appearance.
 *   - `Hover` folds into `States`: hover is a state, and the colours that style
 *     it belong beside disabled and loading rather than in a section of their
 *     own that reads as a second set of colour controls.
 */
const GROUP_TO_SECTION: Record<string, string> = {
  Content: 'content',
  Structure: 'content',
  Options: 'content',
  Social: 'content',
  Appearance: 'appearance',
  Shape: 'appearance',
  Status: 'appearance',
  Colors: 'colors',
  Color: 'colors',
  Colours: 'colors',
  Typography: 'typography',
  Type: 'typography',
  Text: 'typography',
  Spacing: 'spacing',
  Size: 'spacing',
  Sizing: 'spacing',
  Layout: 'spacing',
  Effects: 'effects',
  Motion: 'effects',
  Depth: 'effects',
  State: 'states',
  States: 'states',
  Hover: 'states',
  Behavior: 'behavior',
  Behaviour: 'behavior',
  Events: 'behavior',
}

/**
 * The canonical section a manifest group belongs to, with a sort rank.
 *
 * An unmapped group keeps its own name and falls to the end, so it still shows
 * up — the zero-config promise the registry makes for a new component holds for
 * a new group too.
 */
export function resolveSection(group: string): PanelSection & { rank: number } {
  const id = GROUP_TO_SECTION[group]
  if (id !== undefined) {
    const rank = SECTION_BY_ID.get(id) ?? SECTIONS.length
    return { id, label: SECTIONS[rank].label, rank }
  }
  return { id: `custom:${group}`, label: group, rank: SECTIONS.length }
}
