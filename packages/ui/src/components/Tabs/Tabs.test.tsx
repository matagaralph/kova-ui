import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Tabs } from "./Tabs.js"

function Example(props: Partial<React.ComponentProps<typeof Tabs>>) {
  return (
    <Tabs defaultValue="code" {...props}>
      <Tabs.List aria-label="Repository">
        <Tabs.Tab value="code">Code</Tabs.Tab>
        <Tabs.Tab value="issues" counter={12}>
          Issues
        </Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
        <Tabs.Indicator data-testid="indicator" />
      </Tabs.List>
      <Tabs.Panel value="code">Source files</Tabs.Panel>
      <Tabs.Panel value="issues">Open issues</Tabs.Panel>
      <Tabs.Panel value="settings">Repository settings</Tabs.Panel>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("names the tab list and pairs each tab with its panel", () => {
    render(<Example />)

    expect(screen.getByRole("tablist", { name: "Repository" })).toBeInTheDocument()
    const code = screen.getByRole("tab", { name: "Code" })
    expect(code).toHaveAttribute("aria-selected", "true")
    expect(code).toHaveAttribute("data-selected")
    expect(screen.getByRole("tabpanel", { name: "Code" })).toHaveTextContent("Source files")
  })

  it("selects tabs with the arrow keys and reports the change", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Example onValueChange={onValueChange} />)

    screen.getByRole("tab", { name: "Code" }).focus()
    await user.keyboard("{ArrowRight}")

    const issues = screen.getByRole("tab", { name: /Issues/ })
    expect(issues).toHaveFocus()
    expect(issues).toHaveAttribute("aria-selected", "true")
    expect(onValueChange).toHaveBeenCalledWith("issues", expect.anything())
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Open issues")
  })

  it("waits for Enter with manual activation", async () => {
    const user = userEvent.setup()
    render(<Example activation="manual" />)

    screen.getByRole("tab", { name: "Code" }).focus()
    await user.keyboard("{ArrowRight}")
    const issues = screen.getByRole("tab", { name: /Issues/ })
    expect(issues).toHaveAttribute("aria-selected", "false")

    await user.keyboard("{Enter}")
    expect(issues).toHaveAttribute("aria-selected", "true")
  })

  it("never selects a disabled tab", async () => {
    const user = userEvent.setup()
    render(<Example />)

    const settings = screen.getByRole("tab", { name: "Settings" })
    await user.click(settings)
    expect(settings).toHaveAttribute("aria-selected", "false")
    expect(settings).toHaveAttribute("data-disabled")
  })

  it("renders a counter that reads as part of the tab's name", () => {
    render(<Example />)

    expect(screen.getByRole("tab", { name: "Issues (12)" })).toBeInTheDocument()
  })

  it("shows loading dots in counters while loadingCounters is set", () => {
    render(<Example loadingCounters />)

    const issues = screen.getByRole("tab", { name: /Issues/ })
    expect(issues).not.toHaveTextContent("12")
  })

  it("puts icons before the label and keeps them out of the name", () => {
    render(
      <Tabs defaultValue="code">
        <Tabs.List aria-label="Repository">
          <Tabs.Tab value="code">
            Code
            <Tabs.TabIcon data-testid="icon">
              <svg />
            </Tabs.TabIcon>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="code">Source files</Tabs.Panel>
      </Tabs>,
    )

    const tab = screen.getByRole("tab", { name: "Code" })
    expect(tab.firstElementChild).toBe(screen.getByTestId("icon"))
    expect(tab).toHaveAttribute("data-has-icon")
    expect(screen.getByRole("tablist")).toHaveAttribute("data-has-icons")
  })

  it("reserves the label's width with its text", () => {
    render(<Example />)

    const label = screen.getByRole("tab", { name: "Code" }).querySelector("[data-content]")
    expect(label).toHaveAttribute("data-content", "Code")
  })

  it("renders the indicator and Kova classes, and keeps state class names", () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.List aria-label="Letters">
          <Tabs.Tab value="a" className={(state) => (state.selected ? "is-on" : "is-off")}>
            A
          </Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
        <Tabs.Panel value="a">Alpha</Tabs.Panel>
      </Tabs>,
    )

    const tab = screen.getByRole("tab", { name: "A" })
    expect(tab.className).toMatch(/TabsTab/)
    expect(tab).toHaveClass("is-on")
    expect(screen.getByTestId("indicator")).toHaveAttribute("data-slot", "tabs-indicator")
  })

  it("renders a tab as a link", () => {
    render(
      <Tabs defaultValue="overview">
        <Tabs.List aria-label="Project">
          <Tabs.Tab value="overview" render={<a href="#overview" />}>
            Overview
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">Summary</Tabs.Panel>
      </Tabs>,
    )

    const tab = screen.getByRole("tab", { name: "Overview" })
    expect(tab.tagName).toBe("A")
    expect(tab).toHaveAttribute("href", "#overview")
  })
})
