"use client"

import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogBackdrop as AlertDialogBackdropPrimitive,
  AlertDialogClose as AlertDialogClosePrimitive,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogShortcut as AlertDialogShortcutPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
} from "@ui-sdk/react/alert-dialog"
import type { ComponentProps } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import { mergeStyle } from "../../lib/mergeStyle.js"
import s from "./Dialog.module.css"
import { dialogWidthStyle, type DialogWidth, isNamedDialogWidth } from "./dialogWidth.js"

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive>

export function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive {...props} />
}

export type AlertDialogTriggerProps = ComponentProps<typeof AlertDialogTriggerPrimitive>

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <AlertDialogTriggerPrimitive {...props} />
}

export type AlertDialogBackdropProps = ComponentProps<typeof AlertDialogBackdropPrimitive> & {
  /**
   * `dim` darkens the page, and `fade` washes it out with the surface color.
   * @default dim
   */
  variant?: "dim" | "fade"
}

function AlertDialogBackdrop({ className, variant = "dim", ...props }: AlertDialogBackdropProps) {
  return (
    <AlertDialogBackdropPrimitive
      className={mergeClassName(s.DialogBackdrop, className)}
      data-variant={variant}
      {...props}
    />
  )
}

export type AlertDialogContentProps = ComponentProps<typeof AlertDialogContentPrimitive> & {
  /**
   * `small` is 296px, `medium` 320px, `large` 480px and `xlarge` 640px. Also takes any CSS width,
   * or a number of pixels.
   * @default large
   */
  width?: DialogWidth
}

function AlertDialogContent({
  className,
  style,
  width = "large",
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogContentPrimitive
      className={mergeClassName(s.DialogContent, className)}
      style={mergeStyle(dialogWidthStyle(width), style)}
      data-width={isNamedDialogWidth(width) ? width : undefined}
      data-height="auto"
      data-position="center"
      {...props}
    />
  )
}

export type AlertDialogHeaderProps = ComponentProps<"div">

function AlertDialogHeader({ className, children, ...props }: AlertDialogHeaderProps) {
  return (
    <div className={cn(s.DialogHeader, className)} {...props}>
      <div className={s.DialogHeaderContent}>{children}</div>
    </div>
  )
}

export type AlertDialogTitleProps = ComponentProps<typeof AlertDialogTitlePrimitive>

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogTitlePrimitive className={mergeClassName(s.DialogTitle, className)} {...props} />
  )
}

export type AlertDialogDescriptionProps = ComponentProps<typeof AlertDialogDescriptionPrimitive>

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogDescriptionPrimitive
      className={mergeClassName(s.DialogDescription, className)}
      {...props}
    />
  )
}

export type AlertDialogBodyProps = ComponentProps<"div">

function AlertDialogBody({ className, ...props }: AlertDialogBodyProps) {
  return <div className={cn(s.DialogBody, className)} {...props} />
}

export type AlertDialogFooterProps = ComponentProps<"div">

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <div className={cn(s.DialogFooter, className)} {...props} />
}

export type AlertDialogCloseProps = ComponentProps<typeof AlertDialogClosePrimitive>

function AlertDialogClose(props: AlertDialogCloseProps) {
  return <AlertDialogClosePrimitive {...props} />
}

export type AlertDialogShortcutProps = ComponentProps<typeof AlertDialogShortcutPrimitive>

function AlertDialogShortcut({ className, ...props }: AlertDialogShortcutProps) {
  return (
    <AlertDialogShortcutPrimitive
      className={mergeClassName(s.DialogShortcut, className)}
      {...props}
    />
  )
}

AlertDialog.Body = AlertDialogBody
AlertDialog.Close = AlertDialogClose
AlertDialog.Title = AlertDialogTitle
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Header = AlertDialogHeader
AlertDialog.Content = AlertDialogContent
AlertDialog.Trigger = AlertDialogTrigger
AlertDialog.Backdrop = AlertDialogBackdrop
AlertDialog.Shortcut = AlertDialogShortcut
AlertDialog.Description = AlertDialogDescription
