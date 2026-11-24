import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Accordion } from "./accordion.js"

const items = [
  { value: "shipping", label: "Shipping", content: "Orders arrive in five days." },
  { value: "returns", label: "Returns", content: "Return within 30 days." },
  { value: "support", label: "Support", content: "We answer within a day." },
]

function Example(props: Partial<React.ComponentProps<typeof Accordion>>) {
  return (
    <Accordion {...props}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Header>
            <Accordion.Trigger>{item.label}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

describe("Accordion", () => {
  it("puts each trigger, named by its label, in a heading, and labels its panel by it", () => {
    render(<Example defaultValue={["shipping"]} />)

    const trigger = screen.getByRole("button", { name: "Shipping" })
    expect(trigger.closest("h3")).toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("region", { name: "Shipping" })).toHaveTextContent(
      "Orders arrive in five days.",
    )
  })

  it("draws a hidden chevron in every trigger", () => {
    render(<Example />)

    const icon = screen.getByRole("button", { name: "Returns" }).querySelector("svg")
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("opens one item at a time and reports the open values", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Example defaultValue={["shipping"]} onValueChange={onValueChange} />)

    await user.click(screen.getByRole("button", { name: "Returns" }))

    expect(onValueChange).toHaveBeenCalledWith(["returns"], expect.anything())
    expect(screen.getByRole("button", { name: "Returns" })).toHaveAttribute("aria-expanded", "true")
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
        "aria-expanded",
        "false",
      ),
    )
  })

  it("keeps several items open with multiple", async () => {
    const user = userEvent.setup()
    render(<Example multiple defaultValue={["shipping"]} />)

    await user.click(screen.getByRole("button", { name: "Support" }))

    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    expect(screen.getByRole("button", { name: "Support" })).toHaveAttribute("aria-expanded", "true")
  })

  it("toggles with the keyboard and tabs between triggers", async () => {
    const user = userEvent.setup()
    render(<Example />)

    await user.tab()
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )

    await user.tab()
    expect(screen.getByRole("button", { name: "Returns" })).toHaveFocus()
    await user.keyboard(" ")
    expect(screen.getByRole("button", { name: "Returns" })).toHaveAttribute("aria-expanded", "true")
  })

  it("merges a className with Kova's class on every part", () => {
    render(
      <Accordion className="root" defaultValue={["a"]}>
        <Accordion.Item value="a" className="item">
          <Accordion.Header className="header">
            <Accordion.Trigger className="trigger">A</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="panel">Content</Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    )

    for (const slot of [
      "accordion",
      "accordion-item",
      "accordion-header",
      "accordion-trigger",
      "accordion-panel",
    ]) {
      const element = document.querySelector(`[data-slot="${slot}"]`)
      expect(element?.classList.length).toBeGreaterThan(1)
    }
  })
})
