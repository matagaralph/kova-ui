import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { Alert } from "./Alert.js"

describe("Alert", () => {
  it("writes color and variant as data attributes and renders its parts", () => {
    render(
      <Alert
        data-testid="alert"
        color="warning"
        variant="soft"
        title="Password expires in 3 days"
        description="Update it now to keep access."
        actions={<button type="button">Update password</button>}
        actionsPlacement="bottom"
      />,
    )

    const alert = screen.getByTestId("alert")
    expect(alert).toHaveAttribute("data-slot", "alert")
    expect(alert).toHaveAttribute("data-color", "warning")
    expect(alert).toHaveAttribute("data-variant", "soft")
    expect(alert).toHaveAttribute("data-actions-placement", "bottom")
    expect(alert).not.toHaveAttribute("role")
    expect(screen.getByText("Password expires in 3 days")).toHaveAttribute(
      "data-slot",
      "alert-title",
    )
    expect(screen.getByRole("button", { name: "Update password" })).toBeInTheDocument()
  })

  it("is announced as an alert when color is danger", () => {
    render(<Alert color="danger" title="Payment failed" />)

    expect(screen.getByRole("alert")).toHaveTextContent("Payment failed")
  })

  it("hides the indicator with indicator={false}", () => {
    const { container } = render(<Alert title="Saved" indicator={false} />)

    expect(container.querySelector('[data-slot="alert-indicator"]')).toBeNull()
  })
})
