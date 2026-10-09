/// <reference path="../global.ts" preserve="true" />
import { useMediaQuery } from "usehooks-ts"
import { isDev } from "../lib/constants.js"

export const cache = new Map<string, number>()
let rootStyles: CSSStyleDeclaration | null = null

// Fallbacks mirror defaults from postcss.config.mjs
const FALLBACK_BREAKPOINTS: Record<Kova.Breakpoint, number> = {
  "xs": 380,
  "sm": 576,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536,
} as const

const resolveBreakpoint = (bp: Kova.Breakpoint): number => {
  if (!cache.has(bp)) {
    rootStyles ||= getComputedStyle(document.documentElement)

    const value = parseInt(
      rootStyles.getPropertyValue(`--breakpoint-${bp}`).trim().replace("px", ""),
      10,
    )

    if (!value) {
      if (isDev) {
        // eslint-disable-next-line no-console
        console.warn(
          `--breakpoint-${bp} is not defined in :root. Falling back to default breakpoint map.\n` +
            "This usually means your postcss breakpoints and Kova.Breakpoint types are out of sync.",
        )
      }

      // If the breakpoint is not in the fallback map, use the default "lg" breakpoint.
      const validBp = bp in FALLBACK_BREAKPOINTS ? bp : "lg"
      // Return early and don't cache fallbacks in case CSS variables load later
      return FALLBACK_BREAKPOINTS[validBp]
    }

    cache.set(bp, value)
  }

  return cache.get(bp)!
}

export const useBreakpoint = (bp: Kova.Breakpoint): boolean =>
  useMediaQuery(`(min-width: ${resolveBreakpoint(bp)}px)`)
