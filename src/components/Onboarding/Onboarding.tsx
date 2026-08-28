import type { CSSProperties, ReactNode } from 'react'
import styles from './Onboarding.module.css'

export interface OnboardingProps {
  title?: string
  subtitle?: string
  /** One step per line: `Label | done` or `Label | todo`. */
  steps?: string
  showProgress?: boolean
  /** Call to action — compose a `<Button />` here. */
  primaryAction?: ReactNode
  width?: number
  padding?: number
  gap?: number
  radius?: number
  borderWidth?: number
  bordered?: boolean
  titleSize?: number
  stepSize?: number
  background?: string
  titleColor?: string
  textColor?: string
  labelColor?: string
  accentColor?: string
  pendingColor?: string
  borderColor?: string
  onStep?: (index: number) => void
}

interface Step {
  label: string
  done: boolean
}

function parseSteps(steps: string): Step[] {
  return steps
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [label = '', state = ''] = line.split('|').map((part) => part.trim())
      return { label, done: state.toLowerCase() === 'done' }
    })
}

const DEFAULT_STEPS = [
  'Create your workspace | done',
  'Connect a repository | done',
  'Invite a teammate | todo',
  'Ship your first preview | todo',
].join('\n')

const Check = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

export default function Onboarding({
  title = 'Get set up',
  subtitle = 'Finish these to unlock your workspace.',
  steps = DEFAULT_STEPS,
  showProgress = true,
  primaryAction,
  width = 360,
  padding = 22,
  gap = 14,
  radius = 16,
  borderWidth = 1,
  bordered = true,
  titleSize = 17,
  stepSize = 13.5,
  background = '#ffffff',
  titleColor = '#17191c',
  textColor = '#17191c',
  labelColor = '#6b7280',
  accentColor = '#4f46e5',
  pendingColor = '#e3e6ea',
  borderColor = '#e3e6ea',
  onStep,
}: OnboardingProps) {
  const items = parseSteps(steps)
  const done = items.filter((step) => step.done).length
  const pct = items.length ? Math.round((done / items.length) * 100) : 0

  const root: CSSProperties = {
    width,
    padding,
    gap,
    borderRadius: radius,
    borderWidth: bordered ? borderWidth : 0,
    borderColor,
    borderStyle: bordered ? 'solid' : undefined,
    backgroundColor: background,
  }

  return (
    <div className={styles.card} style={root}>
      <div className={styles.head}>
        <h2 className={styles.title} style={{ fontSize: titleSize, color: titleColor }}>
          {title}
        </h2>
        {subtitle && (
          <p className={styles.subtitle} style={{ color: labelColor }}>
            {subtitle}
          </p>
        )}
      </div>

      {showProgress && items.length > 0 && (
        <div className={styles.progress}>
          <div className={styles.meta}>
            <span style={{ color: labelColor }}>
              {done} of {items.length} complete
            </span>
            <span style={{ color: accentColor, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
          </div>
          <div className={styles.track} style={{ background: pendingColor }}>
            <span
              className={styles.fill}
              style={{ transform: `scaleX(${pct / 100})`, background: accentColor }}
            />
          </div>
        </div>
      )}

      <ul className={styles.steps} style={{ gap: gap * 0.7 }}>
        {items.map((step, index) => (
          <li key={`${step.label}-${index}`}>
            <button
              type="button"
              className={styles.step}
              data-done={step.done || undefined}
              onClick={() => onStep?.(index)}
            >
              <span
                className={styles.mark}
                style={
                  step.done
                    ? { background: accentColor, borderColor: accentColor, color: '#ffffff' }
                    : { borderColor: pendingColor, color: 'transparent' }
                }
                aria-hidden="true"
              >
                <Check />
              </span>
              <span
                className={styles.label}
                style={{
                  fontSize: stepSize,
                  color: step.done ? labelColor : textColor,
                  textDecoration: step.done ? 'line-through' : undefined,
                }}
              >
                {step.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {primaryAction && <div className={styles.action}>{primaryAction}</div>}
    </div>
  )
}
