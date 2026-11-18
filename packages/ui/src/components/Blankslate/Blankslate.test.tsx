import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { Blankslate } from "./Blankslate.js"

describe("Blankslate", () => {
  it("renders its parts with data-slot and Kova props as data attributes", () => {
    render(
      <Blankslate role="status" fill="none">
        <Blankslate.Icon color="danger" size="sm" data-testid="icon" />
        <Blankslate.Title color="danger">Couldn't load projects</Blankslate.Title>
        <Blankslate.Description>Check your connection and try again.</Blankslate.Description>
        <Blankslate.ActionRow data-testid="actions" />
      </Blankslate>,
    )

    const root = screen.getByRole("status")
    expect(root).toHaveAttribute("data-slot", "blankslate")
    expect(root).toHaveAttribute("data-fill", "none")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "danger")
    expect(screen.getByTestId("icon")).toHaveAttribute("data-size", "sm")
    expect(screen.getByText("Couldn't load projects")).toHaveAttribute(
      "data-slot",
      "blankslate-title",
    )
    expect(screen.getByTestId("actions")).toHaveAttribute("data-slot", "blankslate-action-row")
  })
})
