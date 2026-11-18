import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../Field/index.js"
import { Textarea } from "./index.js"

describe("Textarea", () => {
  it("writes Kova's visual props as data attributes, outline medium by default", () => {
    const { rerender } = render(<Textarea aria-label="Notes" />)

    const textarea = screen.getByRole("textbox", { name: "Notes" })
    expect(textarea).toHaveAttribute("data-slot", "textarea")
    expect(textarea).toHaveAttribute("data-variant", "outline")
    expect(textarea).toHaveAttribute("data-size", "md")
    expect(textarea.className).toMatch(/Textarea/)

    rerender(<Textarea aria-label="Notes" variant="soft" size="sm" gutterSize="xs" />)
    expect(textarea).toHaveAttribute("data-variant", "soft")
    expect(textarea).toHaveAttribute("data-size", "sm")
    expect(textarea).toHaveAttribute("data-gutter-size", "xs")
  })

  it("sets its row limits as CSS variables, keeping the caller's style", () => {
    render(<Textarea aria-label="Notes" rows={2} maxRows={6} autoResize style={{ width: 200 }} />)

    const textarea = screen.getByRole("textbox", { name: "Notes" })
    expect(textarea).toHaveAttribute("rows", "2")
    expect(textarea.style.getPropertyValue("--textarea-min-rows")).toBe("2")
    expect(textarea.style.getPropertyValue("--textarea-max-rows")).toBe("6")
    expect(textarea.style.width).toBe("200px")
  })

  it("keeps a fixed height of three rows without autoResize", () => {
    render(<Textarea aria-label="Notes" maxRows={6} />)

    const textarea = screen.getByRole("textbox", { name: "Notes" })
    expect(textarea.style.getPropertyValue("--textarea-min-rows")).toBe("3")
    expect(textarea.style.getPropertyValue("--textarea-max-rows")).toBe("3")
  })

  it("reports typed values and takes its label from a Field", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Field>
        <Field.Label>Feedback</Field.Label>
        <Textarea onValueChange={onValueChange} />
        <Field.Description>Only the team sees this.</Field.Description>
      </Field>,
    )

    const textarea = screen.getByRole("textbox", { name: "Feedback" })
    expect(textarea).toHaveAccessibleDescription("Only the team sees this.")
    await user.type(textarea, "Hi")
    expect(onValueChange).toHaveBeenLastCalledWith("Hi", expect.anything())
  })

  it("hides autofill extensions unless named", () => {
    render(
      <>
        <Textarea aria-label="Anonymous" />
        <Textarea aria-label="Named" name="bio" />
      </>,
    )

    expect(screen.getByRole("textbox", { name: "Anonymous" })).toHaveAttribute(
      "data-1p-ignore",
      "true",
    )
    expect(screen.getByRole("textbox", { name: "Named" })).not.toHaveAttribute("data-1p-ignore")
  })
})
