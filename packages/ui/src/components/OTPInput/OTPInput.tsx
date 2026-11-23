"use client"

import {
  OTPInput as OTPInputPrimitive,
  OTPInputGroup as OTPInputGroupPrimitive,
  OTPInputSeparator as OTPInputSeparatorPrimitive,
  OTPInputSlot as OTPInputSlotPrimitive,
} from "@ui-sdk/react/otp-input"
import type { ComponentProps } from "react"
import { mergeClassName } from "../../lib/cn.js"
import type { Sizes } from "../../types.js"
import s from "./OTPInput.module.css"

export type OTPInputProps = ComponentProps<typeof OTPInputPrimitive> & {
  /** Each slot's width and height, with a matching font size: `28px` (`sm`) to `40px` (`xl`). */
  size?: Sizes<"sm" | "md" | "lg" | "xl">
}

export function OTPInput({ size = "lg", className, ...props }: OTPInputProps) {
  return (
    <OTPInputPrimitive
      className={mergeClassName(s.OTPInput, className)}
      data-size={size}
      {...props}
    />
  )
}

export type OTPInputGroupProps = ComponentProps<typeof OTPInputGroupPrimitive>

function OTPInputGroup({ className, ...props }: OTPInputGroupProps) {
  return (
    <OTPInputGroupPrimitive className={mergeClassName(s.OTPInputGroup, className)} {...props} />
  )
}

export type OTPInputSlotProps = ComponentProps<typeof OTPInputSlotPrimitive>

function OTPInputSlot({ className, ...props }: OTPInputSlotProps) {
  return <OTPInputSlotPrimitive className={mergeClassName(s.OTPInputSlot, className)} {...props} />
}

export type OTPInputSeparatorProps = ComponentProps<typeof OTPInputSeparatorPrimitive>

function OTPInputSeparator({ className, ...props }: OTPInputSeparatorProps) {
  return (
    <OTPInputSeparatorPrimitive
      className={mergeClassName(s.OTPInputSeparator, className)}
      {...props}
    />
  )
}

OTPInput.Group = OTPInputGroup
OTPInput.Slot = OTPInputSlot
OTPInput.Separator = OTPInputSeparator
