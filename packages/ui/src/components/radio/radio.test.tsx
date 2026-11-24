import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field, Label } from "../field/index.js"
import { Radio } from "./index.js"

const speeds = ["Standard", "Express", "Overnight"]

function Speeds(props: React.ComponentProps<typeof Radio.Group>) {
  return (
    <Radio.Group {...props}>
      {speeds.map((speed) => (
        <Label key={speed}>
          <Radio value={speed.toLowerCase()} disabled={speed === "Overnight"}>
            <Radio.Indicator />
          </Radio>
          {speed}
        </Label>
      ))}
    </Radio.Group>
  )
}

describe("Radio", () => {
  it("takes the group's name from a Field and each radio's from its label", () => {
    render(
      <Field>
        <Field.Label>Shipping speed</Field.Label>
        <Speeds defaultValue="standard" />
      </Field>,
    )

    expect(screen.getByRole("radiogroup", { name: "Shipping speed" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Standard" })).toHaveAttribute("aria-checked", "true")
  })

  it("moves the selection with arrow keys and skips disabled radios", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Speeds aria-label="Speed" defaultValue="standard" onValueChange={onValueChange} />)

    screen.getByRole("radio", { name: "Standard" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("radio", { name: "Express" })).toHaveFocus()
    expect(onValueChange).toHaveBeenLastCalledWith("express", expect.anything())

    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("radio", { name: "Standard" })).toHaveFocus()
    expect(screen.getByRole("radio", { name: "Overnight" })).toHaveAttribute("data-disabled")
  })

  it("checks a radio when its label is clicked", async () => {
    const user = userEvent.setup()
    render(<Speeds aria-label="Speed" />)

    await user.click(screen.getByText("Express"))
    expect(screen.getByRole("radio", { name: "Express" })).toHaveAttribute("data-checked")
  })

  it("writes direction as a data attribute, a row by default", () => {
    const { rerender } = render(<Speeds aria-label="Speed" />)
    const group = screen.getByRole("radiogroup", { name: "Speed" })
    expect(group).toHaveAttribute("data-direction", "row")
    expect(group.className).toMatch(/RadioGroup/)

    rerender(<Speeds aria-label="Speed" direction="col" />)
    expect(group).toHaveAttribute("data-direction", "col")
  })

  it("keeps the Kova classes and adds state class names", () => {
    render(
      <Radio.Group aria-label="Plan" defaultValue="pro">
        <Radio value="pro" aria-label="Pro" className={(state) => (state.checked ? "on" : "off")}>
          <Radio.Indicator data-testid="indicator" />
        </Radio>
      </Radio.Group>,
    )

    const radio = screen.getByRole("radio", { name: "Pro" })
    expect(radio.className).toMatch(/Radio/)
    expect(radio).toHaveClass("on")
    expect(screen.getByTestId("indicator").className).toMatch(/RadioIndicator/)
  })
})
