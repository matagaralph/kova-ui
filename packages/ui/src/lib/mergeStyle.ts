import type { CSSProperties } from "react"

/** A ui-sdk `style`: an object, or a function of the part's state. */
export type StateStyle<State> = CSSProperties | ((state: State) => CSSProperties | undefined)

/**
 * Puts Kova's styles under a ui-sdk part's `style`, keeping it a function of the part's state when
 * the caller passed one.
 */
export function mergeStyle<State>(
  base: CSSProperties | undefined,
  style: StateStyle<State> | undefined,
): StateStyle<State> | undefined {
  if (!base) return style
  if (typeof style === "function") {
    return (state: State) => ({ ...base, ...style(state) })
  }
  return { ...base, ...style }
}
