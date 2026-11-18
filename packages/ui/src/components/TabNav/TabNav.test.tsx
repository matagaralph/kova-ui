import { Code } from "@kova-ui/icons"
import { act, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ComponentProps } from "react"
import { afterEach, describe, expect, it, vi } from "vite-plus/test"
import { KovaProvider } from "../KovaProvider/KovaProvider.js"
import { TabNav } from "./TabNav.js"

const links = [
  { label: "Code", href: "/code" },
  { label: "Issues", href: "/issues", counter: 12 },
  { label: "Pull requests", href: "/pulls" },
  { label: "Settings", href: "/settings" },
]

function Example({
  current = "Code",
  ...props
}: Partial<ComponentProps<typeof TabNav>> & { current?: string }) {
  return (
    <TabNav aria-label="Repository" {...props}>
      {links.map((link) => (
        <TabNav.Link
          key={link.href}
          href={link.href}
          current={link.label === current}
          counter={link.counter}
        >
          {link.label}
        </TabNav.Link>
      ))}
    </TabNav>
  )
}

type ObserverCallback = (entries: { intersectionRatio: number }[]) => void

// Reports every item whose text is in `clipped` as wrapped onto the hidden row
function mockIntersectionObserver(clipped: string[]) {
  const observers: { callback: ObserverCallback; element: Element }[] = []
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      callback: ObserverCallback
      constructor(callback: ObserverCallback) {
        this.callback = callback
      }
      observe(element: Element) {
        observers.push({ callback: this.callback, element })
      }
      disconnect() {}
    },
  )
  return () =>
    act(() => {
      for (const { callback, element } of observers) {
        const isClipped = clipped.some((text) => element.textContent?.startsWith(text))
        callback([{ intersectionRatio: isClipped ? 0 : 1 }])
      }
    })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("TabNav", () => {
  it("is a named navigation landmark of links", () => {
    render(<Example />)

    expect(screen.getByRole("navigation", { name: "Repository" })).toBeInTheDocument()
    expect(screen.getAllByRole("link")).toHaveLength(4)
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
  })

  it("marks the current link", () => {
    render(<Example current="Issues" />)

    const issues = screen.getByRole("link", { name: "Issues (12)" })
    expect(issues).toHaveAttribute("aria-current", "page")
    expect(issues).toHaveAttribute("data-current")
    expect(screen.getByRole("link", { name: "Code" })).not.toHaveAttribute("aria-current")
  })

  it("writes Kova props as data attributes and keeps state class names", () => {
    render(
      <TabNav aria-label="Repository" variant="flush" hideIconsBreakpoint={null}>
        <TabNav.Link
          href="/code"
          current
          className={(state) => (state.current ? "is-current" : undefined)}
        >
          Code
        </TabNav.Link>
      </TabNav>,
    )

    const nav = screen.getByRole("navigation", { name: "Repository" })
    expect(nav).toHaveAttribute("data-variant", "flush")
    expect(nav).not.toHaveAttribute("data-hide-icons-breakpoint")
    const link = screen.getByRole("link", { name: "Code" })
    expect(link.className).toMatch(/TabNavLink/)
    expect(link).toHaveClass("is-current")
  })

  it("keeps icons out of the link's name and reserves the label's width", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Link href="/code">
          <TabNav.LinkIcon>
            <Code />
          </TabNav.LinkIcon>
          Code
        </TabNav.Link>
      </TabNav>,
    )

    const link = screen.getByRole("link", { name: "Code" })
    expect(link).toHaveAttribute("data-has-icon")
    expect(link.querySelector("[data-content]")).toHaveAttribute("data-content", "Code")
  })

  it("shows loading dots instead of counts while loadingCounters is set", () => {
    render(<Example loadingCounters />)

    expect(screen.getByRole("link", { name: /Issues/ })).not.toHaveTextContent("12")
  })

  it("renders relative links with the KovaProvider link component", () => {
    const RouterLink = ({ href, ...props }: ComponentProps<"a">) => (
      <a data-router="" href={href} {...props} />
    )
    render(
      <KovaProvider linkComponent={RouterLink}>
        <TabNav aria-label="Repository">
          <TabNav.Link href="/code">Code</TabNav.Link>
          <TabNav.Link href="https://example.com/docs">Docs</TabNav.Link>
        </TabNav>
      </KovaProvider>,
    )

    expect(screen.getByRole("link", { name: "Code" })).toHaveAttribute("data-router")
    const docs = screen.getByRole("link", { name: "Docs" })
    expect(docs).not.toHaveAttribute("data-router")
    expect(docs).toHaveAttribute("target", "_blank")
    expect(docs).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders a custom link element with render", () => {
    render(
      <TabNav aria-label="Repository">
        <TabNav.Link href="/code" render={<a data-custom="" />}>
          Code
        </TabNav.Link>
      </TabNav>,
    )

    const link = screen.getByRole("link", { name: "Code" })
    expect(link).toHaveAttribute("data-custom")
    expect(link).toHaveAttribute("href", "/code")
  })

  it("moves links that don't fit into a More panel", async () => {
    const user = userEvent.setup()
    const clip = mockIntersectionObserver(["Pull requests", "Settings"])
    render(<Example current="Settings" />)

    expect(screen.queryByRole("button", { name: /More/ })).not.toBeInTheDocument()
    clip()

    const more = screen.getByRole("button", { name: "More links, including the current page" })
    expect(more).toHaveAttribute("data-current")
    expect(screen.getByText("Settings").closest("li")).toHaveAttribute("aria-hidden", "true")

    await user.click(more)
    expect(more).toHaveAttribute("aria-expanded", "true")
    const overflowSettings = screen
      .getAllByRole("link", { name: "Settings" })
      .find((link) => !link.closest("[aria-hidden]"))
    expect(overflowSettings).toHaveAttribute("aria-current", "page")
    expect(overflowSettings).toHaveAttribute("href", "/settings")
  })
})
