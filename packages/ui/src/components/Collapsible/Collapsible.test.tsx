import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Collapsible, createCollapsibleController } from "./index.js"

function Example(props: Partial<React.ComponentProps<typeof Collapsible>>) {
  return (
    <Collapsible {...props}>
      <Collapsible.Trigger>Usage notes</Collapsible.Trigger>
      <Collapsible.Panel>Said to elders, never to children.</Collapsible.Panel>
    </Collapsible>
  )
}

describe("Collapsible", () => {
  it("names the trigger by its text and draws a hidden chevron", () => {
    render(<Example />)

    const trigger = screen.getByRole("button", { name: "Usage notes" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
  })

  it("opens and closes from the trigger and reports each change", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Example onOpenChange={onOpenChange} />)

    const trigger = screen.getByRole("button", { name: "Usage notes" })
    await user.click(trigger)

    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Said to elders, never to children.")).toBeVisible()
    expect(onOpenChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ reason: "trigger-press" }),
    )

    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await waitFor(() => expect(screen.queryByText("Said to elders, never to children.")).toBeNull())
  })

  it("toggles with Enter and Space and tabs into the open panel", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <Collapsible.Trigger>Add a note</Collapsible.Trigger>
        <Collapsible.Panel>
          <button type="button">Save note</button>
        </Collapsible.Panel>
      </Collapsible>,
    )

    await user.tab()
    const trigger = screen.getByRole("button", { name: "Add a note" })
    expect(trigger).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    await user.tab()
    expect(screen.getByRole("button", { name: "Save note" })).toHaveFocus()

    trigger.focus()
    await user.keyboard(" ")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("keeps a disabled trigger focusable but closed", async () => {
    const user = userEvent.setup()
    render(<Example disabled />)

    await user.tab()
    const trigger = screen.getByRole("button", { name: "Usage notes" })
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-disabled", "true")
    await user.keyboard("{Enter}")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("passes the state to function children and keeps the chevron", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <Collapsible.Trigger>{(state) => (state.open ? "Hide" : "Show")}</Collapsible.Trigger>
        <Collapsible.Panel>Content</Collapsible.Panel>
      </Collapsible>,
    )

    await user.click(screen.getByRole("button", { name: "Show" }))

    const trigger = screen.getByRole("button", { name: "Hide" })
    expect(trigger.querySelector("svg")).toBeInTheDocument()
  })

  it("opens and closes from a controller", async () => {
    const controller = createCollapsibleController()
    render(<Example controller={controller} />)

    controller.open()
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Usage notes" })).toHaveAttribute(
        "aria-expanded",
        "true",
      ),
    )
  })

  it("merges a className with Kova's class on every part", () => {
    render(
      <Collapsible className="root" defaultOpen>
        <Collapsible.Trigger className="trigger">A</Collapsible.Trigger>
        <Collapsible.Panel className="panel">Content</Collapsible.Panel>
      </Collapsible>,
    )

    for (const [slot, name] of [
      ["collapsible", "root"],
      ["collapsible-trigger", "trigger"],
      ["collapsible-panel", "panel"],
    ]) {
      const element = document.querySelector(`[data-slot="${slot}"]`)
      expect(element).toHaveClass(name)
      expect(element?.classList.length).toBeGreaterThan(1)
    }
  })
})
