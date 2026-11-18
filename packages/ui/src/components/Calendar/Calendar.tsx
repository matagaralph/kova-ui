"use client"

import { ChevronLeft, ChevronRight } from "@kova-ui/icons"
import {
  Calendar as CalendarPrimitive,
  CalendarDay as CalendarDayPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  CalendarMonthSelect as CalendarMonthSelectPrimitive,
  CalendarNext as CalendarNextPrimitive,
  CalendarPrevious as CalendarPreviousPrimitive,
  CalendarWeekday as CalendarWeekdayPrimitive,
  CalendarWeekdays as CalendarWeekdaysPrimitive,
  CalendarWeeks as CalendarWeeksPrimitive,
  CalendarYearSelect as CalendarYearSelectPrimitive,
} from "@ui-sdk/react/calendar"
import type { ComponentProps } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import s from "./Calendar.module.css"

export type CalendarProps = ComponentProps<typeof CalendarPrimitive>

export function Calendar({
  className,
  showOutsideDays = false,
  months = 1,
  children,
  ...props
}: CalendarProps) {
  return (
    <CalendarPrimitive
      className={mergeClassName(s.Calendar, className)}
      showOutsideDays={showOutsideDays}
      months={months}
      {...props}
    >
      {children ?? (
        <>
          <CalendarHeader />
          <CalendarMonths months={months} />
        </>
      )}
    </CalendarPrimitive>
  )
}

export type CalendarMonthsProps = ComponentProps<"div"> & {
  /** How many grids to render, one per month shown. */
  months?: number
}

/** Lays out a calendar's grids side by side. Renders one `CalendarGrid` per month when it has no children. */
function CalendarMonths({ months = 1, className, children, ...props }: CalendarMonthsProps) {
  return (
    <div className={cn(s.CalendarMonths, className)} {...props}>
      {children ??
        Array.from({ length: months }, (_, offset) => (
          <CalendarGrid key={offset} offset={offset} />
        ))}
    </div>
  )
}

export type CalendarHeaderProps = ComponentProps<"div">

/** Lays out Previous, the heading and Next in a row. Renders all three when it has no children. */
function CalendarHeader({ className, children, ...props }: CalendarHeaderProps) {
  return (
    <div className={cn(s.CalendarHeader, className)} {...props}>
      {children ?? (
        <>
          <CalendarPrevious />
          <CalendarHeading />
          <CalendarNext />
        </>
      )}
    </div>
  )
}

export type CalendarPreviousProps = ComponentProps<typeof CalendarPreviousPrimitive>

function CalendarPrevious({ className, children, ...props }: CalendarPreviousProps) {
  return (
    <CalendarPreviousPrimitive className={mergeClassName(s.CalendarStep, className)} {...props}>
      {children ?? <ChevronLeft aria-hidden="true" className={s.CalendarStepIcon} />}
    </CalendarPreviousPrimitive>
  )
}

export type CalendarNextProps = ComponentProps<typeof CalendarNextPrimitive>

function CalendarNext({ className, children, ...props }: CalendarNextProps) {
  return (
    <CalendarNextPrimitive className={mergeClassName(s.CalendarStep, className)} {...props}>
      {children ?? <ChevronRight aria-hidden="true" className={s.CalendarStepIcon} />}
    </CalendarNextPrimitive>
  )
}

export type CalendarHeadingProps = ComponentProps<typeof CalendarHeadingPrimitive>

function CalendarHeading({ className, ...props }: CalendarHeadingProps) {
  return (
    <CalendarHeadingPrimitive className={mergeClassName(s.CalendarHeading, className)} {...props} />
  )
}

export type CalendarMonthSelectProps = ComponentProps<typeof CalendarMonthSelectPrimitive>

function CalendarMonthSelect({ className, ...props }: CalendarMonthSelectProps) {
  return (
    <CalendarMonthSelectPrimitive
      className={mergeClassName(s.CalendarSelect, className)}
      {...props}
    />
  )
}

export type CalendarYearSelectProps = ComponentProps<typeof CalendarYearSelectPrimitive>

function CalendarYearSelect({ className, ...props }: CalendarYearSelectProps) {
  return (
    <CalendarYearSelectPrimitive
      className={mergeClassName(s.CalendarSelect, className)}
      {...props}
    />
  )
}

export type CalendarGridProps = ComponentProps<typeof CalendarGridPrimitive>

/** Renders Kova's weekday headers and days when it has no children. */
function CalendarGrid({ className, children, ...props }: CalendarGridProps) {
  return (
    <CalendarGridPrimitive className={mergeClassName(s.CalendarGrid, className)} {...props}>
      {children ?? (
        <>
          <CalendarWeekdays>{(index) => <CalendarWeekday index={index} />}</CalendarWeekdays>
          <CalendarWeeks>{(cell) => <CalendarDay value={cell.date} />}</CalendarWeeks>
        </>
      )}
    </CalendarGridPrimitive>
  )
}

export type CalendarWeekdaysProps = ComponentProps<typeof CalendarWeekdaysPrimitive>

function CalendarWeekdays({ className, ...props }: CalendarWeekdaysProps) {
  return <CalendarWeekdaysPrimitive className={cn(s.CalendarWeekdays, className)} {...props} />
}

export type CalendarWeekdayProps = ComponentProps<typeof CalendarWeekdayPrimitive>

function CalendarWeekday({ className, ...props }: CalendarWeekdayProps) {
  return (
    <CalendarWeekdayPrimitive className={mergeClassName(s.CalendarWeekday, className)} {...props} />
  )
}

export type CalendarWeeksProps = ComponentProps<typeof CalendarWeeksPrimitive>

function CalendarWeeks({ className, ...props }: CalendarWeeksProps) {
  return <CalendarWeeksPrimitive className={cn(s.CalendarWeeks, className)} {...props} />
}

export type CalendarDayProps = ComponentProps<typeof CalendarDayPrimitive>

function CalendarDay({ className, ...props }: CalendarDayProps) {
  return <CalendarDayPrimitive className={mergeClassName(s.CalendarDay, className)} {...props} />
}

Calendar.Day = CalendarDay
Calendar.Grid = CalendarGrid
Calendar.Next = CalendarNext
Calendar.Weeks = CalendarWeeks
Calendar.Header = CalendarHeader
Calendar.Months = CalendarMonths
Calendar.Heading = CalendarHeading
Calendar.Weekday = CalendarWeekday
Calendar.Previous = CalendarPrevious
Calendar.Weekdays = CalendarWeekdays
Calendar.YearSelect = CalendarYearSelect
Calendar.MonthSelect = CalendarMonthSelect
