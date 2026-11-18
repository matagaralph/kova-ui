import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ComponentProps } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { KovaProvider } from "../KovaProvider/index.js"
import { TextLink } from "./TextLink.js"

describe("TextLink", () => {
  it("renders an underlined anchor by default", () => {
    render(<TextLink href="/settings">Settings</TextLink>)

    const link = screen.getByRole("link", { name: "Settings" })
    expect(link).toHaveAttribute("href", "/settings")
    expect(link).toHaveAttribute("data-slot", "text-link")
    expect(link).toHaveAttribute("data-underline")
    expect(link).not.toHaveAttribute("data-primary")
    expect(link).not.toHaveAttribute("target")
  })

  it("drops the underline for primary links unless asked", () => {
    render(
      <>
        <TextLink href="/a" primary>
          Primary
        </TextLink>
        <TextLink href="/b" primary underline>
          Underlined
        </TextLink>
      </>,
    )

    expect(screen.getByRole("link", { name: "Primary" })).not.toHaveAttribute("data-underline")
    expect(screen.getByRole("link", { name: "Underlined" })).toHaveAttribute("data-underline")
  })

  it("opens external links in a new tab", () => {
    render(<TextLink href="https://example.com">Example</TextLink>)

    const link = screen.getByRole("link", { name: "Example" })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders internal links with the KovaProvider link component", () => {
    function RouterLink(props: ComponentProps<"a">) {
      return <a data-router="" {...props} />
    }

    render(
      <KovaProvider linkComponent={RouterLink}>
        <TextLink href="/help">Help</TextLink>
        <TextLink href="https://example.com">External</TextLink>
      </KovaProvider>,
    )

    expect(screen.getByRole("link", { name: "Help" })).toHaveAttribute("data-router")
    expect(screen.getByRole("link", { name: "External" })).not.toHaveAttribute("data-router")
  })

  it("renders a focusable button without a destination", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TextLink onClick={onClick}>Show details</TextLink>)

    const button = screen.getByRole("button", { name: "Show details" })
    expect(button.tagName).toBe("BUTTON")
    expect(button).toHaveAttribute("type", "button")

    await user.tab()
    expect(button).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("renders the element passed to render, with the link's props", () => {
    function RouterLink({ href, ...props }: ComponentProps<"a">) {
      return <a data-to={href} href={href} {...props} />
    }

    render(
      <TextLink href="/billing" render={<RouterLink />}>
        Billing
      </TextLink>,
    )

    const link = screen.getByRole("link", { name: "Billing" })
    expect(link).toHaveAttribute("data-to", "/billing")
    expect(link).toHaveAttribute("data-slot", "text-link")
  })

  it("opens a relative link in a new tab when external is set", () => {
    render(
      <TextLink href="/report.pdf" external>
        Report
      </TextLink>,
    )

    expect(screen.getByRole("link", { name: "Report" })).toHaveAttribute("target", "_blank")
  })
})
