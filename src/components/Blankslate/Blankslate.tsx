import clsx from "clsx"
import { type ReactNode } from "react"
import { type SemanticColors, type Sizes } from "../../types.js"
import s from "./Blankslate.module.css"

export type BlankslateProps = {
  children: ReactNode
  className?: string
  /**
   * Determines how the container fills available space
   * @default static
   */
  fill?: "static" | "absolute" | "none"
}

export const Blankslate = ({ children, className, fill = "static" }: BlankslateProps) => {
  return (
    <div className={clsx(s.Blankslate, className)} data-fill={fill}>
      {children}
    </div>
  )
}

export type BlankslateIconProps = {
  /**
   * @default sm
   */
  size?: Sizes<"sm" | "md">
  /**
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "danger" | "warning">
  children: ReactNode
  className?: string
}

const Icon = ({ size = "md", color = "secondary", children, className }: BlankslateIconProps) => {
  return (
    <div className={clsx(s.IconBadge, className)} data-size={size} data-color={color}>
      {children}
    </div>
  )
}

export type BlankslateTitleProps = {
  children: ReactNode
  className?: string
  /**
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

const Title = ({ children, className, color = "secondary" }: BlankslateTitleProps) => {
  return (
    <div className={clsx(s.Title, className)} data-color={color}>
      {children}
    </div>
  )
}

const Description = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={clsx(s.Description, className)}>{children}</div>
}

const ActionRow = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={clsx(s.ActionRow, className)}>{children}</div>
}

Blankslate.Icon = Icon
Blankslate.Title = Title
Blankslate.Description = Description
Blankslate.ActionRow = ActionRow
