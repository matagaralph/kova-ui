"use client"

import { X } from "@kova-ui/icons"
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogClose as DialogClosePrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogShortcut as DialogShortcutPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger as DialogTriggerPrimitive,
} from "@ui-sdk/react/dialog"
import { type ComponentProps, useLayoutEffect, useRef, useState } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import { mergeRefs } from "../../lib/mergeRefs.js"
import { mergeStyle } from "../../lib/mergeStyle.js"
import { Button } from "../Button/index.js"
import s from "./Dialog.module.css"
import { dialogWidthStyle, type DialogWidth, isNamedDialogWidth } from "./dialogWidth.js"

export type DialogHeight = "small" | "large" | "auto"
export type DialogPosition = "center" | "left" | "right"
export type DialogNarrowPosition = DialogPosition | "bottom" | "fullscreen"

export type DialogProps = ComponentProps<typeof DialogPrimitive>

export function Dialog(props: DialogProps) {
  return <DialogPrimitive {...props} />
}

export type DialogTriggerProps = ComponentProps<typeof DialogTriggerPrimitive>

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogTriggerPrimitive {...props} />
}

export type DialogBackdropProps = ComponentProps<typeof DialogBackdropPrimitive> & {
  /**
   * `dim` darkens the page, and `fade` washes it out with the surface color.
   * @default dim
   */
  variant?: "dim" | "fade"
}

function DialogBackdrop({ className, variant = "dim", ...props }: DialogBackdropProps) {
  return (
    <DialogBackdropPrimitive
      className={mergeClassName(s.DialogBackdrop, className)}
      data-variant={variant}
      {...props}
    />
  )
}

export type DialogContentProps = ComponentProps<typeof DialogContentPrimitive> & {
  /**
   * `small` is 296px, `medium` 320px, `large` 480px and `xlarge` 640px. Also takes any CSS width,
   * or a number of pixels.
   * @default xlarge
   */
  width?: DialogWidth
  /**
   * `small` is 480px and `large` 640px. `auto` fits the content.
   * @default auto
   */
  height?: DialogHeight
  /**
   * Where the dialog sits. `left` and `right` open it as a side sheet. Pass an object to choose
   * another position below 768px, including `bottom` and `fullscreen`.
   * @default center
   */
  position?: DialogPosition | { narrow?: DialogNarrowPosition; regular?: DialogPosition }
  /** Moves a centered dialog toward the top or the bottom of the screen. */
  align?: "top" | "center" | "bottom"
}

function DialogContent({
  className,
  style,
  width = "xlarge",
  height = "auto",
  position = "center",
  align,
  ...props
}: DialogContentProps) {
  const { narrow, regular = "center" } =
    typeof position === "string" ? { narrow: undefined, regular: position } : position
  return (
    <DialogContentPrimitive
      className={mergeClassName(s.DialogContent, className)}
      style={mergeStyle(dialogWidthStyle(width), style)}
      data-width={isNamedDialogWidth(width) ? width : undefined}
      data-height={height}
      data-position={regular}
      data-position-narrow={narrow}
      data-align={align}
      {...props}
    />
  )
}

export type DialogHeaderProps = ComponentProps<"div"> & {
  /**
   * Renders a close button after the title.
   * @default true
   */
  closeButton?: boolean
}

function DialogHeader({ className, children, closeButton = true, ...props }: DialogHeaderProps) {
  return (
    <div className={cn(s.DialogHeader, className)} {...props}>
      <div className={s.DialogHeaderContent}>{children}</div>
      {closeButton && (
        <DialogClose aria-label="Close" render={<Button variant="ghost" size="sm" uniform />}>
          <X />
        </DialogClose>
      )}
    </div>
  )
}

export type DialogTitleProps = ComponentProps<typeof DialogTitlePrimitive>

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <DialogTitlePrimitive className={mergeClassName(s.DialogTitle, className)} {...props} />
}

export type DialogDescriptionProps = ComponentProps<typeof DialogDescriptionPrimitive>

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogDescriptionPrimitive
      className={mergeClassName(s.DialogDescription, className)}
      {...props}
    />
  )
}

export type DialogBodyProps = ComponentProps<"div">

function DialogBody({ className, ref, ...props }: DialogBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)

  useLayoutEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const measure = () => setOverflowing(body.scrollHeight > body.clientHeight)
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(body)
    const mutationObserver = new MutationObserver(measure)
    mutationObserver.observe(body, { childList: true, subtree: true, characterData: true })
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={mergeRefs([bodyRef, ref])}
      className={cn(s.DialogBody, className)}
      data-overflowing={overflowing ? "" : undefined}
      {...props}
    />
  )
}

export type DialogFooterProps = ComponentProps<"div">

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <div className={cn(s.DialogFooter, className)} {...props} />
}

export type DialogCloseProps = ComponentProps<typeof DialogClosePrimitive>

function DialogClose(props: DialogCloseProps) {
  return <DialogClosePrimitive {...props} />
}

export type DialogShortcutProps = ComponentProps<typeof DialogShortcutPrimitive>

function DialogShortcut({ className, ...props }: DialogShortcutProps) {
  return (
    <DialogShortcutPrimitive className={mergeClassName(s.DialogShortcut, className)} {...props} />
  )
}

Dialog.Body = DialogBody
Dialog.Close = DialogClose
Dialog.Title = DialogTitle
Dialog.Footer = DialogFooter
Dialog.Header = DialogHeader
Dialog.Content = DialogContent
Dialog.Trigger = DialogTrigger
Dialog.Backdrop = DialogBackdrop
Dialog.Shortcut = DialogShortcut
Dialog.Description = DialogDescription
