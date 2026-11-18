"use client"

import { Progress as ProgressPrimitive } from "@ui-sdk/react/progress"
import { type ComponentProps, useState } from "react"
import { useSimulatedProgress } from "../../hooks/useSimulatedProgress.js"
import { mergeClassName } from "../../lib/cn.js"
import { toCssVariables } from "../../lib/helpers.js"
import s from "./CircularProgress.module.css"

export type CircularProgressProps = Omit<
  ComponentProps<typeof ProgressPrimitive>,
  "children" | "value"
> & {
  /**
   * How far the task has come, between `min` and `max`. Leave it out to show simulated progress
   * that slows as it nears the end.
   */
  value?: number
  /** Ends the simulated progress and fills the ring. */
  done?: boolean
  /**
   * How long the simulated progress takes to near the end, in milliseconds.
   * @default 15000
   */
  maxDuration?: number
  /**
   * Width and height of the ring, in pixels or any CSS length.
   * @default 28
   */
  size?: number | string
  /**
   * Stroke width of the ring, in pixels, up to 4.
   * @default 2
   */
  strokeWidth?: number
  /** Color of the filled part of the ring. */
  trackActiveColor?: string
  /** Color of the unfilled ring. */
  trackColor?: string
}

export function CircularProgress({
  value,
  done = false,
  maxDuration = 15000,
  max,
  size,
  strokeWidth,
  trackActiveColor,
  trackColor,
  className,
  style,
  ...props
}: CircularProgressProps) {
  const [startedAt] = useState(() => Date.now())
  const simulated = useSimulatedProgress(startedAt, maxDuration, value !== undefined || done)
  const variables = toCssVariables({
    "circular-progress-size": size,
    "circular-progress-stroke": strokeWidth ? Math.min(4, strokeWidth) : undefined,
    "circular-progress-track-active-color": trackActiveColor,
    "circular-progress-track-color": trackColor,
  })

  return (
    <ProgressPrimitive
      // Simulated progress isn't real, so assistive technology hears an indeterminate bar.
      value={value ?? (done ? (max ?? 100) : null)}
      max={max}
      className={mergeClassName(s.CircularProgress, className)}
      style={typeof style === "function" ? style : { ...variables, ...style }}
      {...props}
    >
      {(state) => (
        <>
          <svg viewBox="0 0 20 20" className={s.CircularProgressTrack} aria-hidden data-no-autosize>
            <circle cx="10" cy="10" r="8" fill="none" />
          </svg>
          <svg
            viewBox="0 0 20 20"
            className={s.CircularProgressIndicator}
            style={{ strokeDashoffset: 50 - 50 * ((state.percent ?? simulated) / 100) }}
            aria-hidden
            data-no-autosize
          >
            <circle cx="10" cy="10" r="8" fill="none" />
          </svg>
        </>
      )}
    </ProgressPrimitive>
  )
}
