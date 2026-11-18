"use client"

import {
  Slider as SliderPrimitive,
  SliderControl as SliderControlPrimitive,
  SliderIndicator as SliderIndicatorPrimitive,
  type SliderState,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
  SliderValue as SliderValuePrimitive,
} from "@ui-sdk/react/slider"
import { type ComponentProps, createContext, type CSSProperties, type ReactNode, use } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import { clamp } from "../../lib/math.js"
import s from "./Slider.module.css"

const SliderRangeContext = createContext({ min: 0, max: 100 })

export type SliderProps<Value extends number | number[] = number | number[]> = ComponentProps<
  typeof SliderPrimitive<Value>
> & {
  /** The rail's color. Sets `--slider-track-color`. */
  trackColor?: string
  /** The fill's and the thumb ring's color. Sets `--slider-range-color`. */
  rangeColor?: string
}

export function Slider<Value extends number | number[] = number | number[]>({
  className,
  style,
  trackColor,
  rangeColor,
  min = 0,
  max = 100,
  ...props
}: SliderProps<Value>) {
  const colors = {
    "--slider-track-color": trackColor,
    "--slider-range-color": rangeColor,
  } as CSSProperties

  return (
    <SliderRangeContext value={{ min, max }}>
      <SliderPrimitive<Value>
        className={mergeClassName(s.Slider, className)}
        style={
          typeof style === "function"
            ? (state: SliderState) => ({ ...colors, ...style(state) })
            : { ...colors, ...style }
        }
        min={min}
        max={max}
        {...props}
      />
    </SliderRangeContext>
  )
}

export type SliderValueProps = ComponentProps<typeof SliderValuePrimitive>

function SliderValue({ className, ...props }: SliderValueProps) {
  return <SliderValuePrimitive className={mergeClassName(s.SliderValue, className)} {...props} />
}

export type SliderControlProps = ComponentProps<typeof SliderControlPrimitive>

function SliderControl({ className, ...props }: SliderControlProps) {
  return (
    <SliderControlPrimitive className={mergeClassName(s.SliderControl, className)} {...props} />
  )
}

export type SliderTrackProps = ComponentProps<typeof SliderTrackPrimitive>

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return <SliderTrackPrimitive className={mergeClassName(s.SliderTrack, className)} {...props} />
}

export type SliderIndicatorProps = ComponentProps<typeof SliderIndicatorPrimitive>

function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return (
    <SliderIndicatorPrimitive className={mergeClassName(s.SliderIndicator, className)} {...props} />
  )
}

export type SliderThumbProps = ComponentProps<typeof SliderThumbPrimitive>

function SliderThumb({ className, ...props }: SliderThumbProps) {
  return <SliderThumbPrimitive className={mergeClassName(s.SliderThumb, className)} {...props} />
}

export type SliderMarksProps = ComponentProps<"div">

/** A row of labels under a horizontal slider's control. */
function SliderMarks({ className, ...props }: SliderMarksProps) {
  return <div aria-hidden="true" className={cn(s.SliderMarks, className)} {...props} />
}

export type SliderMarkProps = Omit<ComponentProps<"div">, "children"> & {
  /** The value the mark labels. */
  value: number
  children?: ReactNode
}

/** A label at `value`, within the slider's `min` and `max`. */
function SliderMark({ value, className, style, ...props }: SliderMarkProps) {
  const { min, max } = use(SliderRangeContext)
  const position = max === min ? 0 : clamp((value - min) / (max - min), 0, 1)

  return (
    <div
      className={cn(s.SliderMark, className)}
      style={{ "--slider-mark-position": position, ...style } as CSSProperties}
      {...props}
    />
  )
}

Slider.Mark = SliderMark
Slider.Marks = SliderMarks
Slider.Thumb = SliderThumb
Slider.Track = SliderTrack
Slider.Value = SliderValue
Slider.Control = SliderControl
Slider.Indicator = SliderIndicator
