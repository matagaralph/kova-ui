"use client"

import { Label as LabelPrimitive } from "@ui-sdk/react/label"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./field.module.css"

export type LabelProps = ComponentProps<typeof LabelPrimitive>

/** Names any control by `htmlFor` or by wrapping it, like a switch or a radio with its text. */
export function Label({ className, ...props }: LabelProps) {
  return <LabelPrimitive className={mergeClassName(s.Label, className)} {...props} />
}
