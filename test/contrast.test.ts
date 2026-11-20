import { describe, expect, test } from "vite-plus/test"
import { contrast, over, readTokens, resolveColor, type Mode } from "./utils/tokens.js"

const tokens = readTokens()
const MODES: Mode[] = ["light", "dark"]
const COLORS = ["info", "warning", "caution", "danger", "success", "discovery"]
const SURFACES = ["--color-surface", "--color-surface-secondary"]

function color(name: string, mode: Mode) {
  const value = tokens.get(name)
  if (value === undefined) throw new Error(`${name} isn't defined`)
  const resolved = resolveColor(tokens, value, mode)
  if (!resolved) throw new Error(`${name} doesn't resolve to a color in ${mode} mode`)
  return resolved
}

/** A fill that may be translucent, laid over the surface it sits on */
function fill(name: string, surface: string, mode: Mode) {
  return over(color(name, mode), color(surface, mode))
}

function ratio(text: string, background: string, mode: Mode, surface = "--color-surface") {
  return contrast(color(text, mode), fill(background, surface, mode))
}

const textPairs: [text: string, background: string][] = [
  ["--color-text", "--color-surface"],
  ["--color-text-secondary", "--color-surface"],
  ["--color-text-tertiary", "--color-surface"],
  ["--color-text-primary-solid", "--color-background-primary-solid"],
  ["--color-text-secondary-solid", "--color-background-secondary-solid"],
  ["--color-text-secondary-solid", "--color-background-secondary-solid-hover"],
  ...COLORS.flatMap((c): [string, string][] => [
    [`--color-text-${c}`, "--color-surface"],
    [`--color-text-${c}-solid`, `--color-background-${c}-solid`],
    [`--color-text-${c}-solid`, `--color-background-${c}-solid-hover`],
    [`--color-text-${c}-soft`, `--color-background-${c}-soft`],
    [`--color-text-${c}-soft`, `--color-background-${c}-soft-alpha`],
    [`--color-text-${c}-outline`, "--color-surface"],
    [`--color-text-${c}-ghost`, "--color-surface"],
    [`--color-text-${c}-ghost`, `--color-background-${c}-ghost-hover`],
  ]),
]

describe.each(MODES)("%s mode", (mode) => {
  test.each(SURFACES)("text meets 4.5:1 on %s", (surface) => {
    for (const [text, background] of textPairs) {
      const bg = background === "--color-surface" ? surface : background
      expect.soft(ratio(text, bg, mode, surface), `${text} on ${bg}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test("focus rings meet 3:1 against every surface", () => {
    for (const ring of ["--color-ring", "--color-ring-danger"]) {
      for (const surface of SURFACES) {
        expect.soft(ratio(ring, surface, mode), `${ring} on ${surface}`).toBeGreaterThanOrEqual(3)
      }
    }
  })
})
