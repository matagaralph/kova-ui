"use client"

import {
  Checkbox as CheckboxPrimitive,
  CheckboxGroup as CheckboxGroupPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
} from "@ui-sdk/react/checkbox"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./Checkbox.module.css"

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive>

export function Checkbox({ className, ...props }: CheckboxProps) {
  return <CheckboxPrimitive className={mergeClassName(s.Checkbox, className)} {...props} />
}

export type CheckboxIndicatorProps = ComponentProps<typeof CheckboxIndicatorPrimitive>

/** Draws Kova's check mark, or a dash while indeterminate, when it has no children. */
function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  return (
    <CheckboxIndicatorPrimitive
      className={mergeClassName(s.CheckboxIndicator, className)}
      {...props}
    />
  )
}

export type CheckboxGroupProps<T extends string = string> = ComponentProps<
  typeof CheckboxGroupPrimitive<T>
>

function CheckboxGroup<T extends string = string>({ className, ...props }: CheckboxGroupProps<T>) {
  return (
    <CheckboxGroupPrimitive<T> className={mergeClassName(s.CheckboxGroup, className)} {...props} />
  )
}

Checkbox.Group = CheckboxGroup
Checkbox.Indicator = CheckboxIndicator
