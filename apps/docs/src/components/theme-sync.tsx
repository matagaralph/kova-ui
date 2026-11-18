import { useTheme as useFumadocsTheme } from "fumadocs-ui/provider/base"
import { useTheme as useKovaTheme, type Theme } from "kova-ui/theme"
import { useEffect, useRef } from "react"

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark" || value === "system"

/**
 * Fumadocs and Kova each keep a theme store under the same `localStorage` key. This keeps them
 * in step when either one changes it, like the docs' theme switch or Kova's `setTheme()`.
 */
export function ThemeSync() {
  const fumadocs = useFumadocsTheme()
  const kova = useKovaTheme()
  const last = useRef<Theme | null>(null)

  const fumadocsTheme = fumadocs.theme
  const setFumadocsTheme = fumadocs.setTheme
  const { theme: kovaTheme, setTheme: setKovaTheme } = kova

  useEffect(() => {
    if (!isTheme(fumadocsTheme) || fumadocsTheme === last.current) return
    last.current = fumadocsTheme
    if (kovaTheme !== fumadocsTheme) setKovaTheme(fumadocsTheme)
    // Only a change on the Fumadocs side should run this
    // oxlint-disable-next-line react/exhaustive-deps
  }, [fumadocsTheme])

  useEffect(() => {
    if (kovaTheme === last.current) return
    last.current = kovaTheme
    if (fumadocsTheme !== kovaTheme) setFumadocsTheme(kovaTheme)
    // oxlint-disable-next-line react/exhaustive-deps
  }, [kovaTheme])

  return null
}
