import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Calendar } from "./Calendar.js"

describe("Calendar", () => {
  it("renders Kova's header and grid by default, and selects a pressed day", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Calendar defaultValue="2026-10-16" today="2026-10-16" onValueChange={onValueChange} />)

    expect(screen.getByRole("heading", { name: "October 2026" })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Previous month" }).querySelector("svg"),
    ).not.toBeNull()
    const grid = screen.getByRole("grid", { name: "October 2026" })
    expect(grid.className).toMatch(/CalendarGrid/)

    const today = screen.getByRole("gridcell", { name: "Friday, October 16, 2026" })
    expect(today).toHaveAttribute("data-today")
    expect(today).toHaveAttribute("data-selected")
    expect(today.className).toMatch(/CalendarDay/)

    await user.click(screen.getByRole("gridcell", { name: "Tuesday, October 20, 2026" }))
    expect(onValueChange).toHaveBeenCalledWith("2026-10-20", expect.anything())
  })

  it("hides the days of other months unless showOutsideDays is set", () => {
    const { unmount } = render(<Calendar defaultMonth="2026-10" />)
    expect(screen.queryByRole("gridcell", { name: /September 30/ })).toBeNull()
    unmount()

    render(<Calendar defaultMonth="2026-10" showOutsideDays />)
    expect(screen.getByRole("gridcell", { name: /September 30/ })).toHaveAttribute("data-outside")
  })

  it("moves between months with Next and the arrow keys", async () => {
    const user = userEvent.setup()
    render(<Calendar defaultValue="2026-10-31" />)

    await user.click(screen.getByRole("button", { name: "Next month" }))
    expect(screen.getByRole("heading", { name: "November 2026" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Previous month" }))
    screen.getByRole("gridcell", { name: "Saturday, October 31, 2026" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("gridcell", { name: "Sunday, November 1, 2026" })).toHaveFocus()
  })

  it("marks the range band from start to end", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Calendar mode="range" defaultMonth="2026-10" onValueChange={onValueChange} />)

    await user.click(screen.getByRole("gridcell", { name: /October 12/ }))
    await user.click(screen.getByRole("gridcell", { name: /October 14/ }))

    expect(onValueChange).toHaveBeenCalledWith(["2026-10-12", "2026-10-14"], expect.anything())
    expect(screen.getByRole("gridcell", { name: /October 12/ })).toHaveAttribute("data-range-start")
    expect(screen.getByRole("gridcell", { name: /October 13/ })).toHaveAttribute(
      "data-range-middle",
    )
    expect(screen.getByRole("gridcell", { name: /October 14/ })).toHaveAttribute("data-range-end")
  })

  it("renders a grid per month shown", () => {
    render(<Calendar months={2} defaultMonth="2026-10" />)
    expect(screen.getByRole("grid", { name: "October 2026" })).toBeInTheDocument()
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument()
  })

  it("keeps Kova classes on written-out parts and adds state class names", () => {
    render(
      <Calendar defaultValue="2026-10-16" className={(state) => `mode-${state.mode}`}>
        <Calendar.Header />
        <Calendar.Grid>
          <Calendar.Weekdays>{(index) => <Calendar.Weekday index={index} />}</Calendar.Weekdays>
          <Calendar.Weeks>
            {(cell) => (
              <Calendar.Day
                value={cell.date}
                className={(state) => (state.selected ? "picked" : undefined)}
              />
            )}
          </Calendar.Weeks>
        </Calendar.Grid>
      </Calendar>,
    )

    const day = screen.getByRole("gridcell", { name: /October 16/ })
    expect(day.className).toMatch(/CalendarDay/)
    expect(day).toHaveClass("picked")
    expect(screen.getByRole("columnheader", { name: "Sunday" }).className).toMatch(
      /CalendarWeekday/,
    )
    expect(day.closest('[data-slot="calendar"]')).toHaveClass("mode-single")
  })
})
