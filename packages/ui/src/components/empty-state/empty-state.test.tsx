import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { EmptyState } from "./empty-state.js"

describe("EmptyState", () => {
  it("renders its parts with data-slot and Kova props as data attributes", () => {
    render(
      <EmptyState role="status" fill="none">
        <EmptyState.Icon color="danger" size="sm" data-testid="icon" />
        <EmptyState.Title color="danger">Couldn't load projects</EmptyState.Title>
        <EmptyState.Description>Check your connection and try again.</EmptyState.Description>
        <EmptyState.ActionRow data-testid="actions" />
      </EmptyState>,
    )

    const root = screen.getByRole("status")
    expect(root).toHaveAttribute("data-slot", "empty-state")
    expect(root).toHaveAttribute("data-fill", "none")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "danger")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-size", "sm")
    expect(screen.getByText("Couldn't load projects")).toHaveAttribute(
      "data-slot",
      "empty-state-title",
    )
    expect(screen.getByTestId("actions")).toHaveAttribute("data-slot", "empty-state-action-row")
  })
})
