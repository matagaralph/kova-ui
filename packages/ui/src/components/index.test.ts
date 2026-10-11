import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vite-plus/test"

// happy-dom replaces the global URL, so resolve paths with Node helpers
const componentsDir = dirname(fileURLToPath(import.meta.url))

describe("kova-ui/components", () => {
  it("exports every component folder except icons", () => {
    const folders = readdirSync(componentsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "Icon")
      .map((entry) => entry.name)
      .sort()
    const barrel = readFileSync(join(componentsDir, "index.ts"), "utf8")
    const exported = [...barrel.matchAll(/from "\.\/(\w+)\/index\.js"/g)]
      .map((match) => match[1])
      .sort()

    expect(exported).toEqual(folders)
  })
})
