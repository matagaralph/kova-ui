import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../field/index.js"
import { SegmentedControl } from "./segmented-control.js"

describe("SegmentedControl", () => {
  it("is a radio group named by a Field.Label that arrow keys move through", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Field>
        <Field.Label>View</Field.Label>
        <SegmentedControl defaultValue="list" onValueChange={onValueChange}>
          <SegmentedControl.Indicator />
          <SegmentedControl.Item value="list">List</SegmentedControl.Item>
          <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
        </SegmentedControl>
      </Field>,
    )

    expect(screen.getByRole("radiogroup", { name: "View" })).toBeInTheDocument()
    const list = screen.getByRole("radio", { name: "List" })
    expect(list).toHaveAttribute("aria-checked", "true")

    list.focus()
    await user.keyboard("{ArrowRight}")
    const grid = screen.getByRole("radio", { name: "Grid" })
    expect(grid).toHaveAttribute("aria-checked", "true")
    expect(grid).toHaveAttribute("data-checked")
    expect(onValueChange).toHaveBeenCalledWith("grid", expect.anything())
  })

  it("names items by their label only, not the hidden sizer copy", () => {
    render(
      <SegmentedControl aria-label="Range" defaultValue="day">
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      </SegmentedControl>,
    )

    expect(screen.getByRole("radio", { name: "Day" })).toBeInTheDocument()
  })

  it("writes Kova props as data attributes and keeps state class names", () => {
    render(
      <SegmentedControl
        aria-label="Range"
        defaultValue="day"
        size="lg"
        gutterSize="sm"
        pill
        block
        className={(state) => (state.value ? `value-${state.value}` : "")}
      >
        <SegmentedControl.Indicator data-testid="indicator" />
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      </SegmentedControl>,
    )

    const control = screen.getByRole("radiogroup", { name: "Range" })
    expect(control).toHaveAttribute("data-size", "lg")
    expect(control).toHaveAttribute("data-gutter-size", "sm")
    expect(control).toHaveAttribute("data-pill")
    expect(control).toHaveAttribute("data-block")
    expect(control).toHaveClass("value-day")
    expect(screen.getByTestId("indicator")).toHaveAttribute(
      "data-slot",
      "segmented-control-indicator",
    )
  })

  it("skips disabled items", async () => {
    const user = userEvent.setup()
    render(
      <SegmentedControl aria-label="Billing" defaultValue="monthly">
        <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
        <SegmentedControl.Item value="lifetime" disabled>
          Lifetime
        </SegmentedControl.Item>
        <SegmentedControl.Item value="yearly">Yearly</SegmentedControl.Item>
      </SegmentedControl>,
    )

    screen.getByRole("radio", { name: "Monthly" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("radio", { name: "Yearly" })).toHaveAttribute("aria-checked", "true")
  })
})
