"use client"

import { Field } from "@base-ui/react/field"
import clsx from "clsx"
import {
  Children,
  cloneElement,
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  useId,
} from "react"
import { isDev, isTest } from "../../lib/constants.js"
import { Checkbox } from "../Checkbox/index.js"
import { Input } from "../Input/index.js"
import { Select } from "../Select/index.js"
import { Switch } from "../Switch/index.js"
import { TagInput } from "../TagInput/index.js"
import { Textarea } from "../Textarea/index.js"
import s from "./FormControl.module.css"
import { FormControlContext, useFormControlContext } from "./useFormControlForwardedProps.js"

export type FormValidationStatus = "error" | "success"

export type FormControlProps = {
  children?: ReactNode
  /**
   * Whether the control allows user input
   * @default false
   */
  disabled?: boolean
  /**
   * The unique identifier for this control. Used to associate the label, validation text, and caption text
   * @default a generated id
   */
  id?: string
  /**
   * If true, the user must specify a value for the input before the owning form can be submitted
   * @default false
   */
  required?: boolean
  /**
   * The direction the content flows.
   * Vertical layout is used by default, and horizontal layout is used for checkbox and switch inputs.
   * @default vertical
   */
  layout?: "horizontal" | "vertical"
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLDivElement>
}

export type FormControlLabelProps = {
  children?: ReactNode
  /**
   * Whether the label should be visually hidden
   * @default false
   */
  visuallyHidden?: boolean
  /**
   * The text to display when the field is required
   * @default "*"
   */
  requiredText?: string
  /**
   * Whether to keep the required text in the accessibility tree. The text is still shown visually when false.
   * @default true
   */
  requiredIndicator?: boolean
  /**
   * Render a `legend` when labelling a fieldset, or a `span` when labelling an element that is not a form input
   * @default label
   */
  as?: "label" | "legend" | "span"
  /**
   * Overrides the `htmlFor` set by `FormControl`
   */
  htmlFor?: string
  /**
   * Overrides the `id` set by `FormControl`
   */
  id?: string
  className?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, "children" | "id" | "className" | "style">

export type FormControlCaptionProps = {
  children?: ReactNode
  /**
   * Overrides the `id` set by `FormControl`
   */
  id?: string
  className?: string
  style?: CSSProperties
}

export type FormControlValidationProps = {
  children?: ReactNode
  /**
   * Changes the visual style to match the validation status
   */
  variant: FormValidationStatus
  /**
   * Overrides the `id` set by `FormControl`
   */
  id?: string
  className?: string
  style?: CSSProperties
}

export type FormControlLeadingVisualProps = {
  /** The visual to render before the choice input's label */
  children?: ReactNode
  style?: CSSProperties
}

const shouldValidate = isDev || isTest

function warning(condition: boolean, message: string) {
  if (shouldValidate && condition) {
    // eslint-disable-next-line no-console
    console.warn(`Warning: ${message}`)
  }
}

// Slots are matched by component, or by a `__SLOT__` marker so they can be wrapped in other components
type SlotMarker = { __SLOT__?: symbol }

const isSlot = <P,>(
  child: ReactNode,
  slot: SlotMarker & ((props: P) => ReactNode),
): child is ReactElement<P> =>
  isValidElement(child) &&
  (child.type === slot || (child.type as SlotMarker).__SLOT__ === slot.__SLOT__)

// How FormControl wires up each supported Kova input
type InputKind = "text" | "choice" | "select" | "tags"

const INPUT_KINDS = new Map<unknown, InputKind>([
  [Input, "text"],
  [Textarea, "text"],
  [Checkbox, "choice"],
  [Switch, "choice"],
  [Select, "select"],
  [TagInput, "tags"],
])

type InputElement = ReactElement<Record<string, unknown>>

const FormControlRoot = ({
  children,
  disabled,
  layout = "vertical",
  id: idProp,
  required,
  className,
  style,
  ref,
}: FormControlProps) => {
  const generatedId = useId()
  const id = idProp ?? generatedId

  let label: ReactElement<FormControlLabelProps> | undefined
  let caption: ReactElement<FormControlCaptionProps> | undefined
  let validation: ReactElement<FormControlValidationProps> | undefined
  let leadingVisual: ReactElement<FormControlLeadingVisualProps> | undefined
  const otherChildren: ReactNode[] = []

  for (const child of Children.toArray(children)) {
    if (!label && isSlot(child, FormControlLabel)) label = child
    else if (!caption && isSlot(child, FormControlCaption)) caption = child
    else if (!validation && isSlot(child, FormControlValidation)) validation = child
    else if (!leadingVisual && isSlot(child, FormControlLeadingVisual)) leadingVisual = child
    else otherChildren.push(child)
  }

  const input = otherChildren.find(
    (child): child is InputElement => isValidElement(child) && INPUT_KINDS.has(child.type),
  )
  const inputKind = input ? INPUT_KINDS.get(input.type) : undefined
  const inputProps = input?.props ?? {}
  const isChoiceInput = inputKind === "choice"
  const restChildren = otherChildren.filter((child) => child !== input)

  const captionId = caption ? (caption.props.id ?? `${id}-caption`) : undefined
  const validationMessageId = validation
    ? (validation.props.id ?? `${id}-validationMessage`)
    : undefined
  const validationStatus = validation?.props.variant
  const labelId = label ? (label.props.id ?? `${id}-label`) : undefined

  if (input) {
    warning(
      inputProps.id !== undefined,
      "instead of passing the 'id' prop directly to the input component, it should be passed to the parent component, <FormControl>",
    )
    warning(
      inputProps.disabled !== undefined,
      "instead of passing the 'disabled' prop directly to the input component, it should be passed to the parent component, <FormControl>",
    )
    warning(
      inputProps.required !== undefined,
      "instead of passing the 'required' prop directly to the input component, it should be passed to the parent component, <FormControl>",
    )
  }

  if (!label && shouldValidate) {
    // eslint-disable-next-line no-console
    console.error(
      `The input field with the id ${id} MUST have a FormControl.Label child.\n\nIf you want to hide the label, pass the 'visuallyHidden' prop to the FormControl.Label component.`,
    )
  }

  if (isChoiceInput) {
    warning(
      !!validation,
      "Validation messages are not rendered for an individual checkbox or switch. The validation message should be shown for all options.",
    )
  } else {
    warning(
      !!leadingVisual,
      "A leading visual is only rendered for a checkbox or switch form control. If you want to render a leading visual inside of your input, check if your input supports a leading visual.",
    )
  }

  const describedBy = isChoiceInput
    ? captionId
    : [validationMessageId, captionId].filter(Boolean).join(" ") || undefined
  const isInvalid = validationStatus === "error"

  const forwardedProps: Record<string, unknown> = {
    id,
    disabled,
    ...(inputKind !== "tags" && { required }),
    ...(inputKind === "text" && { invalid: isInvalid || undefined }),
  }
  const controlledProps = Object.fromEntries(
    Object.entries(forwardedProps).filter(([key]) => inputProps[key] === undefined),
  )
  const control = input
    ? cloneElement(input, {
        ...controlledProps,
        ...(inputKind === "text" && isInvalid && { "aria-invalid": true }),
        ...(inputKind && {
          "aria-describedby":
            [inputProps["aria-describedby"], describedBy].filter(Boolean).join(" ") || undefined,
        }),
      })
    : null

  const isHorizontal = isChoiceInput || layout === "horizontal"

  return (
    <FormControlContext
      value={{
        id,
        disabled,
        required,
        captionId,
        validationMessageId,
        validationStatus,
        labelId,
      }}
    >
      <Field.Root
        ref={ref}
        className={clsx(s.FormControl, className)}
        style={style}
        disabled={disabled}
        invalid={isInvalid}
        data-component="FormControl"
        data-layout={isHorizontal ? "horizontal" : "vertical"}
        data-has-leading-visual={isHorizontal && leadingVisual ? "" : undefined}
      >
        {isHorizontal ? (
          <>
            <div className={s.ChoiceInput}>
              {control}
              {restChildren}
            </div>
            {leadingVisual}
            <div className={s.LabelContainer}>
              {label}
              {caption}
            </div>
          </>
        ) : (
          <>
            {label}
            {control}
            {restChildren}
            {validation}
            {caption}
          </>
        )}
      </Field.Root>
    </FormControlContext>
  )
}

export const FormControlLabel = ({
  as = "label",
  children,
  htmlFor,
  id,
  visuallyHidden,
  requiredIndicator = true,
  requiredText,
  className,
  ...restProps
}: FormControlLabelProps) => {
  const { id: formControlId, required, labelId } = useFormControlContext()
  const isNativeLabel = as === "label"

  return (
    <Field.Label
      {...restProps}
      nativeLabel={isNativeLabel}
      render={isNativeLabel ? undefined : createElement(as)}
      id={id ?? labelId}
      htmlFor={isNativeLabel ? (htmlFor ?? formControlId) : undefined}
      className={clsx(s.Label, className)}
      data-visually-hidden={visuallyHidden ? "" : undefined}
      data-component="FormControl.Label"
    >
      {required || requiredText ? (
        <span className={s.RequiredText}>
          <span>{children}</span>
          <span aria-hidden={requiredIndicator ? undefined : true}>{requiredText ?? "*"}</span>
        </span>
      ) : (
        children
      )}
    </Field.Label>
  )
}

FormControlLabel.__SLOT__ = Symbol("FormControl.Label")

export const FormControlCaption = ({ id, children, className, style }: FormControlCaptionProps) => {
  const { captionId } = useFormControlContext()

  return (
    <Field.Description
      id={id ?? captionId}
      className={clsx(s.Caption, className)}
      style={style}
      data-component="FormControl.Caption"
    >
      {children}
    </Field.Description>
  )
}

FormControlCaption.__SLOT__ = Symbol("FormControl.Caption")

export const FormControlValidation = ({
  children,
  className,
  variant,
  id,
  style,
}: FormControlValidationProps) => {
  const { validationMessageId } = useFormControlContext()

  return (
    <div
      className={clsx(s.Validation, className)}
      style={style}
      data-validation-status={variant}
      data-component="FormControl.Validation"
    >
      <span id={id ?? validationMessageId}>{children}</span>
    </div>
  )
}

FormControlValidation.__SLOT__ = Symbol("FormControl.Validation")

export const FormControlLeadingVisual = ({ children, style }: FormControlLeadingVisualProps) => {
  const { disabled, captionId } = useFormControlContext()

  return (
    <div
      className={s.LeadingVisual}
      style={style}
      data-disabled={disabled ? "" : undefined}
      data-has-caption={captionId ? "" : undefined}
      data-component="FormControl.LeadingVisual"
    >
      {children}
    </div>
  )
}

FormControlLeadingVisual.__SLOT__ = Symbol("FormControl.LeadingVisual")

const FormControl = Object.assign(FormControlRoot, {
  Label: FormControlLabel,
  Caption: FormControlCaption,
  Validation: FormControlValidation,
  LeadingVisual: FormControlLeadingVisual,
})

export { FormControl }
