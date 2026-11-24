"use client"

import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent as ScrollAreaContentPrimitive,
  ScrollAreaCorner as ScrollAreaCornerPrimitive,
  ScrollAreaScrollbar as ScrollAreaScrollbarPrimitive,
  ScrollAreaScrollToEnd as ScrollAreaScrollToEndPrimitive,
  ScrollAreaThumb as ScrollAreaThumbPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
} from "@ui-sdk/react/scroll-area"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./scroll-area.module.css"

export type ScrollAreaProps = ComponentProps<typeof ScrollAreaPrimitive> & {
  /** Fades the edges where there's more content to scroll to. */
  fade?: boolean
}

export function ScrollArea({ fade, className, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive
      className={mergeClassName(s.ScrollArea, className)}
      data-fade={fade ? "" : undefined}
      {...props}
    />
  )
}

export type ScrollAreaViewportProps = ComponentProps<typeof ScrollAreaViewportPrimitive>

function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <ScrollAreaViewportPrimitive
      className={mergeClassName(s.ScrollAreaViewport, className)}
      {...props}
    />
  )
}

export type ScrollAreaContentProps = ComponentProps<typeof ScrollAreaContentPrimitive>

function ScrollAreaContent({ className, ...props }: ScrollAreaContentProps) {
  return (
    <ScrollAreaContentPrimitive
      className={mergeClassName(s.ScrollAreaContent, className)}
      {...props}
    />
  )
}

export type ScrollAreaScrollbarProps = ComponentProps<typeof ScrollAreaScrollbarPrimitive>

function ScrollAreaScrollbar({ className, ...props }: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaScrollbarPrimitive
      className={mergeClassName(s.ScrollAreaScrollbar, className)}
      {...props}
    />
  )
}

export type ScrollAreaThumbProps = ComponentProps<typeof ScrollAreaThumbPrimitive>

function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <ScrollAreaThumbPrimitive className={mergeClassName(s.ScrollAreaThumb, className)} {...props} />
  )
}

export type ScrollAreaCornerProps = ComponentProps<typeof ScrollAreaCornerPrimitive>

function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return (
    <ScrollAreaCornerPrimitive
      className={mergeClassName(s.ScrollAreaCorner, className)}
      {...props}
    />
  )
}

export type ScrollAreaScrollToEndProps = ComponentProps<typeof ScrollAreaScrollToEndPrimitive>

function ScrollAreaScrollToEnd({ className, ...props }: ScrollAreaScrollToEndProps) {
  return (
    <ScrollAreaScrollToEndPrimitive
      className={mergeClassName(s.ScrollAreaScrollToEnd, className)}
      {...props}
    />
  )
}

ScrollArea.Viewport = ScrollAreaViewport
ScrollArea.Content = ScrollAreaContent
ScrollArea.Scrollbar = ScrollAreaScrollbar
ScrollArea.Thumb = ScrollAreaThumb
ScrollArea.Corner = ScrollAreaCorner
ScrollArea.ScrollToEnd = ScrollAreaScrollToEnd
