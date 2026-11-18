"use client"

import { X } from "@kova-ui/icons"
import {
  Input as InputPrimitive,
  InputClear as InputClearPrimitive,
  InputGroup as InputGroupPrimitive,
} from "@ui-sdk/react/input"
import {
  type AnimationEvent,
  type ComponentProps,
  createContext,
  use,
  useEffect,
  useRef,
} from "react"
import { mergeClassName } from "../../lib/cn.js"
import { mergeRefs } from "../../lib/mergeRefs.js"
import { type ControlSize, type Sizes, type Variants } from "../../types.js"
import s from "./Input.module.css"

type InputVisualProps = {
  /** The field's fill style. */
  variant?: Variants<"outline" | "soft">
  /** The field's height, with matching gutter and font sizes: `22px` (`3xs`) to `48px` (`3xl`). */
  size?: ControlSize
  /** Overrides the gutter that `size` sets. */
  gutterSize?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** Rounds the field fully. */
  pill?: boolean
  /** Pulls the field out by its gutter, to line its text up with the content around it. */
  opticallyAlign?: "start" | "end"
}

const InputGroupContext = createContext(false)

function visualAttributes({
  variant = "outline",
  size = "md",
  gutterSize,
  pill,
  opticallyAlign,
}: InputVisualProps) {
  return {
    "data-variant": variant,
    "data-size": size,
    "data-gutter-size": gutterSize,
    "data-pill": pill ? "" : undefined,
    "data-optically-align": opticallyAlign,
  }
}

export type InputProps = Omit<ComponentProps<typeof InputPrimitive>, "size"> &
  InputVisualProps & {
    /**
     * Lets password managers offer to fill the field. Defaults to `true` for a password, a named
     * field, or one with `autoComplete`.
     */
    allowAutofillExtensions?: boolean
    /** Selects the text when the input mounts. */
    autoSelect?: boolean
    /** Runs when the browser autofills the input. */
    onAutofill?: () => void
  }

/** Kova's visual props go on the `InputGroup` instead when the input is inside one. */
export function Input({
  variant,
  size,
  gutterSize,
  pill,
  opticallyAlign,
  allowAutofillExtensions,
  autoSelect,
  onAutofill,
  onAnimationStart,
  className,
  ref,
  ...props
}: InputProps) {
  const grouped = use(InputGroupContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const allowAutofill =
    allowAutofillExtensions ??
    (props.type === "password" ||
      !!props.name ||
      (!!props.autoComplete && props.autoComplete !== "off"))

  useEffect(() => {
    if (autoSelect) inputRef.current?.select()
  }, [autoSelect])

  return (
    <InputPrimitive
      ref={mergeRefs([ref, inputRef])}
      className={mergeClassName(s.Input, className)}
      {...(grouped ? null : visualAttributes({ variant, size, gutterSize, pill, opticallyAlign }))}
      data-lpignore={allowAutofill ? undefined : true}
      data-1p-ignore={allowAutofill ? undefined : true}
      onAnimationStart={(event: AnimationEvent<HTMLInputElement>) => {
        onAnimationStart?.(event)
        if (event.animationName === "native-autofill-in") onAutofill?.()
      }}
      {...props}
    />
  )
}

export type InputGroupProps = ComponentProps<typeof InputGroupPrimitive> & InputVisualProps

function InputGroup({
  variant,
  size,
  gutterSize,
  pill,
  opticallyAlign,
  className,
  ...props
}: InputGroupProps) {
  return (
    <InputGroupContext value>
      <InputGroupPrimitive
        className={mergeClassName(s.InputGroup, className)}
        {...visualAttributes({ variant, size, gutterSize, pill, opticallyAlign })}
        {...props}
      />
    </InputGroupContext>
  )
}

export type InputClearProps = ComponentProps<typeof InputClearPrimitive>

/** Renders an X icon when it has no children. Name it with `aria-label`. */
function InputClear({ className, children, ...props }: InputClearProps) {
  return (
    <InputClearPrimitive className={mergeClassName(s.InputClear, className)} {...props}>
      {children ?? <X aria-hidden="true" />}
    </InputClearPrimitive>
  )
}

Input.Clear = InputClear
Input.Group = InputGroup
