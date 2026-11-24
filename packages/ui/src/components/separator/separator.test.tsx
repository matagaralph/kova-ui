import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it } from "vite-plus/test"
import { Separator } from "./separator.js"

describe("Separator", () => {
  it("is a horizontal separator by default", () => {
    render(<Separator />)

    const separator = screen.getByRole("separator")
    expect(separator).toHaveAttribute("data-orientation", "horizontal")
    expect(separator.className).toMatch(/\S/)
  })

  it("announces a vertical orientation", () => {
    render(<Separator orientation="vertical" />)

    const separator = screen.getByRole("separator")
    expect(separator).toHaveAttribute("aria-orientation", "vertical")
    expect(separator).toHaveAttribute("data-orientation", "vertical")
  })

  it("is hidden from assistive technology when decorative", () => {
    render(<Separator decorative />)

    expect(screen.queryByRole("separator")).not.toBeInTheDocument()
  })

  it("never takes focus", async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Separator />
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    await user.tab()
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus()
  })

  it("merges a className with Kova's class", () => {
    render(<Separator className="my-4" />)

    expect(screen.getByRole("separator")).toHaveClass("my-4")
    expect(screen.getByRole("separator").classList.length).toBeGreaterThan(1)
  })
})
