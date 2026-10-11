import type { Ref, RefCallback } from "react"

/**
 * Combines refs into one callback ref, for elements that need an internal ref and a forwarded one.
 * Uses React 19 ref cleanup, so callback refs that return a cleanup function are cleaned up too.
 */
export function mergeRefs<T>(refs: Array<Ref<T> | undefined | null>): RefCallback<T> {
  return (value) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(value)
        return typeof cleanup === "function" ? cleanup : () => ref(null)
      }
      if (ref) {
        ref.current = value
        return () => {
          ref.current = null
        }
      }
      return undefined
    })

    return () => cleanups.forEach((cleanup) => cleanup?.())
  }
}
