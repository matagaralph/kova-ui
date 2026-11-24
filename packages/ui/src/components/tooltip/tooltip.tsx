"use client"

import {
  Tooltip as TooltipPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipShortcut as TooltipShortcutPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "@ui-sdk/react/tooltip"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import { mergeStyle } from "../../lib/merge-style.js"
import s from "./tooltip.module.css"

export type TooltipProps = ComponentProps<typeof TooltipPrimitive>

export function Tooltip({ delay = 150, ...props }: TooltipProps) {
  return <TooltipPrimitive delay={delay} {...props} />
}

export type TooltipTriggerProps = ComponentProps<typeof TooltipTriggerPrimitive>

function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipTriggerPrimitive {...props} />
}

export type TooltipContentProps = ComponentProps<typeof TooltipContentPrimitive> & {
  /**
   * The tooltip's maximum width, in pixels. `"none"` keeps it on one line.
   * @default 300
   */
  maxWidth?: number | "none"
  /** A short, one to three word hint, drawn in inverted colors. */
  compact?: boolean
  /**
   * The space inside the tooltip.
   * @default md
   */
  gutterSize?: "sm" | "md" | "lg"
}

function TooltipContent({
  className,
  style,
  maxWidth = 300,
  compact,
  gutterSize = "md",
  sideOffset = 5,
  collisionPadding = 15,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipContentPrimitive
      className={mergeClassName(s.TooltipContent, className)}
      style={mergeStyle({ maxWidth }, style)}
      data-compact={compact ? "" : undefined}
      data-gutter-size={gutterSize}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

export type TooltipShortcutProps = ComponentProps<typeof TooltipShortcutPrimitive>

function TooltipShortcut({ className, ...props }: TooltipShortcutProps) {
  return (
    <TooltipShortcutPrimitive className={mergeClassName(s.TooltipShortcut, className)} {...props} />
  )
}

Tooltip.Content = TooltipContent
Tooltip.Trigger = TooltipTrigger
Tooltip.Shortcut = TooltipShortcut
