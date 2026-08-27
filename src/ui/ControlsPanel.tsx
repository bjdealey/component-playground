import { useEffect, useRef, type ReactNode } from 'react'
import type {
  ComponentManifest,
  ControlValue,
  PlaygroundValues,
} from '../lib/types'
import { getManifest } from '../lib/registry'
import ControlRenderer from './controls/ControlRenderer'
import Field from './controls/Field'
import TextInput from './controls/TextInput'
import styles from './ControlsPanel.module.css'

interface ControlsPanelProps {
  manifest: ComponentManifest
  values: PlaygroundValues
  /** Context line under the header — compose mode says which block this is. */
  note?: ReactNode
  onPropChange: (name: string, value: ControlValue) => void
  onChildrenChange: (text: string) => void
  onSlotPropChange: (slot: string, name: string, value: ControlValue) => void
  onSlotChildrenChange: (slot: string, text: string) => void
  onReset: () => void
}

interface Section {
  name: string
  nodes: ReactNode[]
}

/** Ungrouped controls collect under this sentinel and render without a header. */
const UNGROUPED = ''

export default function ControlsPanel({
  manifest,
  values,
  note,
  onPropChange,
  onChildrenChange,
  onSlotPropChange,
  onSlotChildrenChange,
  onReset,
}: ControlsPanelProps) {
  // Selecting a different component should land you at the top of its controls,
  // not wherever the previous component happened to be scrolled to.
  const bodyRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [manifest.name])

  const sections: Section[] = []
  const indexOf = new Map<string, number>()

  function push(group: string, node: ReactNode) {
    let index = indexOf.get(group)
    if (index === undefined) {
      index = sections.length
      indexOf.set(group, index)
      sections.push({ name: group, nodes: [] })
    }
    sections[index].nodes.push(node)
  }

  if (manifest.children) {
    push(
      manifest.children.group ?? UNGROUPED,
      <Field key="children" name="children" value={values.children}>
        <TextInput
          name="children"
          value={values.children}
          onChange={onChildrenChange}
        />
      </Field>,
    )
  }

  for (const control of manifest.props) {
    push(
      control.group ?? UNGROUPED,
      <ControlRenderer
        key={control.name}
        control={control}
        value={values.props[control.name] ?? control.default}
        onChange={(value) => onPropChange(control.name, value)}
      />,
    )
  }

  return (
    <aside className={styles.panel} aria-label="Controls">
      <div className={styles.header}>
        <span className={styles.title}>Controls</span>
        <button type="button" className={styles.reset} onClick={onReset}>
          Reset to defaults
        </button>
      </div>

      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.body} ref={bodyRef}>
        {sections.length === 0 && (manifest.slots ?? []).length === 0 && (
          <p className={styles.empty}>
            <code>{manifest.name}</code> declares no props in its manifest.
          </p>
        )}

        {sections.map((section) =>
          section.name === UNGROUPED ? (
            <div key={UNGROUPED}>{section.nodes}</div>
          ) : (
            <details key={section.name} className={styles.group} open>
              <summary className={styles.groupHeader}>
                <span className={styles.chevron} aria-hidden="true" />
                <span className={styles.groupName}>{section.name}</span>
                <span className={styles.groupCount}>{section.nodes.length}</span>
              </summary>
              {section.nodes}
            </details>
          ),
        )}

        {/*
          Slot sections come from the target component's own manifest, so an
          Avatar embedded here offers exactly the controls Avatar offers alone.
          Collapsed by default — a composite's slots can add dozens of controls.
        */}
        {(manifest.slots ?? []).map((slot) => {
          const target = getManifest(slot.component)
          const slotValues = values.slots[slot.name]
          if (!target || !slotValues) return null

          const count = target.props.length + (target.children ? 1 : 0)

          return (
            <details key={slot.name} className={`${styles.group} ${styles.slotGroup}`}>
              <summary className={styles.groupHeader}>
                <span className={styles.chevron} aria-hidden="true" />
                <span className={styles.groupName}>
                  {slot.label ?? slot.component}
                </span>
                <span className={styles.slotTag}>
                  {slot.name === 'children' ? 'children' : slot.name}
                </span>
                <span className={styles.groupCount}>{count}</span>
              </summary>

              {target.children && (
                <Field
                  name={`${slot.name}.children`}
                  value={slotValues.children}
                  label="children"
                >
                  <TextInput
                    name={`${slot.name}.children`}
                    value={slotValues.children}
                    onChange={(text) => onSlotChildrenChange(slot.name, text)}
                  />
                </Field>
              )}

              {target.props.map((control) => (
                <ControlRenderer
                  key={control.name}
                  control={control}
                  value={slotValues.props[control.name] ?? control.default}
                  idPrefix={`${slot.name}.`}
                  onChange={(value) =>
                    onSlotPropChange(slot.name, control.name, value)
                  }
                />
              ))}
            </details>
          )
        })}
      </div>
    </aside>
  )
}
