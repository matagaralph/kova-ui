"use client"

import { Textarea as TextareaPrimitive, type TextareaState } from "@ui-sdk/react/textarea"
import {
  type AnimationEvent,
  type ComponentProps,
  type CSSProperties,
  useEffect,
  useRef,
} from "react"
import { mergeClassName } from "../../lib/cn.js"
import { mergeRefs } from "../../lib/mergeRefs.js"
import { type ControlSize, type Sizes, type Variants } from "../../types.js"
import s from "./Textarea.module.css"

export type TextareaProps = Omit<ComponentProps<typeof TextareaPrimitive>, "size"> & {
  /** The field's fill style. */
  variant?: Variants<"outline" | "soft">
  /** Sets the gutters, font size and radius, matching an `Input` of the same size. */
  size?: ControlSize
  /** Overrides the side gutter that `size` sets. */
  gutterSize?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** The rows it shows when empty. */
  rows?: number
  /** How many rows `autoResize` grows to before the text scrolls. Defaults to 10, or `rows` if larger. */
  maxRows?: number
  /** Lets password managers offer to fill the field. Defaults to `true` for a named field. */
  allowAutofillExtensions?: boolean
  /** Selects the text when the textarea mounts. */
  autoSelect?: boolean
  /** Runs when the browser autofills the textarea. */
  onAutofill?: () => void
}

export function Textarea({
  variant = "outline",
  size = "md",
  gutterSize,
  rows = 3,
  maxRows,
  autoResize,
  allowAutofillExtensions,
  autoSelect,
  onAutofill,
  onAnimationStart,
  className,
  style,
  ref,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const allowAutofill = allowAutofillExtensions ?? !!props.name
  const rowVariables = {
    "--textarea-min-rows": rows,
    "--textarea-max-rows": autoResize ? Math.max(maxRows ?? 10, rows) : rows,
  } as CSSProperties

  useEffect(() => {
    if (autoSelect) textareaRef.current?.select()
  }, [autoSelect])

  return (
    <TextareaPrimitive
      ref={mergeRefs([ref, textareaRef])}
      className={mergeClassName(s.Textarea, className)}
      style={
        typeof style === "function"
          ? (state: TextareaState) => ({ ...rowVariables, ...style(state) })
          : { ...rowVariables, ...style }
      }
      data-variant={variant}
      data-size={size}
      data-gutter-size={gutterSize}
      data-lpignore={allowAutofill ? undefined : true}
      data-1p-ignore={allowAutofill ? undefined : true}
      rows={rows}
      autoResize={autoResize}
      onAnimationStart={(event: AnimationEvent<HTMLTextAreaElement>) => {
        onAnimationStart?.(event)
        if (event.animationName === "native-autofill-in") onAutofill?.()
      }}
      {...props}
    />
  )
}
