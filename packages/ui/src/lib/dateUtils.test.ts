import { describe, expect, it } from "vite-plus/test"
import {
  getDateRangePresets,
  getLastDaysRange,
  getLastMonthRange,
  getMonthRange,
  getMonthToDateRange,
  getYearToDateRange,
  isSameRange,
} from "./dateUtils.js"

describe("dateUtils", () => {
  it("finds a month's first and last day, within bounds", () => {
    expect(getMonthRange("2028-02-14")).toEqual(["2028-02-01", "2028-02-29"])
    expect(getMonthRange("2026-10-16", { min: "2026-10-05", max: "2026-10-20" })).toEqual([
      "2026-10-05",
      "2026-10-20",
    ])
  })

  it("counts today in the last days", () => {
    expect(getLastDaysRange(7, "2026-10-16")).toEqual(["2026-10-10", "2026-10-16"])
    expect(getLastDaysRange(30, "2026-03-01")).toEqual(["2026-01-31", "2026-03-01"])
  })

  it("builds month and year ranges across boundaries", () => {
    expect(getMonthToDateRange("2026-10-16")).toEqual(["2026-10-01", "2026-10-16"])
    expect(getLastMonthRange("2026-01-31")).toEqual(["2025-12-01", "2025-12-31"])
    expect(getLastMonthRange("2026-03-31")).toEqual(["2026-02-01", "2026-02-28"])
    expect(getYearToDateRange("2026-10-16")).toEqual(["2026-01-01", "2026-10-16"])
  })

  it("lists presets relative to today", () => {
    const presets = getDateRangePresets("2026-10-16")
    expect(presets.map((preset) => preset.label)).toEqual([
      "Today",
      "Last 7 days",
      "Last 30 days",
      "Month to date",
      "Last month",
      "Year to date",
    ])
    expect(presets[0]?.value).toEqual(["2026-10-16", "2026-10-16"])
    expect(presets[4]?.value).toEqual(["2026-09-01", "2026-09-30"])
  })

  it("compares ranges", () => {
    expect(isSameRange(["2026-10-01", "2026-10-02"], ["2026-10-01", "2026-10-02"])).toBe(true)
    expect(isSameRange(["2026-10-01", "2026-10-02"], ["2026-10-01", "2026-10-03"])).toBe(false)
    expect(isSameRange(null, ["2026-10-01", "2026-10-02"])).toBe(false)
  })
})
