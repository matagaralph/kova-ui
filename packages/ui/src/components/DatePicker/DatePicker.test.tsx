import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Calendar } from "../Calendar/index.js"
import { DatePicker } from "./DatePicker.js"

describe("DatePicker", () => {
  it("shows the date in the trigger and picks a new one from the calendar", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker defaultValue="2026-10-16" onValueChange={onValueChange}>
        <DatePicker.Trigger />
        <DatePicker.Content />
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose date/ })
    expect(trigger).toHaveTextContent("10/16/26")
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog")

    await user.click(trigger)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toMatch(/DatePickerContent/)
    expect(screen.getByRole("gridcell", { name: /October 16/ })).toHaveFocus()

    await user.click(screen.getByRole("gridcell", { name: "Tuesday, October 20, 2026" }))
    expect(onValueChange).toHaveBeenCalledWith("2026-10-20", expect.anything())
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(trigger).toHaveTextContent("10/20/26")
    expect(trigger).toHaveFocus()
  })

  it("opens with Enter, closes with Escape, and shows a placeholder while empty", async () => {
    const user = userEvent.setup()
    render(
      <DatePicker defaultMonth="2026-10">
        <DatePicker.Trigger />
        <DatePicker.Content />
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose date/ })
    expect(trigger).toHaveTextContent("Select date...")
    expect(trigger.querySelector("[data-placeholder]")).not.toBeNull()

    trigger.focus()
    await user.keyboard("{Enter}")
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(trigger).toHaveFocus()
  })

  it("writes Kova props as data attributes", () => {
    render(
      <DatePicker>
        <DatePicker.Trigger variant="soft" size="lg" pill block dropdownIconType="none" />
        <DatePicker.Input aria-label="Due date" variant="ghost" size="sm" />
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose date/ })
    expect(trigger).toHaveAttribute("data-variant", "soft")
    expect(trigger).toHaveAttribute("data-size", "lg")
    expect(trigger).toHaveAttribute("data-pill")
    expect(trigger).toHaveAttribute("data-block")
    expect(trigger.querySelectorAll("svg")).toHaveLength(1)

    const input = screen.getByRole("textbox", { name: "Due date" })
    expect(input).toHaveAttribute("data-variant", "ghost")
    expect(input).toHaveAttribute("data-size", "sm")
  })

  it("commits a typed date, with an icon-only trigger beside the input", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker locale="en-US" onValueChange={onValueChange}>
        <DatePicker.Input aria-label="Due date" />
        <DatePicker.Trigger uniform variant="ghost" />
        <DatePicker.Content />
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose date/ })
    expect(trigger).toHaveAttribute("data-uniform")
    expect(trigger).toHaveTextContent("")

    await user.type(screen.getByRole("textbox", { name: "Due date" }), "10/18/2026{Enter}")
    expect(onValueChange).toHaveBeenCalledWith("2026-10-18", expect.anything())
  })

  it("clears the value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker defaultValue="2026-10-16" onValueChange={onValueChange}>
        <DatePicker.Input aria-label="Due date" />
        <DatePicker.Clear />
        <DatePicker.Trigger uniform />
      </DatePicker>,
    )

    const clear = screen.getByRole("button", { name: "Clear date" })
    await user.click(clear)
    expect(onValueChange).toHaveBeenCalledWith(null, expect.anything())
    expect(clear).toHaveAttribute("data-empty")
  })

  it("picks a range across two months and writes both ends", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DatePicker mode="range" months={2} defaultMonth="2026-10" onValueChange={onValueChange}>
        <DatePicker.Trigger />
        <DatePicker.Content />
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose/ })
    expect(trigger).toHaveTextContent("Select date range...")

    await user.click(trigger)
    expect(screen.getByRole("grid", { name: "October 2026" })).toBeInTheDocument()
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument()

    await user.click(screen.getByRole("gridcell", { name: /October 30/ }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await user.click(screen.getByRole("gridcell", { name: /November 2,/ }))

    expect(onValueChange).toHaveBeenCalledWith(["2026-10-30", "2026-11-02"], expect.anything())
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(trigger).toHaveTextContent("10/30/26–11/02/26")
  })

  it("selects a preset, marks it, and names it in the trigger", async () => {
    const user = userEvent.setup()
    const presets = [
      { label: "Last 7 days", value: ["2026-10-10", "2026-10-16"] as [string, string] },
      { label: "This month", value: ["2026-10-01", "2026-10-31"] as [string, string] },
    ]
    render(
      <DatePicker mode="range" today="2026-10-16">
        <DatePicker.Trigger>
          <DatePicker.ValueText>
            {(value) =>
              presets.find(
                (preset) =>
                  Array.isArray(value) &&
                  preset.value[0] === value[0] &&
                  preset.value[1] === value[1],
              )?.label
            }
          </DatePicker.ValueText>
        </DatePicker.Trigger>
        <DatePicker.Content>
          <DatePicker.Presets>
            {presets.map((preset) => (
              <DatePicker.Preset key={preset.label} value={preset.value}>
                {preset.label}
              </DatePicker.Preset>
            ))}
          </DatePicker.Presets>
          <Calendar.Header />
          <Calendar.Months />
        </DatePicker.Content>
      </DatePicker>,
    )

    const trigger = screen.getByRole("button", { name: /Choose/ })
    await user.click(trigger)
    await user.click(screen.getByRole("button", { name: "Last 7 days" }))
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(trigger).toHaveTextContent("Last 7 days")

    await user.click(trigger)
    const preset = screen.getByRole("button", { name: "Last 7 days" })
    expect(preset).toHaveAttribute("data-selected")
    expect(preset).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "This month" })).not.toHaveAttribute("data-selected")
  })

  it("writes the date in the page's language", () => {
    render(
      <div lang="de">
        <DatePicker defaultValue="2026-10-16">
          <DatePicker.Trigger />
        </DatePicker>
      </div>,
    )

    expect(screen.getByRole("button", { name: /16/ })).toHaveTextContent("16.10.26")
  })

  it("submits the ISO date with its form", () => {
    render(
      <form data-testid="form">
        <DatePicker name="due" defaultValue="2026-10-16">
          <DatePicker.Trigger />
        </DatePicker>
      </form>,
    )

    const data = new FormData(screen.getByTestId("form") as HTMLFormElement)
    expect(data.get("due")).toBe("2026-10-16")
  })
})
