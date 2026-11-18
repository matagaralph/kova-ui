"use client"

import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import { renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import {
  createElement,
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ReactNode,
} from "react"
import { cn } from "../../lib/cn.js"
import { useLinkComponent } from "../KovaProvider/internal.js"
import s from "./TextLink.module.css"

export type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  children: ReactNode
  /** Colors the link with the primary link color, and drops the underline unless `underline` is set. */
  primary?: boolean
  /**
   * Underlines the link.
   * @default !primary
   */
  underline?: boolean
  /** Opens the link in a new tab. Detected from an `http(s)://` `href` when not set. */
  external?: boolean
  /** Renders your own link, like a router's `Link`. Defaults to KovaProvider's link component. */
  render?: RenderProp
}

export function TextLink({
  children,
  primary = false,
  underline = !primary,
  className,
  external,
  href,
  render,
  ...props
}: TextLinkProps) {
  const LinkComponent = useLinkComponent()

  const sharedProps = {
    ...props,
    "className": cn(s.TextLink, className),
    "data-slot": "text-link",
    "data-primary": primary ? "" : undefined,
    "data-underline": underline ? "" : undefined,
  }

  // Without a destination it's an action that looks like a link, so it renders a real button.
  if (!href && !render) {
    return (
      <ButtonPrimitive {...(sharedProps as ComponentProps<typeof ButtonPrimitive>)}>
        {children}
      </ButtonPrimitive>
    )
  }

  const isExternal = external ?? /^https?:\/\//.test(href ?? "")
  const linkProps = {
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : null),
    href,
    ...sharedProps,
    children,
  }

  return renderElement(
    "a",
    linkProps,
    render ?? (isExternal || LinkComponent === "a" ? undefined : createElement(LinkComponent)),
  )
}
