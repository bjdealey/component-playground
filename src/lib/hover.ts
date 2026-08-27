import type { CSSProperties } from 'react'

/**
 * The hover contract.
 *
 * Hover styling can't be applied inline: an inline `background-color` outranks
 * every stylesheet rule, so a `:hover` rule that set the same property would never
 * win. Everything a hover rule needs therefore travels as a **custom property**,
 * and the stylesheet keeps control of the state:
 *
 * ```css
 * .item {
 *   background-color: var(--menu-background);
 * }
 *
 * .item:hover,
 * .item[data-hover] {
 *   background-color: var(--menu-hover-background, var(--menu-background));
 *   filter: brightness(var(--menu-hover-brightness, 1));
 * }
 * ```
 *
 * The `var(--x-hover-background, var(--x-background))` fallback is load-bearing.
 * A bare `var(--x-hover-background)` that resolves to nothing is invalid at
 * computed-value time and the property falls back to *unset* — which would strip
 * the element's normal background the moment the pointer arrived.
 */
export interface HoverStyle {
  /** Empty string leaves the base colour alone. */
  background?: string
  color?: string
  borderColor?: string
  /** 1 is unchanged. Below 1 darkens, above 1 lightens — works on any backdrop. */
  brightness?: number
  /** 1 is unchanged. A subtle lift, e.g. 1.06. */
  scale?: number
}

/**
 * Custom properties for one hover target.
 *
 * `namespace` prefixes them — custom properties inherit, so an unprefixed
 * `--hover-background` set on a row would silently reach any nested component
 * with a hover rule of its own. Prefixing costs nothing and removes the whole
 * class of bug.
 *
 * Empty colours are omitted rather than emitted blank, so the `var()` fallback in
 * the stylesheet is what takes effect.
 */
export function hoverStyle(
  namespace: string,
  { background, color, borderColor, brightness, scale }: HoverStyle,
): CSSProperties {
  const style: Record<string, string | number> = {}

  if (background) style[`--${namespace}-hover-background`] = background
  if (color) style[`--${namespace}-hover-color`] = color
  if (borderColor) style[`--${namespace}-hover-border`] = borderColor
  if (brightness !== undefined) style[`--${namespace}-hover-brightness`] = brightness
  if (scale !== undefined) style[`--${namespace}-hover-scale`] = scale

  return style as CSSProperties
}

export interface HoverProps {
  'data-hover'?: true
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/**
 * Pins the hover state, and reports pointer entry and exit.
 *
 * `hovered` exists because you cannot hold the pointer over a component and drag
 * its hover-colour slider at the same time — the state you're editing disappears
 * the moment you reach for the control. It is a real prop rather than something
 * the playground fakes, so the preview never shows a state the copied JSX doesn't
 * express.
 *
 * Pointer-only by design: hover is not focus, and conflating them would report a
 * hover that never happened when someone tabs through.
 */
export function hoverable(
  hovered?: boolean,
  onHoverChange?: (hovered: boolean) => void,
): HoverProps {
  return {
    // `false` would still serialise as the attribute `data-hover="false"`, which
    // the `[data-hover]` selector matches. Only `undefined` removes it.
    'data-hover': hovered ? true : undefined,
    onMouseEnter: onHoverChange ? () => onHoverChange(true) : undefined,
    onMouseLeave: onHoverChange ? () => onHoverChange(false) : undefined,
  }
}
