// @vitest-environment node
import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

import postcss from "postcss"
import { compile } from "tailwindcss"
import { describe, expect, test } from "vite-plus/test"

// @ts-expect-error -- the shared PostCSS config is plain JavaScript
import { platformUIRequiredPlugins } from "../postcss.config.mjs"

const STYLES_DIR = path.resolve(import.meta.dirname, "../packages/ui/src/styles")
const TAILWIND_DIR = path.dirname(
  createRequire(import.meta.url).resolve("tailwindcss/package.json"),
)

/** Each stylesheet as `scripts/build-css.mjs` writes it to `dist` */
async function buildStylesheet(file: string) {
  const from = path.join(STYLES_DIR, file)
  const source = await readFile(from, "utf8")
  if (file === "index.css") return source
  const result = await postcss(platformUIRequiredPlugins({ tailwind: false })).process(source, {
    from,
    map: false,
  })
  return result.css
}

/** Compiles `@import "kova-ui/css"` against the built stylesheets, as a consuming app does */
async function compileApp(candidates: string[]) {
  const compiler = await compile('@import "tailwindcss"; @import "kova-ui/css";', {
    base: STYLES_DIR,
    async loadStylesheet(id, base) {
      if (id === "tailwindcss") {
        const file = path.join(TAILWIND_DIR, "index.css")
        return { path: file, base: TAILWIND_DIR, content: await readFile(file, "utf8") }
      }
      if (id.startsWith("./") && base === TAILWIND_DIR) {
        const file = path.join(TAILWIND_DIR, id)
        return { path: file, base, content: await readFile(file, "utf8") }
      }
      const name = id === "kova-ui/css" ? "index.css" : `${path.basename(id, ".css")}.css`
      return {
        path: path.join(STYLES_DIR, name),
        base: STYLES_DIR,
        content: await buildStylesheet(name),
      }
    },
  })
  return compiler.build(candidates)
}

describe("built styles", () => {
  test("keep Tailwind's directives for the consuming app to compile", async () => {
    const utilities = await buildStylesheet("tailwind-utilities.css")
    expect(utilities).toContain("@theme {")
    expect(utilities).toMatch(/@utility text-secondary\b/)

    const semantic = await buildStylesheet("variables-semantic.css")
    expect(semantic).toContain("@theme static {")
    expect(semantic).toContain("--breakpoint-sm: 576px;")
  })

  test("generate Kova's utilities, variants and breakpoints in an app", async () => {
    const css = await compileApp([
      "text-secondary",
      "bg-surface",
      "border-default",
      "heading-lg",
      "dark:text-secondary",
      "light:bg-surface",
      "sm:flex",
    ])

    expect(css).toContain(".text-secondary {")
    expect(css).toContain(".bg-surface {")
    expect(css).toContain(".border-default {")
    expect(css).toContain(".heading-lg {")
    expect(css).toContain(".dark\\:text-secondary:where(")
    expect(css).toContain(".light\\:bg-surface:where(")
    expect(css).toContain("@media (width >= 576px)")
  })
})
