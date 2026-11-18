import type { CSSProperties } from "react"

export type DialogWidth = "small" | "medium" | "large" | "xlarge" | (string & {}) | number

const NAMED_WIDTHS = new Set(["small", "medium", "large", "xlarge"])

export const isNamedDialogWidth = (width: DialogWidth) =>
  typeof width === "string" && NAMED_WIDTHS.has(width)

export const dialogWidthStyle = (width: DialogWidth): CSSProperties | undefined =>
  isNamedDialogWidth(width)
    ? undefined
    : { width: typeof width === "number" ? `${width}px` : width }
