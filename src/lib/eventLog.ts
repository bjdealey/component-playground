/**
 * The preview's event log.
 *
 * Every handler prop the playground supplies is wired through here, so clicking
 * something in the stage produces visible evidence that the callback fired — and
 * with what. Without it a handler prop is the one kind of control you can't see
 * working.
 */

export interface LoggedEvent {
  /** Monotonic, so React keys stay stable as older entries fall off. */
  id: number
  /** `onClick`, or `cta.onClick` for a slot's handler. */
  name: string
  /** Formatted arguments, ready to render. */
  args: string[]
  /** Local wall-clock, to the second. */
  time: string
  /** Consecutive identical fires collapse into one row. */
  count: number
  /** High-frequency handler — collapses on name alone, not name plus args. */
  noisy?: boolean
}

/** Enough to see a burst of clicks; short enough to stay cheap to render. */
export const EVENT_LOG_LIMIT = 40

const MAX_ARG = 48

function truncate(text: string): string {
  return text.length > MAX_ARG ? `${text.slice(0, MAX_ARG - 1)}…` : text
}

/**
 * Render one callback argument as a short string.
 *
 * React hands synthetic events to plain `onClick` handlers; dumping one would
 * bury the log in internals, so it collapses to its type.
 */
function formatArg(arg: unknown): string {
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'

  switch (typeof arg) {
    case 'string':
      return truncate(JSON.stringify(arg))
    case 'number':
    case 'boolean':
    case 'bigint':
      return String(arg)
    case 'function':
      return `ƒ ${arg.name || 'anonymous'}`
    case 'symbol':
      return arg.toString()
  }

  const record = arg as Record<string, unknown>
  if ('nativeEvent' in record || record.target instanceof EventTarget) {
    return `${String(record.type ?? 'event')} event`
  }

  try {
    return truncate(JSON.stringify(arg))
  } catch {
    // Circular, or a getter that throws.
    return String(arg)
  }
}

export function formatArgs(args: unknown[]): string[] {
  return args.map(formatArg)
}

function sameEvent(
  entry: LoggedEvent,
  name: string,
  args: string[],
  noisy: boolean,
): boolean {
  if (entry.name !== name) return false
  // A noisy handler alternates its argument by nature — enter true, leave false —
  // so matching on args too would never collapse anything and the log would fill
  // with pointer drift. Name alone is the right grain for these.
  if (noisy) return true
  return (
    entry.args.length === args.length &&
    entry.args.every((arg, index) => arg === args[index])
  )
}

/**
 * Newest first, capped, with consecutive identical fires counted rather than
 * repeated — ten clicks on the same button read better as `×10` than as ten rows
 * that push everything else out of the window.
 */
export function appendEvent(
  log: LoggedEvent[],
  name: string,
  rawArgs: unknown[],
  nextId: number,
  time: string,
  noisy = false,
): LoggedEvent[] {
  const args = formatArgs(rawArgs)
  const [newest, ...rest] = log

  if (newest && sameEvent(newest, name, args, noisy)) {
    // Latest args win, so a collapsed hover row still reads as the current state.
    return [{ ...newest, args, count: newest.count + 1, time }, ...rest]
  }

  return [{ id: nextId, name, args, time, count: 1, noisy }, ...log].slice(
    0,
    EVENT_LOG_LIMIT,
  )
}

export function eventTime(): string {
  return new Date().toLocaleTimeString(undefined, { hour12: false })
}
