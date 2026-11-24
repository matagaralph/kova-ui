import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { CircularProgress } from "./circular-progress.js"
import { LoadingDots } from "./loading-dots.js"
import { LoadingIndicator } from "./loading-indicator.js"

describe("CircularProgress", () => {
  it("is a named progressbar with its value", () => {
    render(<CircularProgress aria-label="Uploading report.pdf" value={25} />)

    const bar = screen.getByRole("progressbar", { name: "Uploading report.pdf" })
    expect(bar).toHaveAttribute("aria-valuenow", "25")
    expect(bar).toHaveAttribute("data-slot", "progress")
    expect(bar).toHaveAttribute("data-progressing")
    expect(bar.className).toMatch(/CircularProgress/)
  })

  it("fills the ring by where the value sits between min and max", () => {
    const { container } = render(
      <CircularProgress aria-label="Step 3 of 5" value={3} min={1} max={5} />,
    )

    const indicator = container.querySelectorAll("svg")[1]
    expect(indicator).toHaveStyle({ strokeDashoffset: "25" })
  })

  it("is indeterminate while progress is simulated, and complete once done", () => {
    const { rerender } = render(<CircularProgress aria-label="Uploading" />)

    const bar = screen.getByRole("progressbar", { name: "Uploading" })
    expect(bar).not.toHaveAttribute("aria-valuenow")
    expect(bar).toHaveAttribute("data-indeterminate")

    rerender(<CircularProgress aria-label="Uploading" done />)
    expect(bar).toHaveAttribute("aria-valuenow", "100")
    expect(bar).toHaveAttribute("data-complete")
  })

  it("writes size, stroke and colors as CSS variables", () => {
    render(
      <CircularProgress
        aria-label="Uploading"
        value={10}
        size={40}
        strokeWidth={8}
        trackActiveColor="red"
        style={{ margin: 4 }}
      />,
    )

    const bar = screen.getByRole("progressbar", { name: "Uploading" })
    expect(bar.style.getPropertyValue("--circular-progress-size")).toBe("40px")
    expect(bar.style.getPropertyValue("--circular-progress-stroke")).toBe("4px")
    expect(bar.style.getPropertyValue("--circular-progress-track-active-color")).toBe("red")
    expect(bar.style.margin).toBe("4px")
  })
})

describe("LoadingIndicator and LoadingDots", () => {
  it("pass their props through and carry a data-slot", () => {
    render(
      <>
        <LoadingIndicator role="status" aria-label="Loading" size={24} />
        <LoadingDots data-testid="dots" />
      </>,
    )

    const spinner = screen.getByRole("status", { name: "Loading" })
    expect(spinner).toHaveAttribute("data-slot", "loading-indicator")
    expect(spinner.style.getPropertyValue("--indicator-size")).toBe("24px")
    expect(screen.getByTestId("dots")).toHaveAttribute("data-slot", "loading-dots")
  })
})
