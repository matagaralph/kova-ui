"use client"

import {
  Popover as PopoverPrimitive,
  PopoverClose as PopoverClosePrimitive,
  PopoverContent as PopoverContentPrimitive,
  PopoverDescription as PopoverDescriptionPrimitive,
  PopoverShortcut as PopoverShortcutPrimitive,
  PopoverTitle as PopoverTitlePrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
} from "@ui-sdk/react/popover"
import type { ComponentProps } from "react"
import { getAlignOffset } from "../../lib/alignOffset.js"
import { mergeClassName } from "../../lib/cn.js"
import { toCssVariables } from "../../lib/helpers.js"
import { mergeStyle } from "../../lib/mergeStyle.js"
import s from "./Popover.module.css"

export type PopoverProps = ComponentProps<typeof PopoverPrimitive>

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive {...props} />
}

export type PopoverTriggerProps = ComponentProps<typeof PopoverTriggerPrimitive>

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverTriggerPrimitive {...props} />
}

export type PopoverContentProps = ComponentProps<typeof PopoverContentPrimitive> & {
  /** The popover's width, in pixels. Fits the content by default. */
  width?: number | "auto"
  /**
   * The popover's minimum width, in pixels.
   * @default 300
   */
  minWidth?: number | "auto"
  /**
   * The popover's maximum width, in pixels. Never wider than the space beside the trigger.
   * @default 700
   */
  maxWidth?: number
  /** Blurs what's behind a see-through surface. */
  translucent?: boolean
}

function PopoverContent({
  className,
  style,
  width,
  minWidth,
  maxWidth,
  translucent,
  align,
  alignOffset,
  sideOffset = 8,
  collisionPadding = 20,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverContentPrimitive
      className={mergeClassName(s.PopoverContent, className)}
      style={mergeStyle(
        toCssVariables({
          "popover-width": width,
          "popover-min-width": minWidth,
          "popover-max-width": maxWidth,
        }),
        style,
      )}
      data-translucent={translucent ? "" : undefined}
      align={align}
      alignOffset={getAlignOffset(align, alignOffset ?? -5)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

export type PopoverTitleProps = ComponentProps<typeof PopoverTitlePrimitive>

function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <PopoverTitlePrimitive className={mergeClassName(s.PopoverTitle, className)} {...props} />
}

export type PopoverDescriptionProps = ComponentProps<typeof PopoverDescriptionPrimitive>

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <PopoverDescriptionPrimitive
      className={mergeClassName(s.PopoverDescription, className)}
      {...props}
    />
  )
}

export type PopoverCloseProps = ComponentProps<typeof PopoverClosePrimitive>

function PopoverClose(props: PopoverCloseProps) {
  return <PopoverClosePrimitive {...props} />
}

export type PopoverShortcutProps = ComponentProps<typeof PopoverShortcutPrimitive>

function PopoverShortcut({ className, ...props }: PopoverShortcutProps) {
  return (
    <PopoverShortcutPrimitive className={mergeClassName(s.PopoverShortcut, className)} {...props} />
  )
}

Popover.Close = PopoverClose
Popover.Title = PopoverTitle
Popover.Content = PopoverContent
Popover.Trigger = PopoverTrigger
Popover.Shortcut = PopoverShortcut
Popover.Description = PopoverDescription
