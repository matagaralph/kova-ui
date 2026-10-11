import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test"
import { debounce } from "./debounce.js"

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe("debounce", () => {
  it("invokes once on the trailing edge with the latest arguments", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced("a")
    debounced("b")
    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith("b")
  })

  it("restarts the wait on every call", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    vi.advanceTimersByTime(60)
    debounced()
    vi.advanceTimersByTime(60)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(40)
    expect(fn).toHaveBeenCalledOnce()
  })

  it("invokes on the leading edge when enabled", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100, { leading: true, trailing: false })

    debounced("a")
    debounced("b")
    expect(fn).toHaveBeenCalledOnce()
    expect(fn).toHaveBeenCalledWith("a")

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it("invokes at least every maxWait while calls continue", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100, { maxWait: 150 })

    for (let i = 0; i < 4; i++) {
      debounced()
      vi.advanceTimersByTime(50)
    }

    expect(fn).toHaveBeenCalledOnce()
  })

  it("cancels a pending invocation", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    debounced.cancel()
    vi.advanceTimersByTime(100)

    expect(fn).not.toHaveBeenCalled()
  })

  it("flushes a pending invocation immediately", () => {
    const fn = vi.fn(() => "result")
    const debounced = debounce(fn, 100)

    debounced()
    expect(debounced.flush()).toBe("result")
    expect(fn).toHaveBeenCalledOnce()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })
})
