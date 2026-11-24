"use client"

import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
  type AvatarState,
} from "@ui-sdk/react/avatar"
import type { ComponentProps, CSSProperties } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import s from "./avatar.module.css"

export type AvatarProps = Omit<ComponentProps<typeof AvatarPrimitive>, "color"> & {
  /** Width and height, in pixels. Text and icons scale with it. */
  size?: number
}

export function Avatar({ className, size, style, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive
      className={mergeClassName(s.Avatar, className)}
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
  /** Shows the name's initials, up to two letters, and keeps the full name for screen readers. Children take its place. */
  name?: string
}

function AvatarFallback({ className, name, children, ...props }: AvatarFallbackProps) {
  return (
    <AvatarFallbackPrimitive className={mergeClassName(s.AvatarFallback, className)} {...props}>
      {children ??
        (name ? (
          <>
            <span aria-hidden="true" className={s.AvatarInitial}>
              {initials(name)}
            </span>
            <span className={s.VisuallyHidden}>{name}</span>
          </>
        ) : null)}
    </AvatarFallbackPrimitive>
  )
}

const initials = (name: string) => {
  const words = name.trim().split(/\s+/)
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words
  return letters.map((word) => word.charAt(0).toUpperCase()).join("")
}

export type AvatarBadgeProps = ComponentProps<"span">

/** An icon on the avatar's bottom edge, like a status or a role. Name it, or hide it from screen readers. */
function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
  return <span className={cn(s.AvatarBadge, className)} {...props} />
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
Avatar.Badge = AvatarBadge
