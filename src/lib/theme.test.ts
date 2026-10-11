import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test"

type ThemeModule = typeof import("./theme.js")

let systemDark = false
const mediaListeners = new Set<() => void>()

const mockMatchMedia = () => {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return query.includes("dark") && systemDark
        },
        media: query,
        addEventListener: (_: string, listener: () => void) => mediaListeners.add(listener),
        removeEventListener: (_: string, listener: () => void) => mediaListeners.delete(listener),
      }) as unknown as MediaQueryList,
  )
}

const setSystemDark = (dark: boolean) => {
  systemDark = dark
  mediaListeners.forEach((listener) => listener())
}

// The theme store is module state, so each test gets a fresh copy
const loadTheme = async (): Promise<ThemeModule> => {
  vi.resetModules()
  return import("./theme.js")
}

const root = () => document.documentElement

beforeEach(() => {
  systemDark = false
  mediaListeners.clear()
  localStorage.clear()
  root().removeAttribute("data-theme")
  root().style.colorScheme = ""
  mockMatchMedia()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("setTheme", () => {
  it("applies and persists the theme", async () => {
    const { setTheme, getTheme, THEME_STORAGE_KEY } = await loadTheme()

    setTheme("dark")

    expect(root()).toHaveAttribute("data-theme", "dark")
    expect(root().style.colorScheme).toBe("dark")
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark")
    expect(getTheme()).toBe("dark")
  })

  it("resolves system to the operating system color scheme", async () => {
    const { setTheme } = await loadTheme()
    systemDark = true

    setTheme("system")

    expect(root()).toHaveAttribute("data-theme", "dark")
  })

  it("follows operating system changes while the theme is system", async () => {
    const { setTheme } = await loadTheme()
    setTheme("system")

    act(() => setSystemDark(true))
    expect(root()).toHaveAttribute("data-theme", "dark")

    act(() => setSystemDark(false))
    expect(root()).toHaveAttribute("data-theme", "light")
  })

  it("ignores operating system changes when a theme is selected", async () => {
    const { setTheme } = await loadTheme()
    setTheme("light")

    act(() => setSystemDark(true))

    expect(root()).toHaveAttribute("data-theme", "light")
  })
})

describe("getTheme", () => {
  it("defaults to system", async () => {
    const { getTheme } = await loadTheme()
    expect(getTheme()).toBe("system")
  })

  it("reads the persisted theme", async () => {
    localStorage.setItem("kova-theme", "dark")
    const { getTheme } = await loadTheme()
    expect(getTheme()).toBe("dark")
  })

  it("ignores invalid persisted values", async () => {
    localStorage.setItem("kova-theme", "sepia")
    const { getTheme } = await loadTheme()
    expect(getTheme()).toBe("system")
  })
})

describe("useTheme", () => {
  it("returns the selected, resolved, and system themes", async () => {
    const { useTheme } = await loadTheme()
    systemDark = true

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe("system")
    expect(result.current.systemTheme).toBe("dark")
    expect(result.current.resolvedTheme).toBe("dark")
  })

  it("applies the initial theme when nothing else has", async () => {
    localStorage.setItem("kova-theme", "dark")
    const { useTheme } = await loadTheme()

    renderHook(() => useTheme())

    expect(root()).toHaveAttribute("data-theme", "dark")
  })

  it("updates when the theme is set, including from outside React", async () => {
    const { useTheme, setTheme } = await loadTheme()
    const { result } = renderHook(() => useTheme())

    act(() => result.current.setTheme("dark"))
    expect(result.current.theme).toBe("dark")
    expect(result.current.resolvedTheme).toBe("dark")

    act(() => setTheme("light"))
    expect(result.current.theme).toBe("light")
  })

  it("updates when the operating system color scheme changes", async () => {
    const { useTheme } = await loadTheme()
    const { result } = renderHook(() => useTheme())

    act(() => setSystemDark(true))

    expect(result.current.systemTheme).toBe("dark")
    expect(result.current.resolvedTheme).toBe("dark")
  })

  it("syncs a theme selected in another tab", async () => {
    const { useTheme } = await loadTheme()
    const { result } = renderHook(() => useTheme())

    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "kova-theme", newValue: "dark" }))
    })

    expect(result.current.theme).toBe("dark")
    expect(root()).toHaveAttribute("data-theme", "dark")
  })
})

describe("themeScript", () => {
  it("applies the persisted theme", async () => {
    localStorage.setItem("kova-theme", "dark")
    const { themeScript } = await loadTheme()

    new Function(themeScript)()

    expect(root()).toHaveAttribute("data-theme", "dark")
    expect(root().style.colorScheme).toBe("dark")
  })

  it("falls back to the operating system color scheme", async () => {
    systemDark = true
    const { themeScript } = await loadTheme()

    new Function(themeScript)()

    expect(root()).toHaveAttribute("data-theme", "dark")
  })
})
