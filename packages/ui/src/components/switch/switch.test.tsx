import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field, Label } from "../field/index.js"
import { Switch } from "./switch.js"

describe("Switch", () => {
  it("is named by a wrapping label and toggles with Space", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Label>
        <Switch onCheckedChange={onCheckedChange}>
          <Switch.Thumb />
        </Switch>
        Airplane mode
      </Label>,
    )

    const control = screen.getByRole("switch", { name: "Airplane mode" })
    expect(control).toHaveAttribute("aria-checked", "false")
    expect(control).toHaveAttribute("data-unchecked")

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
        <Switch>
          <Switch.Thumb />
        </Switch>
        Notifications
      </Label>,
    )

    await user.click(screen.getByText("Notifications"))
    expect(screen.getByRole("switch", { name: "Notifications" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("takes its name and description from a Field", () => {
    render(
      <Field>
        <Switch defaultChecked>
          <Switch.Thumb />
        </Switch>
        <Field.Label>Weekly digest</Field.Label>
        <Field.Description>A summary every Monday.</Field.Description>
      </Field>,
    )

    const control = screen.getByRole("switch", { name: "Weekly digest" })
    expect(control).toHaveAccessibleDescription("A summary every Monday.")
    expect(control).toHaveAttribute("aria-checked", "true")
  })

  it("does not toggle while disabled", async () => {
    const user = userEvent.setup()
    render(
      <Switch aria-label="Sync" disabled>
        <Switch.Thumb />
      </Switch>,
    )

    const control = screen.getByRole("switch", { name: "Sync" })
    await user.click(control)
    expect(control).toHaveAttribute("aria-checked", "false")
    expect(control).toHaveAttribute("data-disabled")
  })

  it("keeps the Kova class and adds a state class name", () => {
    render(
      <Switch
        aria-label="Sync"
        defaultChecked
        className={(state) => (state.checked ? "on" : "off")}
      >
        <Switch.Thumb data-testid="thumb" />
      </Switch>,
    )

    const control = screen.getByRole("switch", { name: "Sync" })
    expect(control.className).toMatch(/Switch/)
    expect(control).toHaveClass("on")
    expect(screen.getByTestId("thumb")).toHaveAttribute("data-slot", "switch-thumb")
  })
})
