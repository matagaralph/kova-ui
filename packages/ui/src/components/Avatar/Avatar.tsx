"use client"

import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
  type AvatarState,
} from "@ui-sdk/react/avatar"
import type { ComponentProps, CSSProperties } from "react"
import { mergeClassName } from "../../lib/cn.js"
import type { SemanticColors, Variants } from "../../types.js"
import s from "./Avatar.module.css"

export type AvatarColor = SemanticColors<
  "primary" | "secondary" | "success" | "info" | "discovery" | "danger"
>

export type AvatarProps = Omit<ComponentProps<typeof AvatarPrimitive>, "color"> & {
  /** Width and height, in pixels. Text and icons scale with it. */
  size?: number
  /**
   * Color of the fallback
   * @default secondary
   */
  color?: AvatarColor
  /**
   * Style variant of the fallback
   * @default soft
   */
  variant?: Variants<"soft" | "solid">
}

export function Avatar({
  className,
  size,
  color = "secondary",
  variant = "soft",
  style,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive
      className={mergeClassName(s.Avatar, className)}
      data-color={color}
      data-variant={variant}
      style={withSize(style, size)}
      {...props}
    />
  )
}

type AvatarStyle = AvatarProps["style"]

const withSize = (style: AvatarStyle, size: number | undefined): AvatarStyle => {
  if (size === undefined) return style
  const sizeStyle = { "--avatar-size": `${size}px` } as CSSProperties
  if (typeof style === "function") {
    return (state: AvatarState) => ({ ...sizeStyle, ...style(state) })
  }
  return { ...sizeStyle, ...style }
}

export type AvatarImageProps = ComponentProps<typeof AvatarImagePrimitive>

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <AvatarImagePrimitive className={mergeClassName(s.AvatarImage, className)} {...props} />
}

export type AvatarFallbackProps = ComponentProps<typeof AvatarFallbackPrimitive> & {
  /** Shows the name's first letter, and keeps the full name for screen readers. Children take its place. */
  name?: string
}

function AvatarFallback({ className, name, children, ...props }: AvatarFallbackProps) {
  return (
    <AvatarFallbackPrimitive className={mergeClassName(s.AvatarFallback, className)} {...props}>
      {children ??
        (name ? (
          <>
            <span aria-hidden="true" className={s.AvatarInitial}>
              {name.trim().charAt(0).toUpperCase()}
            </span>
            <span className={s.VisuallyHidden}>{name}</span>
          </>
        ) : null)}
    </AvatarFallbackPrimitive>
  )
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
