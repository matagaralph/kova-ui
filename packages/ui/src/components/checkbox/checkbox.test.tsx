import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field, Label } from "../field/index.js"
import { Checkbox } from "./index.js"

describe("Checkbox", () => {
  it("is named by a wrapping label and toggles with Space", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Label>
        <Checkbox onCheckedChange={onCheckedChange}>
          <Checkbox.Indicator />
        </Checkbox>
        Accept terms
      </Label>,
    )

    const control = screen.getByRole("checkbox", { name: "Accept terms" })
    expect(control).toHaveAttribute("aria-checked", "false")

    control.focus()
    await user.keyboard(" ")
    expect(control).toHaveAttribute("aria-checked", "true")
    expect(control).toHaveAttribute("data-checked")
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("toggles when its label is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Label>
        <Checkbox>
          <Checkbox.Indicator />
        </Checkbox>
        Remember me
      </Label>,
    )

    await user.click(screen.getByText("Remember me"))
    expect(screen.getByRole("checkbox", { name: "Remember me" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("takes its name and description from a Field", () => {
    render(
      <Field>
        <Checkbox defaultChecked>
          <Checkbox.Indicator />
        </Checkbox>
        <Field.Label>Weekly digest</Field.Label>
        <Field.Description>A summary every Monday.</Field.Description>
      </Field>,
    )

    const control = screen.getByRole("checkbox", { name: "Weekly digest" })
    expect(control).toHaveAccessibleDescription("A summary every Monday.")
  })

  it("shows the indicator while indeterminate and becomes checked on press", async () => {
    const user = userEvent.setup()
    render(
      <Checkbox aria-label="Select all" defaultChecked="indeterminate">
        <Checkbox.Indicator data-testid="indicator" />
      </Checkbox>,
    )

    const control = screen.getByRole("checkbox", { name: "Select all" })
    expect(control).toHaveAttribute("aria-checked", "mixed")
    expect(screen.getByTestId("indicator")).toHaveAttribute("data-indeterminate")

    await user.click(control)
    expect(control).toHaveAttribute("aria-checked", "true")
    expect(screen.getByTestId("indicator")).toHaveAttribute("data-checked")
  })

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup()
    render(
      <Checkbox aria-label="Sync" disabled>
        <Checkbox.Indicator />
      </Checkbox>,
    )

    const control = screen.getByRole("checkbox", { name: "Sync" })
    await user.click(control)
    expect(control).toHaveAttribute("aria-checked", "false")
    expect(control).toHaveAttribute("data-disabled")
  })

  it("keeps the Kova classes and adds a state class name", () => {
    render(
      <Checkbox
        aria-label="Sync"
        defaultChecked
        className={(state) => (state.checked ? "on" : "off")}
      >
        <Checkbox.Indicator data-testid="indicator" />
      </Checkbox>,
    )

    const control = screen.getByRole("checkbox", { name: "Sync" })
    expect(control.className).toMatch(/Checkbox/)
    expect(control).toHaveClass("on")
    expect(screen.getByTestId("indicator").className).toMatch(/CheckboxIndicator/)
  })
})

describe("Checkbox.Group", () => {
  it("keeps one list of checked values", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Checkbox.Group aria-label="Toppings" defaultValue={["cheese"]} onValueChange={onValueChange}>
        {["cheese", "olives"].map((value) => (
          <Label key={value}>
            <Checkbox value={value}>
              <Checkbox.Indicator />
            </Checkbox>
            {value}
          </Label>
        ))}
      </Checkbox.Group>,
    )

    expect(screen.getByRole("group", { name: "Toppings" }).className).toMatch(/CheckboxGroup/)
    await user.click(screen.getByRole("checkbox", { name: "olives" }))
    expect(onValueChange).toHaveBeenCalledWith(["cheese", "olives"], expect.anything())
  })
})
