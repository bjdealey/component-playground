import { Component, type ErrorInfo, type ReactNode } from 'react'
import styles from './PreviewBoundary.module.css'

interface PreviewBoundaryProps {
  /** Changing this resets the boundary — selecting another component retries. */
  resetKey: string
  /**
   * Also retries whenever this changes identity. Passing the live values means
   * that fixing the prop which caused the throw recovers immediately, instead of
   * leaving the stage stuck until "Try again" is pressed.
   */
  retryOn?: unknown
  children: ReactNode
}

interface PreviewBoundaryState {
  error: Error | null
  componentStack: string
}

/**
 * Catches a throw from the previewed component.
 *
 * Without this, one bad render takes down the whole playground — and the whole
 * point of the tool is pointing it at components you're actively editing, which
 * is exactly when they throw. A class is required: hooks can't catch render
 * errors.
 */
export default class PreviewBoundary extends Component<
  PreviewBoundaryProps,
  PreviewBoundaryState
> {
  state: PreviewBoundaryState = { error: null, componentStack: '' }

  static getDerivedStateFromError(error: Error): Partial<PreviewBoundaryState> {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Still log it — the console stack is more use than anything shown on screen.
    console.error(`[preview] ${this.props.resetKey} threw during render:`, error)
    this.setState({ componentStack: info.componentStack ?? '' })
  }

  componentDidUpdate(previous: PreviewBoundaryProps) {
    if (!this.state.error) return
    const changed =
      previous.resetKey !== this.props.resetKey ||
      previous.retryOn !== this.props.retryOn
    if (changed) this.setState({ error: null, componentStack: '' })
  }

  render() {
    const { error, componentStack } = this.state
    if (!error) return this.props.children

    // The first frame naming a component is the most useful line to surface.
    const frame = componentStack
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.startsWith('at '))

    return (
      <div className={styles.failure} role="alert">
        <span className={styles.badge}>Render failed</span>

        <p className={styles.message}>
          <code>{this.props.resetKey}</code> threw while rendering.
        </p>

        <pre className={styles.detail}>
          {error.message || String(error)}
          {frame ? `\n${frame}` : ''}
        </pre>

        <p className={styles.hint}>
          Fix the component and save — the dev server reloads it. Controls stay as
          you left them, and picking another component clears this.
        </p>

        <button
          type="button"
          className={styles.retry}
          onClick={() => this.setState({ error: null, componentStack: '' })}
        >
          Try again
        </button>
      </div>
    )
  }
}
