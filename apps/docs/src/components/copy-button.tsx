import { useCopyButton } from "fumadocs-ui/utils/use-copy-button"
import type { ReactNode } from "react"

type CopyButtonProps = {
  value: string
  /** What the button copies, for its accessible name */
  label: string
  className?: string
  /** The tooltip, `Copy <value>` by default */
  title?: string
  children: ReactNode
}

export function CopyButton({ value, label, className, title, children }: CopyButtonProps) {
  const [checked, onClick] = useCopyButton(() => navigator.clipboard.writeText(value))

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={checked ? `Copied ${label}` : `Copy ${label}`}
      title={checked ? "Copied" : (title ?? `Copy ${value}`)}
      className={className}
      data-copied={checked || undefined}
    >
      {children}
    </button>
  )
}
