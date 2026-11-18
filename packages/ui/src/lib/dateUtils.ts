import {
  addDays,
  addMonths,
  endOfMonth,
  startOfMonth,
  todayDate,
  type ISODate,
} from "@ui-sdk/core/date"

export {
  addDays,
  addMonths,
  addYears,
  daysBetween,
  endOfMonth,
  formatDate,
  formatDateRange,
  isISODate,
  parseDate,
  startOfMonth,
  toISODate,
  todayDate,
  type ISODate,
} from "@ui-sdk/core/date"

/** A start and end date, both included, as `DatePicker` and `Calendar` take in range mode. */
export type DateRange = [start: ISODate, end: ISODate]

/** A named range for a `DatePickerPreset`. */
export type DateRangePreset = {
  label: string
  value: DateRange
}

type Bounds = { min?: ISODate; max?: ISODate }

const clampRange = ([start, end]: DateRange, { min, max }: Bounds = {}): DateRange => [
  min && start < min ? min : start,
  max && end > max ? max : end,
]

/** The month a date is in, from its first to its last day, kept within `min` and `max`. */
export function getMonthRange(date: ISODate, bounds?: Bounds): DateRange {
  return clampRange([startOfMonth(date), endOfMonth(date)], bounds)
}

/** The last `days` days, ending on `today` and counting it. */
export function getLastDaysRange(days: number, today: ISODate = todayDate()): DateRange {
  return [addDays(today, 1 - days), today]
}

/** The current month up to `today`. */
export function getMonthToDateRange(today: ISODate = todayDate()): DateRange {
  return [startOfMonth(today), today]
}

/** The whole month before `today`'s. */
export function getLastMonthRange(today: ISODate = todayDate()): DateRange {
  return getMonthRange(addMonths(startOfMonth(today), -1))
}

/** The current year up to `today`. */
export function getYearToDateRange(today: ISODate = todayDate()): DateRange {
  return [`${today.slice(0, 4)}-01-01`, today]
}

/** Kova's common ranges for `DatePickerPreset`s, relative to `today`. Labels are in English. */
export function getDateRangePresets(today: ISODate = todayDate()): DateRangePreset[] {
  return [
    { label: "Today", value: [today, today] },
    { label: "Last 7 days", value: getLastDaysRange(7, today) },
    { label: "Last 30 days", value: getLastDaysRange(30, today) },
    { label: "Month to date", value: getMonthToDateRange(today) },
    { label: "Last month", value: getLastMonthRange(today) },
    { label: "Year to date", value: getYearToDateRange(today) },
  ]
}

/** Whether two ranges hold the same dates, as when matching a value to its preset. */
export function isSameRange(a: DateRange | null | undefined, b: DateRange | null | undefined) {
  return !!a && !!b && a[0] === b[0] && a[1] === b[1]
}
