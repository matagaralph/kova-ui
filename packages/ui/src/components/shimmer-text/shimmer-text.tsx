"use client"

import { type ComponentProps, useEffect, useState } from "react"
import { cn } from "../../lib/cn.js"
import s from "./shimmer-text.module.css"

type ShimmerTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"

export type ShimmerTextProps = ComponentProps<"div"> & {
  /**
   * The element to render.
   * @default div
   */
  as?: ShimmerTag
}

export function ShimmerText({ as: Tag = "div", className, ...props }: ShimmerTextProps) {
  return <Tag className={cn(s.Shimmer, className)} data-slot="shimmer-text" {...props} />
}

export type ShimmerableTextProps = ShimmerTextProps & {
  /** Shimmers while true. Once false, the current sweep finishes before it stops. */
  shimmer?: boolean
}

export function ShimmerableText({
  as: Tag = "div",
  className,
  shimmer = false,
  ...props
}: ShimmerableTextProps) {
  const [paused, setPaused] = useState(!shimmer)

  useEffect(() => {
    if (shimmer) {
      setPaused(false)
    }
  }, [shimmer])

  return (
    <Tag
      {...props}
      className={cn(s.Shimmer, className)}
      data-slot="shimmer-text"
      onAnimationIteration={shimmer ? undefined : () => setPaused(true)}
      data-idle={paused ? "" : undefined}
    />
  )
}
