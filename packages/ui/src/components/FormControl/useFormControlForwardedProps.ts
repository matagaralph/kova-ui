"use client"

import { createContext, use } from "react"
import type { FormControlProps, FormValidationStatus } from "./FormControl.js"

export type FormControlContextValue = {
  id?: string
  disabled?: boolean
  required?: boolean
  captionId?: string
  validationMessageId?: string
  validationStatus?: FormValidationStatus
  labelId?: string
}

export const FormControlContext = createContext<FormControlContextValue | null>(null)

export const useFormControlContext = (): FormControlContextValue => use(FormControlContext) ?? {}

type FormControlForwardedProps = Pick<FormControlProps, "disabled" | "id" | "required"> & {
  "aria-describedby"?: string
}

/**
 * Make any component compatible with `FormControl`'s automatic wiring of accessibility attributes by
 * reading the props from this hook and merging them with the passed-in props. Has no effect outside `FormControl`.
 *
 * @param externalProps The props passed to the component. These take priority over the `FormControl` props.
 */
export function useFormControlForwardedProps<P>(externalProps: P): P & FormControlForwardedProps {
  const context = use(FormControlContext)
  if (!context) return externalProps as P & FormControlForwardedProps

  return {
    "disabled": context.disabled,
    "id": context.id,
    "required": context.required,
    "aria-describedby":
      [context.validationMessageId, context.captionId].filter(Boolean).join(" ") || undefined,
    ...externalProps,
  }
}
