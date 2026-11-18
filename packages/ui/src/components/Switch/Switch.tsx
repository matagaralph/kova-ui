"use client"

import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
} from "@ui-sdk/react/switch"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import s from "./Switch.module.css"

export type SwitchProps = ComponentProps<typeof SwitchPrimitive>

export function Switch({ className, ...props }: SwitchProps) {
  return <SwitchPrimitive className={mergeClassName(s.Switch, className)} {...props} />
}

export type SwitchThumbProps = ComponentProps<typeof SwitchThumbPrimitive>

function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return <SwitchThumbPrimitive className={mergeClassName(s.SwitchThumb, className)} {...props} />
}

Switch.Thumb = SwitchThumb
