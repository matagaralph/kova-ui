import { type ReactNode } from "react"

// Only direct text is used to reserve space for the semibold label, not text inside nested elements
export function getTextContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("")
  }
  return ""
}
