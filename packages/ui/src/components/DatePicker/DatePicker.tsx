"use client"

import {
  Calendar as CalendarIcon,
  Check,
  ChevronDownVector,
  DropdownVector,
  X,
} from "@kova-ui/icons"
import { pageLocale } from "@ui-sdk/core"
import { formatDate } from "@ui-sdk/core/date"
import {
  DatePicker as DatePickerPrimitive,
  DatePickerClear as DatePickerClearPrimitive,
  DatePickerContent as DatePickerContentPrimitive,
  DatePickerHint as DatePickerHintPrimitive,
  DatePickerInput as DatePickerInputPrimitive,
  DatePickerPreset as DatePickerPresetPrimitive,
  DatePickerTrigger as DatePickerTriggerPrimitive,
  type DatePickerValue,
} from "@ui-sdk/react/date-picker"
import {
  useCallback,
  useState,
  type ComponentProps,
  type PointerEvent,
  type ReactNode,
} from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import { handlePressableMouseEnter } from "../../lib/helpers.js"
import { mergeRefs } from "../../lib/mergeRefs.js"
import type { ControlSize, Variants } from "../../types.js"
import { Calendar } from "../Calendar/index.js"
import s from "./DatePicker.module.css"
import { DatePickerContext, useDatePickerContext } from "./DatePickerContext.js"

type ControlVariant = Variants<"outline" | "soft" | "ghost">

export type DatePickerProps = ComponentProps<typeof DatePickerPrimitive>

export function DatePicker({
  className,
  mode = "single",
  months = 1,
  locale,
  showOutsideDays = false,
  ref,
  children,
  ...props
}: DatePickerProps) {
  // Like ui-sdk's own labels: English on the first render, so server and client match, then the page's language
  const [pageLanguage, setPageLanguage] = useState<string>()
  const rootRef = useCallback((element: HTMLDivElement | null) => {
    if (element) setPageLanguage(pageLocale(element))
  }, [])

  return (
    <DatePickerPrimitive
      ref={mergeRefs([rootRef, ref])}
      className={mergeClassName(s.DatePicker, className)}
      mode={mode}
      months={months}
      locale={locale}
      showOutsideDays={showOutsideDays}
      {...props}
    >
      {(state) => (
        <DatePickerContext
          value={{ value: state.value, mode, months, locale: locale ?? pageLanguage ?? "en-US" }}
        >
          {typeof children === "function" ? children(state) : children}
        </DatePickerContext>
      )}
    </DatePickerPrimitive>
  )
}

export type DatePickerTriggerProps = ComponentProps<typeof DatePickerTriggerPrimitive> & {
  /**
   * Style variant of the trigger
   * @default outline
   */
  variant?: ControlVariant
  /**
   * Height and spacing of the trigger
   * @default md
   */
  size?: ControlSize
  /** Fully rounded pill shape */
  pill?: boolean
  /** Extends the trigger to the full width of its container */
  block?: boolean
  /** Square trigger that shows only the calendar icon, for use beside a `DatePickerInput` */
  uniform?: boolean
  /**
   * Shows a calendar icon before the date
   * @default true
   */
  showIcon?: boolean
  /**
   * Indicator at the end of the trigger
   * @default dropdown
   */
  dropdownIconType?: "dropdown" | "chevronDown" | "none"
}

/** Opens the calendar. Shows the selected date with `DatePickerValueText` when it has no children. */
function DatePickerTrigger({
  className,
  variant = "outline",
  size = "md",
  pill = false,
  block = false,
  uniform = false,
  showIcon = true,
  dropdownIconType = "dropdown",
  onPointerEnter,
  children,
  ...props
}: DatePickerTriggerProps) {
  const content = (inner: ReactNode) => (
    <>
      {(showIcon || uniform) && <CalendarIcon aria-hidden="true" className={s.StartIcon} />}
      {!uniform && (
        <span className={s.TriggerText}>
          {inner === undefined ? <DatePickerValueText /> : inner}
        </span>
      )}
      {!uniform && dropdownIconType !== "none" && <DropdownIcon type={dropdownIconType} />}
    </>
  )

  return (
    <DatePickerTriggerPrimitive
      className={mergeClassName(cn(s.Control, s.DatePickerTrigger), className)}
      data-variant={variant}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-block={block ? "" : undefined}
      data-uniform={uniform ? "" : undefined}
      onPointerEnter={(event: PointerEvent<HTMLButtonElement>) => {
        handlePressableMouseEnter(event)
        onPointerEnter?.(event)
      }}
      {...props}
    >
      {typeof children === "function" ? (state) => content(children(state)) : content(children)}
    </DatePickerTriggerPrimitive>
  )
}

function DropdownIcon({ type }: { type: "dropdown" | "chevronDown" }) {
  return type === "chevronDown" ? (
    <ChevronDownVector aria-hidden="true" className={cn(s.DropdownIcon, s.DropdownIconChevron)} />
  ) : (
    <DropdownVector aria-hidden="true" className={s.DropdownIcon} />
  )
}

