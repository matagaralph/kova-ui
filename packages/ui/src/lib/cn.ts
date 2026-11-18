export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [className: string]: unknown }

const append = (out: string[], value: ClassValue) => {
  if (!value || value === true) return
  if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
    out.push(String(value))
  } else if (Array.isArray(value)) {
    for (const item of value) append(out, item)
  } else {
    for (const key in value) if (value[key]) out.push(key)
  }
}

/** Joins class names, skipping falsy values. Takes the same arguments as `clsx`. */
export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  for (const value of values) append(out, value)
  return out.join(" ")
}

/** A ui-sdk `className`: a string, or a function of the part's state. */
export type StateClassName<State> = string | ((state: State) => string | undefined)

/**
 * Puts Kova's classes in front of a ui-sdk part's `className`, keeping it a function of the part's
 * state when the caller passed one.
 */
export function mergeClassName<State>(
  base: ClassValue,
  className: StateClassName<State> | undefined,
): StateClassName<State> {
  if (typeof className === "function") {
    return (state: State) => cn(base, className(state))
  }
  return cn(base, className)
}
