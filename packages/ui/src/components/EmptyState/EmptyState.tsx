import { type ComponentProps } from "react"
import { cn } from "../../lib/cn.js"
import { type SemanticColors, type Sizes } from "../../types.js"
import s from "./EmptyState.module.css"

export type EmptyStateProps = ComponentProps<"div"> & {
  /**
   * How it fills its container: `static` takes the full width and height, `absolute` covers the
   * nearest positioned ancestor, and `none` sizes to its content.
   * @default static
   */
  fill?: "static" | "absolute" | "none"
}

export function EmptyState({ className, fill = "static", ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(s.EmptyState, className)}
      data-slot="empty-state"
      data-fill={fill}
      {...props}
    />
  )
}

export type EmptyStateIconProps = Omit<ComponentProps<"div">, "color"> & {
  /** @default md */
  size?: Sizes<"sm" | "md">
  /** @default secondary */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

function EmptyStateIcon({
  size = "md",
  color = "secondary",
  className,
  ...props
}: EmptyStateIconProps) {
  return (
    <div
      className={cn(s.EmptyStateIcon, className)}
      data-slot="empty-state-icon"
      data-size={size}
      data-color={color}
      {...props}
    />
  )
}

export type EmptyStateTitleProps = Omit<ComponentProps<"div">, "color"> & {
  /** @default secondary */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

function EmptyStateTitle({ className, color = "secondary", ...props }: EmptyStateTitleProps) {
  return (
    <div
      className={cn(s.EmptyStateTitle, className)}
      data-slot="empty-state-title"
      data-color={color}
      {...props}
    />
  )
}

export type EmptyStateDescriptionProps = ComponentProps<"div">

function EmptyStateDescription({ className, ...props }: EmptyStateDescriptionProps) {
  return (
    <div
      className={cn(s.EmptyStateDescription, className)}
      data-slot="empty-state-description"
      {...props}
    />
  )
}

export type EmptyStateActionRowProps = ComponentProps<"div">

function EmptyStateActionRow({ className, ...props }: EmptyStateActionRowProps) {
  return (
    <div
      className={cn(s.EmptyStateActionRow, className)}
      data-slot="empty-state-action-row"
      {...props}
    />
  )
}

EmptyState.Icon = EmptyStateIcon
EmptyState.Title = EmptyStateTitle
EmptyState.Description = EmptyStateDescription
EmptyState.ActionRow = EmptyStateActionRow
