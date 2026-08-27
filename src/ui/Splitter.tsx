import type { Pane } from '../lib/panes'
import styles from './Splitter.module.css'

interface SplitterProps {
  pane: Pane
  /** Names what moves, e.g. "Controls panel width". */
  label: string
}

/**
 * The handle between two panes.
 *
 * Deliberately larger than it looks: the visible line is 1px, the grab area is
 * seven, because a 1px drag target is a thing you hunt for rather than a thing
 * you use. The line only shows itself on hover or while dragging, so at rest
 * the layout still reads as panels meeting rather than as a row of controls.
 *
 * `aria-orientation` is the reverse of the axis and that is correct, not a
 * slip: a separator that you drag left and right is a *vertical* separator.
 */
export default function Splitter({ pane, label }: SplitterProps) {
  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label={`${label} — arrow keys to resize, double-click to reset`}
      aria-orientation={pane.axis === 'x' ? 'vertical' : 'horizontal'}
      className={`${styles.splitter} ${
        pane.axis === 'x' ? styles.vertical : styles.horizontal
      } ${pane.dragging ? styles.dragging : ''}`}
      {...pane.handleProps}
    >
      {/* The exact size, shown only while dragging — the one moment the number
          matters and the only one it isn't in the way. */}
      {pane.dragging && (
        <span className={styles.readout} aria-hidden="true">
          {Math.round(pane.size)}px
        </span>
      )}
    </div>
  )
}