export type DatePickerValueTextProps = Omit<ComponentProps<"span">, "children"> & {
  /**
   * Shown while nothing is selected
   * @default "Select date..." or "Select date range..."
   */
  placeholder?: ReactNode
  /**
   * How each date is written, as `Intl.DateTimeFormat` options
   * @default { month: "2-digit", day: "2-digit", year: "2-digit" }
   */
  formatOptions?: Intl.DateTimeFormatOptions
  /** Renders the value yourself, like a preset's name for a range */
  children?: (value: DatePickerValue) => ReactNode
}

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "2-digit",
}

/** The selected date, or range, written out for the trigger. */
function DatePickerValueText({
  className,
  placeholder,
  formatOptions = DEFAULT_FORMAT,
  children,
  ...props
}: DatePickerValueTextProps) {
  const { value, mode, locale } = useDatePickerContext("DatePickerValueText")
  const format = (date: string) => formatDate(date, locale, formatOptions)

  let content: ReactNode
  if (value === null) {
    content = placeholder ?? (mode === "range" ? "Select date range..." : "Select date...")
  } else if (children) {
    content = children(value)
  } else if (typeof value === "string") {
    content = format(value)
  } else if (value[0] === value[1]) {
    content = format(value[0])
  } else {
    content = (
      <>
        {format(value[0])}
        <span className={s.RangeSeparator}>–</span>
        {format(value[1])}
      </>
    )
  }

  return (
    <span
      className={cn(s.DatePickerValueText, className)}
      data-placeholder={value === null ? "" : undefined}
      {...props}
    >
      {content}
    </span>
  )
}

export type DatePickerInputProps = Omit<ComponentProps<typeof DatePickerInputPrimitive>, "size"> & {
  /**
   * Style variant of the input
   * @default outline
   */
  variant?: ControlVariant
  /**
   * Height and spacing of the input
   * @default md
   */
  size?: ControlSize
  /** Fully rounded pill shape */
  pill?: boolean
  /** Extends the input to the full width of its container */
  block?: boolean
}

function DatePickerInput({
  className,
  variant = "outline",
  size = "md",
  pill = false,
  block = false,
  ...props
}: DatePickerInputProps) {
  return (
    <DatePickerInputPrimitive
      className={mergeClassName(cn(s.Control, s.DatePickerInput), className)}
      data-variant={variant}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-block={block ? "" : undefined}
      {...props}
    />
  )
}

export type DatePickerHintProps = ComponentProps<typeof DatePickerHintPrimitive>

function DatePickerHint({ className, ...props }: DatePickerHintProps) {
  return (
    <DatePickerHintPrimitive className={mergeClassName(s.DatePickerHint, className)} {...props} />
  )
}

export type DatePickerClearProps = ComponentProps<typeof DatePickerClearPrimitive>

/** Clears the value. Shows an X icon when it has no children, and hides while there is nothing to clear. */
function DatePickerClear({ className, children, ...props }: DatePickerClearProps) {
  return (
    <DatePickerClearPrimitive
      className={mergeClassName(s.DatePickerClear, className)}
      aria-label="Clear date"
      {...props}
    >
      {children ?? <X aria-hidden="true" />}
    </DatePickerClearPrimitive>
  )
}

export type DatePickerContentProps = ComponentProps<typeof DatePickerContentPrimitive>

/** The calendar popup. Renders Kova's calendar, one grid per month shown, when it has no children. */
function DatePickerContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: DatePickerContentProps) {
  const { months } = useDatePickerContext("DatePickerContent")
  return (
    <DatePickerContentPrimitive
      className={mergeClassName(s.DatePickerContent, className)}
      sideOffset={sideOffset}
      {...props}
    >
      {children ?? (
        <>
          <Calendar.Header />
          <Calendar.Months months={months} />
        </>
      )}
    </DatePickerContentPrimitive>
  )
}

export type DatePickerPresetsProps = ComponentProps<"div">

/** Lays out presets in a column beside the calendar, or a row above it on small screens. */
function DatePickerPresets({ className, ...props }: DatePickerPresetsProps) {
  return <div className={cn(s.DatePickerPresets, className)} {...props} />
}

export type DatePickerPresetProps = ComponentProps<typeof DatePickerPresetPrimitive>

/** Selects its `value`. Shows a check mark while that value is the one selected. */
function DatePickerPreset({ className, children, ...props }: DatePickerPresetProps) {
  const content = (inner: ReactNode) => (
    <>
      <span className={s.PresetLabel}>{inner}</span>
      <Check aria-hidden="true" className={s.PresetCheck} />
    </>
  )

  return (
    <DatePickerPresetPrimitive className={mergeClassName(s.DatePickerPreset, className)} {...props}>
      {typeof children === "function" ? (state) => content(children(state)) : content(children)}
    </DatePickerPresetPrimitive>
  )
}

DatePicker.Hint = DatePickerHint
DatePicker.Clear = DatePickerClear
DatePicker.Input = DatePickerInput
DatePicker.Preset = DatePickerPreset
DatePicker.Content = DatePickerContent
DatePicker.Presets = DatePickerPresets
DatePicker.Trigger = DatePickerTrigger
DatePicker.ValueText = DatePickerValueText
