import { type ComponentProps } from "react"
import { cn } from "../../lib/cn.js"
import { type SemanticColors, type Sizes } from "../../types.js"
import s from "./Blankslate.module.css"

export type BlankslateProps = ComponentProps<"div"> & {
  /**
   * How it fills its container: `static` takes the full width and height, `absolute` covers the
   * nearest positioned ancestor, and `none` sizes to its content.
   * @default static
   */
  fill?: "static" | "absolute" | "none"
}

export const Blankslate = ({ className, fill = "static", ...props }: BlankslateProps) => {
  return (
    <div
      className={cn(s.Blankslate, className)}
      data-slot="blankslate"
      data-fill={fill}
      {...props}
    />
  )
}

export type BlankslateIconProps = Omit<ComponentProps<"div">, "color"> & {
  /** @default md */
  size?: Sizes<"sm" | "md">
  /** @default secondary */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

const Icon = ({ size = "md", color = "secondary", className, ...props }: BlankslateIconProps) => {
  return (
    <div
      className={cn(s.IconBadge, className)}
      data-slot="blankslate-icon"
      data-size={size}
      data-color={color}
      {...props}
    />
  )
}

export type BlankslateTitleProps = Omit<ComponentProps<"div">, "color"> & {
  /** @default secondary */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

const Title = ({ className, color = "secondary", ...props }: BlankslateTitleProps) => {
  return (
    <div
      className={cn(s.Title, className)}
      data-slot="blankslate-title"
      data-color={color}
      {...props}
    />
  )
}

export type BlankslateDescriptionProps = ComponentProps<"div">

const Description = ({ className, ...props }: BlankslateDescriptionProps) => {
  return (
    <div className={cn(s.Description, className)} data-slot="blankslate-description" {...props} />
  )
}

export type BlankslateActionRowProps = ComponentProps<"div">

const ActionRow = ({ className, ...props }: BlankslateActionRowProps) => {
  return <div className={cn(s.ActionRow, className)} data-slot="blankslate-action-row" {...props} />
}

Blankslate.Icon = Icon
Blankslate.Title = Title
Blankslate.Description = Description
Blankslate.ActionRow = ActionRow
