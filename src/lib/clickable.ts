import type { KeyboardEvent } from 'react'

/**
 * Props that turn a plain container into a keyboard-operable click target.
 *
 * A `div` with an `onClick` and nothing else is invisible to keyboard and screen
 * reader users, so the role, the tab stop and the Enter/Space handling always
 * travel together — hence one helper rather than the same four lines copied into
 * every clickable component.
 *
 * Pass `undefined` and you get an empty object back: with no handler the element
 * must stay non-interactive rather than advertise a tab stop that does nothing.
 *
 * Caveat worth knowing: `role="button"` must not wrap other interactive content.
 * If a clickable container needs a button inside it, give the *inner* element the
 * handler instead of reaching for this.
 */
export interface ClickableProps {
  role?: 'button'
  tabIndex?: 0
  onClick?: () => void
  onKeyDown?: (event: KeyboardEvent) => void
}

export interface ClickableOptions {
  /**
   * Set `false` on an element that already carries a meaningful role — a `tr` is
   * a `row`, and overwriting that with `button` breaks the table for a screen
   * reader. The tab stop and the key handling still apply.
   */
  role?: boolean
}

export function clickable(
  activate?: () => void,
  { role = true }: ClickableOptions = {},
): ClickableProps {
  if (!activate) return {}

  return {
    role: role ? 'button' : undefined,
    tabIndex: 0,
    // Deliberately drops the event rather than forwarding it. The two activation
    // paths carry different event types, so passing them through would hand the
    // consumer a MouseEvent from the pointer and a KeyboardEvent from Enter — and
    // anything reading `event.clientX` would work with the mouse and break on the
    // keyboard. Zero arguments is the one signature both paths can honour.
    onClick: () => activate(),
    onKeyDown: (event) => {
      // Native buttons fire on both; Space also scrolls, so it needs stopping.
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      activate()
    },
  }
}
