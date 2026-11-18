import { describe, expect, it } from "vite-plus/test"
import { cn, mergeClassName } from "./cn.js"

describe("cn", () => {
  it("joins strings, arrays and objects, skipping falsy values", () => {
    expect(cn("a", false, null, undefined, 0, ["b", ["c"]], { d: true, e: false })).toBe("a b c d")
  })
})

describe("mergeClassName", () => {
  it("joins a string class name", () => {
    expect(mergeClassName("base", "extra")).toBe("base extra")
  })

  it("keeps a state function a function", () => {
    const merged = mergeClassName<{ open: boolean }>("base", (state) =>
      state.open ? "open" : undefined,
    )
    expect(typeof merged).toBe("function")
    if (typeof merged !== "function") return
    expect(merged({ open: true })).toBe("base open")
    expect(merged({ open: false })).toBe("base")
  })
})
