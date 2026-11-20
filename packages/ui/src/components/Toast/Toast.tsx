"use client"

import { CheckCircle, Info, Warning, X, XCircle } from "@kova-ui/icons"
import {
  Toast as ToastPrimitive,
  ToastAction as ToastActionPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastRegion as ToastRegionPrimitive,
  type ToastRegionProps as ToastRegionPrimitiveProps,
  ToastTitle as ToastTitlePrimitive,
  type ToastType,
} from "@ui-sdk/react/toast"
import type { ComponentProps } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import { LoadingIndicator } from "../Indicator/index.js"
import s from "./Toast.module.css"

export type ToastRegionProps = ToastRegionPrimitiveProps

/** Shows a toaster's toasts. Without children, each toast gets Kova's icon, title, description and buttons. */
export function ToastRegion({ className, children, ...props }: ToastRegionProps) {
  return (
    <ToastRegionPrimitive className={mergeClassName(s.ToastRegion, className)} {...props}>
      {children ??
        ((toast) => (
          <Toast>
            <ToastIcon type={toast.type} />
            <ToastContent>
              <ToastTitle />
              <ToastDescription />
            </ToastContent>
            {toast.cancel && (
              <ToastClose action={toast.cancel.onCancel}>{toast.cancel.label}</ToastClose>
            )}
            <ToastAction />
          </Toast>
        ))}
    </ToastRegionPrimitive>
  )
}

export type ToastProps = ComponentProps<typeof ToastPrimitive>

export function Toast({ className, ...props }: ToastProps) {
  return <ToastPrimitive className={mergeClassName(s.Toast, className)} {...props} />
}

export type ToastIconProps = Omit<ComponentProps<"span">, "children"> & {
  /** The toast's type, from the toast the region renders. `default` shows no icon. */
  type?: ToastType
}

function ToastIcon({ type = "default", className, ...props }: ToastIconProps) {
  const icon =
    type === "success" ? (
      <CheckCircle />
    ) : type === "error" ? (
      <XCircle />
    ) : type === "warning" ? (
      <Warning />
    ) : type === "info" ? (
      <Info />
    ) : type === "loading" ? (
      <LoadingIndicator size={16} />
    ) : null
  if (!icon) return null
  return (
    <span aria-hidden="true" className={cn(s.ToastIcon, className)} data-type={type} {...props}>
      {icon}
    </span>
  )
}

export type ToastContentProps = ComponentProps<"div">

/** Stacks the title over the description. */
function ToastContent({ className, ...props }: ToastContentProps) {
  return <div className={cn(s.ToastContent, className)} {...props} />
}

export type ToastTitleProps = ComponentProps<typeof ToastTitlePrimitive>

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <ToastTitlePrimitive className={mergeClassName(s.ToastTitle, className)} {...props} />
}

export type ToastDescriptionProps = ComponentProps<typeof ToastDescriptionPrimitive>

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastDescriptionPrimitive
      className={mergeClassName(s.ToastDescription, className)}
      {...props}
    />
  )
}

export type ToastActionProps = ComponentProps<typeof ToastActionPrimitive>

function ToastAction({ className, ...props }: ToastActionProps) {
  return <ToastActionPrimitive className={mergeClassName(s.ToastAction, className)} {...props} />
}

export type ToastCloseProps = ComponentProps<typeof ToastClosePrimitive>

/** Dismisses the toast. Without children, it's an × named "Close". */
function ToastClose({ className, children, "aria-label": ariaLabel, ...props }: ToastCloseProps) {
  const iconOnly = children == null
  return (
    <ToastClosePrimitive
      className={mergeClassName(s.ToastClose, className)}
      aria-label={ariaLabel ?? (iconOnly ? "Close" : undefined)}
      data-icon={iconOnly ? "" : undefined}
      {...props}
    >
      {children ?? <X aria-hidden="true" />}
    </ToastClosePrimitive>
  )
}

Toast.Icon = ToastIcon
Toast.Content = ToastContent
Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Action = ToastAction
Toast.Close = ToastClose
