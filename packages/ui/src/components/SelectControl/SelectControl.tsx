"use client"

import { ChevronDownVector, DropdownVector, X } from "@kova-ui/icons"
import type { ComponentProps, ComponentType, SVGProps } from "react"
import { cn } from "../../lib/cn.js"
import { handlePressableMouseEnter } from "../../lib/helpers.js"
import type { ControlSize, Variants } from "../../types.js"
import { LoadingIndicator } from "../Indicator/index.js"
import s from "./SelectControl.module.css"

export type DropdownIconType = "chevronDown" | "dropdown" | "none"

export type SelectControlProps = ComponentProps<"button"> & {
  /** @default "outline" */
  variant?: Variants<"soft" | "outline" | "ghost">
  /**
   * | 3xs    | 2xs    | xs     | sm     | md     | lg     | xl     | 2xl    | 3xl    |
   * | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `22px` | `24px` | `26px` | `28px` | `32px` | `36px` | `40px` | `44px` | `48px` |
   * @default "md"
   */
  size?: ControlSize
  /** Fully rounded ends. */
  pill?: boolean
  /** Fills the width of its container. */
  block?: boolean
  /** Pulls the control out by its gutter, to line its text up with content around it. */
  opticallyAlign?: "start" | "end"
  /** Shows the invalid border and focus ring. */
  invalid?: boolean
  /** Shows the text in placeholder color, for a control with no value yet. */
  placeholder?: boolean
  /** Replaces the dropdown icon with a spinner, and ignores presses. */
  loading?: boolean
  /** @default "dropdown" */
  dropdownIconType?: DropdownIconType
  /** An icon before the text. */
  StartIcon?: ComponentType<SVGProps<SVGSVGElement>>
}

/**
 * Kova's select-style button. Select's trigger renders it, and any other popup trigger can too:
 * `<PopoverTrigger render={<SelectControl />}>`.
 */
export function SelectControl({
  variant = "outline",
  size = "md",
  pill,
  block,
  opticallyAlign,
  invalid,
  placeholder,
  loading,
  dropdownIconType = "dropdown",
  StartIcon,
  className,
  children,
  disabled,
  type = "button",
  onPointerEnter,
  onPointerDown,
  onClick,
  onKeyDown,
  ...props
}: SelectControlProps) {
  const showDropdownIcon = dropdownIconType !== "none" && !loading
  // A loading control stays focusable but must not open its popup, so presses stop here.
  const blockWhileLoading = <E extends { preventDefault(): void }>(
    handler: ((event: E) => void) | undefined,
  ) =>
    loading
      ? (event: E) => {
          event.preventDefault()
        }
      : handler

  return (
    <button
      type={type}
      className={cn(s.SelectControl, className)}
      disabled={disabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-block={block ? "" : undefined}
      data-optically-align={opticallyAlign}
      data-invalid={invalid ? "" : undefined}
      data-placeholder={placeholder ? "" : undefined}
      data-loading={loading ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      onPointerEnter={(event) => {
        handlePressableMouseEnter(event)
        onPointerEnter?.(event)
      }}
      onPointerDown={blockWhileLoading(onPointerDown)}
      onClick={blockWhileLoading(onClick)}
      onKeyDown={
        loading
          ? (event) => {
              if (event.key !== "Tab") event.preventDefault()
            }
          : onKeyDown
      }
      {...props}
    >
      {StartIcon && <StartIcon aria-hidden className={s.SelectControlStartIcon} />}
      <span className={s.SelectControlText}>{children}</span>
      {(loading || showDropdownIcon) && (
        <span className={s.SelectControlIndicator}>
          {loading ? (
            <LoadingIndicator className={s.SelectControlLoading} />
          ) : dropdownIconType === "chevronDown" ? (
            <ChevronDownVector
              aria-hidden
              className={cn(s.SelectControlDropdownIcon, s.SelectControlDropdownIconChevron)}
            />
          ) : (
            <DropdownVector aria-hidden className={s.SelectControlDropdownIcon} />
          )}
        </span>
      )}
    </button>
  )
}

export type SelectControlClearProps = ComponentProps<"button">

/**
 * A small clear button that sits inside the end of the `SelectControl` right before it. Render it
 * as the control's next sibling.
 */
function SelectControlClear({
  className,
  children,
  type = "button",
  ...props
}: SelectControlClearProps) {
  return (
    <button type={type} className={cn(s.SelectControlClear, className)} {...props}>
      {children ?? <X aria-hidden />}
    </button>
  )
}

SelectControl.Clear = SelectControlClear
