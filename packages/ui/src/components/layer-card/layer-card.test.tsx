import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { LayerCard } from "./layer-card.js"

describe("LayerCard", () => {
  it("renders a plain surface without sections", () => {
    render(<LayerCard data-testid="card">Get started</LayerCard>)

    const card = screen.getByTestId("card")
    expect(card).toHaveAttribute("data-slot", "layer-card")
    expect(card).not.toHaveAttribute("data-layered")
    expect(card.className).toMatch(/Surface/)
  })

  it("switches to the layered layout when it has sections, also inside a fragment", () => {
    render(
      <LayerCard data-testid="card">
        <>
          <LayerCard.Secondary data-testid="secondary">Next steps</LayerCard.Secondary>
          <LayerCard.Primary aria-label="Guide">Quick start guide</LayerCard.Primary>
        </>
      </LayerCard>,
    )

    const card = screen.getByTestId("card")
    expect(card).toHaveAttribute("data-layered")
    expect(card.className).toMatch(/Layered/)
    expect(screen.getByTestId("secondary")).toHaveAttribute("data-slot", "layer-card-secondary")
    expect(screen.getByLabelText("Guide")).toHaveAttribute("data-slot", "layer-card-primary")
  })

  it("renders its own element with render and keeps Kova's classes", () => {
    render(
      <LayerCard render={<a href="/docs/getting-started" />} className="p-4">
        <LayerCard.Secondary>Getting started</LayerCard.Secondary>
        <LayerCard.Primary>Quick start guide</LayerCard.Primary>
      </LayerCard>,
    )

    const link = screen.getByRole("link", { name: "Getting started Quick start guide" })
    expect(link).toHaveAttribute("href", "/docs/getting-started")
    expect(link).toHaveAttribute("data-slot", "layer-card")
    expect(link).toHaveClass("p-4")
    expect(link.className).toMatch(/Layered/)
  })

  it("renders a section as another element", () => {
    render(
      <LayerCard>
        <LayerCard.Secondary render={<h2 />}>Usage</LayerCard.Secondary>
        <LayerCard.Primary>Requests this month</LayerCard.Primary>
      </LayerCard>,
    )

    expect(screen.getByRole("heading", { name: "Usage" })).toHaveAttribute(
      "data-slot",
      "layer-card-secondary",
    )
  })
})
