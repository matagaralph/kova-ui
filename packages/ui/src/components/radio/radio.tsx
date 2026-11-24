"use client"

import {
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator as RadioIndicatorPrimitive,
} from "@ui-sdk/react/radio"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./radio.module.css"

export type RadioGroupProps<T extends string = string> = ComponentProps<
  typeof RadioGroupPrimitive<T>
> & {
  /** Lays the radios out in a row or a column. */
  direction?: "row" | "col"
}

function RadioGroup<T extends string = string>({
  className,
  direction = "row",
  ...props
}: RadioGroupProps<T>) {
  return (
    <RadioGroupPrimitive<T>
      className={mergeClassName(s.RadioGroup, className)}
      data-direction={direction}
      {...props}
    />
  )
}

export type RadioProps = ComponentProps<typeof RadioPrimitive>

export function Radio({ className, ...props }: RadioProps) {
  return <RadioPrimitive className={mergeClassName(s.Radio, className)} {...props} />
}

export type RadioIndicatorProps = ComponentProps<typeof RadioIndicatorPrimitive>

function RadioIndicator({ className, ...props }: RadioIndicatorProps) {
  return (
    <RadioIndicatorPrimitive className={mergeClassName(s.RadioIndicator, className)} {...props} />
  )
}

Radio.Group = RadioGroup
Radio.Indicator = RadioIndicator
