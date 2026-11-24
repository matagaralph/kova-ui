"use client"

import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./separator.module.css"

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive>

export function Separator({ className, ...props }: SeparatorProps) {
  return <SeparatorPrimitive className={mergeClassName(s.Separator, className)} {...props} />
}
