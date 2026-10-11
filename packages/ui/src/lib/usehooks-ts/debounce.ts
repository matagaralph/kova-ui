// Ported from lodash.debounce v4.0.8 (MIT, Copyright JS Foundation and other contributors), see
// ./LICENSE.lodash. https://github.com/lodash/lodash/blob/4.17.21/debounce.js
// Changed: TypeScript port of the same algorithm, used by `useDebounceCallback` in place of the
// `lodash.debounce` dependency.

export type DebounceOptions = {
  /** Invoke on the leading edge of the timeout. */
  leading?: boolean
  /** Invoke on the trailing edge of the timeout. */
  trailing?: boolean
  /** The maximum time the function is allowed to be delayed before it's invoked. */
  maxWait?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunc<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined
  /** Cancels a pending invocation. */
  cancel: () => void
  /** Immediately invokes a pending invocation. */
  flush: () => ReturnType<T> | undefined
}

/**
 * Creates a debounced function that delays invoking `func` until `wait` milliseconds have elapsed
 * since the last time it was invoked.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  options: DebounceOptions = {},
): DebouncedFunc<T> {
  let lastArgs: Parameters<T> | undefined
  let lastThis: unknown
  let result: ReturnType<T> | undefined
  let timerId: ReturnType<typeof setTimeout> | undefined
  let lastCallTime: number | undefined
  let lastInvokeTime = 0

  const leading = !!options.leading
  const maxing = "maxWait" in options
  const maxWait = maxing ? Math.max(options.maxWait || 0, wait) : 0
  const trailing = "trailing" in options ? !!options.trailing : true

  function invokeFunc(time: number) {
    const args = lastArgs as Parameters<T>
    const thisArg = lastThis
    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime as number)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time: number) {
    if (lastCallTime === undefined) return true
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    return (
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      trailingEdge(time)
      return
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced(this: unknown, ...args: Parameters<T>) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
