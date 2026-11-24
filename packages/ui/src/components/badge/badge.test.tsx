import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { Badge } from "./badge.js"

describe("Badge", () => {
  it("writes its visual props as data attributes", () => {
    render(
      <Badge color="success" variant="solid" size="lg" pill aria-label="Status: active">
        Active
      </Badge>,
    )

    const badge = screen.getByLabelText("Status: active")
    expect(badge).toHaveAttribute("data-slot", "badge")
    expect(badge).toHaveAttribute("data-color", "success")
    expect(badge).toHaveAttribute("data-variant", "solid")
    expect(badge).toHaveAttribute("data-size", "lg")
    expect(badge).toHaveAttribute("data-pill", "")
  })
})
