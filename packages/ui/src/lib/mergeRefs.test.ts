import { createRef } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { mergeRefs } from "./mergeRefs.js"

describe("mergeRefs", () => {
  it("sets object and callback refs", () => {
    const objectRef = createRef<string>()
    const callbackRef = vi.fn()

    mergeRefs([objectRef, callbackRef, null, undefined])("node")

    expect(objectRef.current).toBe("node")
    expect(callbackRef).toHaveBeenCalledWith("node")
  })

  it("clears every ref on cleanup", () => {
    const objectRef = createRef<string>()
    const callbackRef = vi.fn()

    const cleanup = mergeRefs([objectRef, callbackRef])("node")
    cleanup?.()

    expect(objectRef.current).toBeNull()
    expect(callbackRef).toHaveBeenLastCalledWith(null)
  })

  it("runs a callback ref's own cleanup instead of calling it with null", () => {
    const innerCleanup = vi.fn()
    const callbackRef = vi.fn(() => innerCleanup)

    const cleanup = mergeRefs([callbackRef])("node")
    cleanup?.()

    expect(innerCleanup).toHaveBeenCalledOnce()
    expect(callbackRef).toHaveBeenCalledTimes(1)
  })
})
