import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it } from "vite-plus/test"
import { createTimelineController, type TimelineStatus } from "./index.js"
import { Timeline } from "./Timeline.js"

const steps: { value: string; title: string; status: TimelineStatus }[] = [
  { value: "placed", title: "Order placed", status: "complete" },
  { value: "shipped", title: "Shipped", status: "current" },
  { value: "delivered", title: "Delivered", status: "upcoming" },
]

function Example(props: Partial<React.ComponentProps<typeof Timeline>>) {
  return (
    <Timeline aria-label="Order status" {...props}>
      {steps.map((step) => (
        <Timeline.Item key={step.value} value={step.value} status={step.status}>
          <Timeline.Marker data-testid={`marker-${step.value}`} />
          <Timeline.Connector data-testid={`connector-${step.value}`} />
          <Timeline.Title>{step.title}</Timeline.Title>
          <Timeline.Time dateTime="2026-11-03">Nov 3</Timeline.Time>
          <Timeline.Description>Details for {step.title}</Timeline.Description>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

describe("Timeline", () => {
  it("is a named list of events, each named by its title and described by its time and description", async () => {
    render(<Example />)

    expect(screen.getByRole("list", { name: "Order status" })).toBeInTheDocument()
    const shipped = screen.getByRole("listitem", { name: "Shipped" })
    await waitFor(() => expect(shipped).toHaveAccessibleDescription("Nov 3 Details for Shipped"))
  })

  it("marks the current step and shows each status on the item and its parts", () => {
    render(<Example />)

    expect(screen.getByRole("listitem", { name: "Shipped" })).toHaveAttribute(
      "aria-current",
      "step",
    )
    expect(screen.getByRole("listitem", { name: "Order placed" })).toHaveAttribute("data-complete")
    expect(screen.getByTestId("marker-placed")).toHaveAttribute("data-complete")
    expect(screen.getByTestId("marker-shipped")).toHaveAttribute("data-current")
    expect(screen.getByTestId("connector-delivered")).toHaveAttribute("data-upcoming")
  })

  it("hides markers and connectors from assistive technology", () => {
    render(<Example />)

    expect(screen.getByTestId("marker-placed")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByTestId("connector-placed")).toHaveAttribute("aria-hidden", "true")
  })

  it("enters on the current event and moves between events with the arrow keys", async () => {
    const user = userEvent.setup()
    render(<Example />)

    await user.tab()
    expect(screen.getByRole("listitem", { name: "Shipped" })).toHaveFocus()

    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("listitem", { name: "Delivered" })).toHaveFocus()

    await user.keyboard("{Home}")
    expect(screen.getByRole("listitem", { name: "Order placed" })).toHaveFocus()
  })

  it("moves with Left and Right when horizontal", async () => {
    const user = userEvent.setup()
    render(<Example orientation="horizontal" />)

    expect(screen.getByRole("list")).toHaveAttribute("data-orientation", "horizontal")
    await user.tab()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("listitem", { name: "Delivered" })).toHaveFocus()
  })

  it("focuses an event from a controller", () => {
    const controller = createTimelineController()
    render(<Example controller={controller} />)

    controller.focus("delivered")
    expect(screen.getByRole("listitem", { name: "Delivered" })).toHaveFocus()
  })

  it("merges className with Kova's classes", () => {
    render(<Example className="custom" />)

    expect(screen.getByRole("list").className).toMatch(/Timeline.*custom/)
  })
})
