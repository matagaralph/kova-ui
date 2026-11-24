/// <reference path="../../global.ts" preserve="true" />
"use client"

import { Button as ButtonPrimitive, type ButtonState } from "@ui-sdk/react/button"
import {
  type AnchorHTMLAttributes,
  type ComponentProps,
  createElement,
  type ElementType,
  type PointerEvent,
  type ReactNode,
} from "react"
import { mergeClassName } from "../../lib/cn.js"
import { handlePressableMouseEnter } from "../../lib/helpers.js"
import { wrapTextNodeSiblings } from "../../lib/render-helpers.js"
import { type ControlSize, type Sizes } from "../../types.js"
import { LoadingIndicator } from "../indicator/index.js"
import { useLinkComponent } from "../kova-provider/internal.js"
import { TransitionGroup } from "../transition/index.js"
import s from "./button.module.css"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "secondary-destructive"

type ButtonVisualProps = {
  /** The button's style. */
  variant?: ButtonVariant
  /** The button's height, with matching gutter, icon and font sizes: `22px` (`3xs`) to `48px` (`3xl`). */
  size?: ControlSize
  /** Rounds the button fully. */
  pill?: boolean
  /** Makes the button as wide as it is tall, for an icon. */
  uniform?: boolean
  /** Fills the available width. */
  block?: boolean
  /** Shows the button's selected style. */
  selected?: boolean
  /** Pulls the button out by its gutter, to line its content up with the content around it. */
  opticallyAlign?: "start" | "end"
  /** Overrides the icon size that `size` sets. */
  iconSize?: Sizes<"sm" | "md" | "lg" | "xl" | "2xl">
  /** Overrides the gutter that `size` sets. */
  gutterSize?: Sizes<"3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** `"relaxed"` keeps the default cursor while disabled. */
  disabledTone?: "relaxed"
}

export type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, "color" | "inert"> &
  ButtonVisualProps & {
    /** Shows a spinner over the content, and ignores presses while keeping focus. */
    loading?: boolean
    /** Ignores presses and leaves the tab order, without the disabled style. Defaults to `loading`. */
    inert?: boolean
  }

function ButtonContent({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <>
      <TransitionGroup className={s.ButtonLoader} enterDuration={250} exitDuration={150}>
        {loading && <LoadingIndicator key="loader" />}
      </TransitionGroup>
      <span className={s.ButtonInner}>{wrapTextNodeSiblings(children)}</span>
    </>
  )
}

export function Button({
  variant = "primary",
  size = "md",
  pill,
  uniform,
  block,
  selected,
  opticallyAlign,
  iconSize,
  gutterSize,
  disabledTone,
  loading = false,
  inert = loading,
  disabled,
  focusableWhenDisabled,
  className,
  children,
  onPointerEnter,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      className={mergeClassName(s.Button, className)}
      data-variant={variant}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-uniform={uniform ? "" : undefined}
      data-block={block ? "" : undefined}
      data-selected={selected ? "" : undefined}
      data-optically-align={opticallyAlign}
      data-icon-size={iconSize}
      data-gutter-size={gutterSize}
      data-disabled-tone={disabled ? disabledTone : undefined}
      data-loading={loading ? "" : undefined}
      data-inert={inert && !disabled ? "" : undefined}
      aria-busy={loading || undefined}
      disabled={disabled || inert}
      focusableWhenDisabled={(loading && !disabled) || focusableWhenDisabled}
      onPointerEnter={(event: PointerEvent<HTMLButtonElement>) => {
        handlePressableMouseEnter(event)
        onPointerEnter?.(event)
      }}
      {...props}
    >
      {(state: ButtonState) => (
        <ButtonContent loading={loading || state.pending}>
          {typeof children === "function" ? children(state) : children}
        </ButtonContent>
      )}
    </ButtonPrimitive>
  )
}

export type ButtonLinkProps = Omit<ButtonProps, "type" | "loading" | "inert"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonProps> & {
    href?: string
    /** Opens the link in a new tab. Detected from an `http(s)://` `href` when not set. */
    external?: boolean
  }

/** A Button that renders KovaProvider's link component, or an `<a>` for external links. */
export function ButtonLink({ href, external, render, ...props }: ButtonLinkProps) {
  const LinkComponent = useLinkComponent() as ElementType
  const isExternal = external ?? /^https?:\/\//.test(href ?? "")
  const linkProps = {
    href,
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : null),
    ...props,
  }

  return (
    <Button
      {...(linkProps as ButtonProps)}
      render={render ?? (isExternal ? <a /> : createElement(LinkComponent))}
    />
  )
}
