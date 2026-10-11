import { useSyncExternalStore } from "react"

/** The selected theme. `"system"` follows the operating system setting. */
export type Theme = "light" | "dark" | "system"

/** The theme that is actually applied to the page. */
export type ResolvedTheme = "light" | "dark"

/** `localStorage` key the selected theme is persisted under. */
export const THEME_STORAGE_KEY = "kova-theme"

const DARK_QUERY = "(prefers-color-scheme: dark)"
const isBrowser = typeof window !== "undefined"

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark" || value === "system"

let currentTheme: Theme | null = null
let listening = false
const listeners = new Set<() => void>()

const readStoredTheme = (): Theme => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : "system"
  } catch {
    return "system"
  }
}

const emit = () => listeners.forEach((listener) => listener())

const applyTheme = (theme: ResolvedTheme) => {
  const root = document.documentElement
  root.setAttribute("data-theme", theme)
  root.style.colorScheme = theme
}

// Keeps the page in sync with OS changes and with other tabs, for the lifetime of the app
const listen = () => {
  if (listening || !isBrowser) return
  listening = true

  window.matchMedia?.(DARK_QUERY).addEventListener("change", () => {
    if (getTheme() === "system") applyTheme(getSystemTheme())
    emit()
  })

  window.addEventListener("storage", (event) => {
    if (event.key !== THEME_STORAGE_KEY) return
    currentTheme = isTheme(event.newValue) ? event.newValue : "system"
    applyTheme(resolveTheme(currentTheme))
    emit()
  })

  if (!document.documentElement.hasAttribute("data-theme")) {
    applyTheme(resolveTheme(getTheme()))
  }
}

/** Returns the selected theme, which may be `"system"`. */
export function getTheme(): Theme {
  if (!isBrowser) return "system"
  currentTheme ??= readStoredTheme()
  return currentTheme
}

/** Returns the operating system's color scheme. */
export function getSystemTheme(): ResolvedTheme {
  return isBrowser && window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light"
}

/** Resolves `"system"` to the operating system's color scheme. */
export function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme
}

/**
 * Selects a theme, applies it to the `html` element, and persists it in `localStorage`.
 * Works outside React, and updates every component using `useTheme`.
 */
export function setTheme(theme: Theme) {
  if (!isBrowser) return
  listen()
  currentTheme = theme
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable, such as in private browsing. The theme still applies.
  }
  applyTheme(resolveTheme(theme))
  emit()
}

const subscribe = (listener: () => void) => {
  listen()
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getServerTheme = (): Theme => "system"
const getServerSystemTheme = (): ResolvedTheme => "light"

export type UseThemeResult = {
  /** The selected theme, which may be `"system"` */
  theme: Theme
  /** The theme applied to the page, with `"system"` resolved */
  resolvedTheme: ResolvedTheme
  /** The operating system's color scheme */
  systemTheme: ResolvedTheme
  /** Selects and persists a theme */
  setTheme: (theme: Theme) => void
}

/** Reads and updates the theme. Re-renders when the theme or the OS color scheme changes. */
export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  const systemTheme = useSyncExternalStore(subscribe, getSystemTheme, getServerSystemTheme)

  return {
    theme,
    resolvedTheme: theme === "system" ? systemTheme : theme,
    systemTheme,
    setTheme,
  }
}

/**
 * Inline script that applies the persisted theme before the page paints, avoiding a flash of the
 * wrong theme. Render it in a `<script>` at the start of `<head>`.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark")t=window.matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches?"dark":"light";var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t}catch(e){}})()`
