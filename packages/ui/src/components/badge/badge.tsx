import { type ComponentProps } from "react"
import { cn } from "../../lib/cn.js"
import { wrapTextNodeSiblings } from "../../lib/render-helpers.js"
import { type SemanticColors, type Sizes, type Variants } from "../../types.js"
import s from "./badge.module.css"

export type BadgeProps = Omit<ComponentProps<"div">, "color"> & {
  /**
   * Visual style of the badge.
   * @default soft
   */
  variant?: Variants<"solid" | "soft" | "outline">
  /**
   * Height of the badge: `18px`, `22px` or `24px`.
   * @default sm
   */
  size?: Sizes<"sm" | "md" | "lg">
  /** Rounds the badge fully, with extra horizontal padding. */
  pill?: boolean
  /**
   * Color of the badge, matching its meaning.
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "success" | "danger" | "warning" | "info" | "discovery">
}

export function Badge({
  children,
  className,
  variant = "soft",
  color = "secondary",
  size = "sm",
  pill,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(s.Badge, className)}
      data-slot="badge"
      data-color={color}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-variant={variant}
      {...props}
    >
      {wrapTextNodeSiblings(children)}
    </div>
  )
}
