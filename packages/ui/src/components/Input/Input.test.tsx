import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../Field/index.js"
import { Input } from "./index.js"

describe("Input", () => {
  it("writes Kova's visual props as data attributes", () => {
    render(<Input aria-label="Name" variant="soft" size="lg" gutterSize="sm" pill />)

    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input).toHaveAttribute("data-slot", "input")
    expect(input).toHaveAttribute("data-variant", "soft")
    expect(input).toHaveAttribute("data-size", "lg")
    expect(input).toHaveAttribute("data-gutter-size", "sm")
    expect(input).toHaveAttribute("data-pill", "")
    expect(input.className).toMatch(/Input/)
  })

  it("defaults to an outline medium input", () => {
    render(<Input aria-label="Name" />)

    const input = screen.getByRole("textbox", { name: "Name" })
    expect(input).toHaveAttribute("data-variant", "outline")
    expect(input).toHaveAttribute("data-size", "md")
  })

  it("reports typed values with onValueChange", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Input aria-label="Name" onValueChange={onValueChange} />)

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Ada")
    expect(onValueChange).toHaveBeenLastCalledWith("Ada", expect.anything())
  })

  it("takes its label and invalid state from a Field", () => {
    render(
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input />
        <Field.Error match>Enter a valid email.</Field.Error>
      </Field>,
    )

    const input = screen.getByRole("textbox", { name: "Email" })
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("Enter a valid email.")
  })

  it("passes autoComplete to the native input and allows autofill extensions", () => {
    render(<Input autoComplete="email" placeholder="Email address" />)

    const input = screen.getByPlaceholderText("Email address")
    expect(input).toHaveAttribute("autocomplete", "email")
    expect(input).not.toHaveAttribute("data-lpignore")
    expect(input).not.toHaveAttribute("data-1p-ignore")
  })

  it("hides autofill extensions without autofill semantics, or when asked", () => {
    render(
      <>
        <Input placeholder="Search" />
        <Input allowAutofillExtensions={false} autoComplete="email" placeholder="Email" />
      </>,
    )

    for (const placeholder of ["Search", "Email"]) {
      const input = screen.getByPlaceholderText(placeholder)
      expect(input).toHaveAttribute("data-lpignore", "true")
      expect(input).toHaveAttribute("data-1p-ignore", "true")
    }
  })

  it("selects its text on mount with autoSelect", () => {
    render(<Input aria-label="Name" defaultValue="Ada" autoSelect />)

    const input = screen.getByRole<HTMLInputElement>("textbox", { name: "Name" })
    expect(input.selectionStart).toBe(0)
    expect(input.selectionEnd).toBe(3)
  })
})

describe("Input.Group", () => {
  it("takes the visual props, leaving the input inside unstyled", () => {
    render(
      <Input.Group data-testid="group" size="sm" variant="soft" pill>
        <span>https://</span>
        <Input aria-label="Website" size="xl" />
      </Input.Group>,
    )

    const group = screen.getByTestId("group")
    expect(group).toHaveAttribute("data-slot", "input-group")
    expect(group).toHaveAttribute("data-size", "sm")
    expect(group).toHaveAttribute("data-variant", "soft")
    expect(group).toHaveAttribute("data-pill", "")
    const input = screen.getByRole("textbox", { name: "Website" })
    expect(input).not.toHaveAttribute("data-size")
    expect(input).not.toHaveAttribute("data-variant")
  })

  it("focuses the input when its text is pressed", async () => {
    const user = userEvent.setup()
    render(
      <Input.Group>
        <span>https://</span>
        <Input aria-label="Website" />
      </Input.Group>,
    )

    await user.click(screen.getByText("https://"))
    expect(screen.getByRole("textbox", { name: "Website" })).toHaveFocus()
  })

  it("clears the input with Input.Clear and returns focus", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Input.Group>
        <Input aria-label="Search" defaultValue="kova" onValueChange={onValueChange} />
        <Input.Clear aria-label="Clear search" />
      </Input.Group>,
    )

    const clear = await screen.findByRole("button", { name: "Clear search" })
    expect(clear.querySelector("svg")).not.toBeNull()
    await user.click(clear)

    const input = screen.getByRole("textbox", { name: "Search" })
    expect(input).toHaveValue("")
    expect(input).toHaveFocus()
    expect(onValueChange).toHaveBeenLastCalledWith(
      "",
      expect.objectContaining({ reason: "clear-press" }),
    )
  })
})
