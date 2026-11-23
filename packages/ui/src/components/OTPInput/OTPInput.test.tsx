import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../Field/index.js"
import { OTPInput } from "./OTPInput.js"

function Code(props: Omit<React.ComponentProps<typeof OTPInput>, "children">) {
  return (
    <OTPInput maxLength={4} {...props}>
      <OTPInput.Group>
        <OTPInput.Slot index={0} />
        <OTPInput.Slot index={1} />
      </OTPInput.Group>
      <OTPInput.Separator>-</OTPInput.Separator>
      <OTPInput.Group>
        <OTPInput.Slot index={2} />
        <OTPInput.Slot index={3} />
      </OTPInput.Group>
    </OTPInput>
  )
}

const slots = (container: HTMLElement) => [
  ...container.querySelectorAll<HTMLElement>('[data-slot="otp-input-slot"]'),
]

describe("OTPInput", () => {
  it("is named by Field.Label, fills the slots as you type, and commits the full code", async () => {
    const user = userEvent.setup()
    const onValueCommit = vi.fn()
    const { container } = render(
      <Field>
        <Field.Label>Verification code</Field.Label>
        <Code onValueCommit={onValueCommit} />
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Verification code" })
    await user.click(input)
    await user.keyboard("12a34")

    expect(slots(container).map((slot) => slot.textContent)).toEqual(["1", "2", "3", "4"])
    expect(onValueCommit).toHaveBeenCalledWith("1234", expect.anything())
  })

  it("writes size as a data attribute and defaults to lg", () => {
    const { container, rerender } = render(<Code aria-label="Code" />)
    const root = container.querySelector('[data-slot="otp-input"]')
    expect(root).toHaveAttribute("data-size", "lg")
    expect(root?.className).toMatch(/OTPInput/)

    rerender(<Code aria-label="Code" size="sm" />)
    expect(root).toHaveAttribute("data-size", "sm")
  })

  it("gives every part its class", () => {
    const { container } = render(<Code aria-label="Code" />)
    expect(container.querySelector('[data-slot="otp-input-group"]')?.className).toMatch(
      /OTPInputGroup/,
    )
    expect(slots(container)[0]?.className).toMatch(/OTPInputSlot/)
    expect(container.querySelector('[data-slot="otp-input-separator"]')?.className).toMatch(
      /OTPInputSeparator/,
    )
  })

  it("is marked invalid by an invalid Field and described by its error", () => {
    render(
      <Field invalid>
        <Field.Label>Verification code</Field.Label>
        <Code defaultValue="4829" />
        <Field.Error>That code has expired.</Field.Error>
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Verification code" })
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("That code has expired.")
  })
})
