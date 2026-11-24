import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vite-plus/test"
import { createScrollAreaController, ScrollArea } from "./index.js"

function Words(props: Omit<React.ComponentProps<typeof ScrollArea>, "children">) {
  return (
    <ScrollArea data-testid="root" {...props}>
      <ScrollArea.Viewport role="region" aria-label="Words">
        <ScrollArea.Content>
          <ul>
            {["mvura", "sadza", "imba"].map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar data-testid="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  )
}

describe("ScrollArea", () => {
  it("names the viewport as a region and gives every part its class", () => {
    const { container } = render(<Words />)

    expect(screen.getByRole("region", { name: "Words" }).className).toMatch(/ScrollAreaViewport/)
    expect(screen.getByTestId("root").className).toMatch(/ScrollArea/)
    expect(container.querySelector('[data-slot="scroll-area-content"]')?.className).toMatch(
      /ScrollAreaContent/,
    )
    expect(screen.getByTestId("vertical").className).toMatch(/ScrollAreaScrollbar/)
    expect(screen.getByTestId("vertical")).toHaveAttribute("data-orientation", "vertical")
    expect(container.querySelector('[data-slot="scroll-area-thumb"]')?.className).toMatch(
      /ScrollAreaThumb/,
    )
  })

  it("writes fade as a data attribute only when set", () => {
    const { rerender } = render(<Words />)
    expect(screen.getByTestId("root")).not.toHaveAttribute("data-fade")

    rerender(<Words fade />)
    expect(screen.getByTestId("root")).toHaveAttribute("data-fade", "")
  })

  it("takes a controller and a scroll-to-end button", () => {
    const controller = createScrollAreaController()
    render(
      <ScrollArea controller={controller} stickToEnd>
        <ScrollArea.Viewport role="log" aria-label="Comments">
          <ScrollArea.Content>Mhoro!</ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.ScrollToEnd>Jump to latest</ScrollArea.ScrollToEnd>
      </ScrollArea>,
    )

    expect(screen.getByRole("log", { name: "Comments" })).toBeInTheDocument()
    expect(screen.getByText("Jump to latest").className).toMatch(/ScrollAreaScrollToEnd/)
    expect(controller.isAtStart()).toBe(true)
  })
})
