"use client"

import type { DatePickerMode, DatePickerValue } from "@ui-sdk/react/date-picker"
import { createContext, use } from "react"

export type DatePickerContextValue = {
  value: DatePickerValue
  mode: DatePickerMode
  months: number
  locale: string
}

export const DatePickerContext = createContext<DatePickerContextValue | null>(null)

export function useDatePickerContext(part: string): DatePickerContextValue {
  const context = use(DatePickerContext)
  if (!context) {
    throw new Error(`${part} must be placed inside a <DatePicker>`)
  }
  return context
}
