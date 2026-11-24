import type { ReactNode } from "react"
import s from "./table.module.css"

/**
 * Content read by assistive technology but hidden visually.
 */
export function VisuallyHidden({ children }: { children?: ReactNode }) {
  return <span className={s.VisuallyHidden}>{children}</span>
}
