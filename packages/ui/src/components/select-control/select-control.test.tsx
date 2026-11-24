import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { SelectControl } from "./select-control.js"

describe("SelectControl", () => {
  it("is a button that writes Kova props as data attributes", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <SelectControl ref={ref} variant="soft" size="lg" pill block placeholder invalid>
        Pick a range
      </SelectControl>,
    )

    const control = screen.getByRole("button", { name: "Pick a range" })
    expect(ref.current).toBe(control)
    expect(control).toHaveAttribute("type", "button")
    expect(control).toHaveAttribute("data-variant", "soft")
    expect(control).toHaveAttribute("data-size", "lg")
    expect(control).toHaveAttribute("data-pill")
    expect(control).toHaveAttribute("data-block")
    expect(control).toHaveAttribute("data-placeholder")
    expect(control).toHaveAttribute("data-invalid")
  })

  it("ignores presses while loading, but stays focusable", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <SelectControl loading onClick={onClick}>
        Projects
      </SelectControl>,
    )

    const control = screen.getByRole("button", { name: "Projects" })
    expect(control).toHaveAttribute("aria-busy", "true")
    await user.click(control)
    expect(onClick).not.toHaveBeenCalled()
    await user.tab()
    expect(control).toHaveFocus()
  })

  it("renders a named clear button beside it", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <>
        <SelectControl>Owner</SelectControl>
        <SelectControl.Clear aria-label="Clear owner" onClick={onClick} />
      </>,
    )

    await user.click(screen.getByRole("button", { name: "Clear owner" }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
