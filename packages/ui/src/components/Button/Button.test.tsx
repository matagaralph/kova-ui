import { act, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { KovaProvider } from "../KovaProvider/index.js"
import { Button, ButtonLink, CopyButton } from "./index.js"

describe("Button", () => {
  it("writes Kova's visual props as data attributes", () => {
    render(
      <Button color="danger" variant="outline" size="sm" pill uniform block selected>
        Delete
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Delete" })
    expect(button).toHaveAttribute("type", "button")
    expect(button).toHaveAttribute("data-slot", "button")
    expect(button).toHaveAttribute("data-color", "danger")
    expect(button).toHaveAttribute("data-variant", "outline")
    expect(button).toHaveAttribute("data-size", "sm")
    for (const attribute of ["data-pill", "data-uniform", "data-block", "data-selected"]) {
      expect(button).toHaveAttribute(attribute, "")
    }
    expect(button.className).toMatch(/Button/)
  })

  it("defaults to a primary solid medium button", () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })
    expect(button).toHaveAttribute("data-color", "primary")
    expect(button).toHaveAttribute("data-variant", "solid")
    expect(button).toHaveAttribute("data-size", "md")
    expect(button).not.toHaveAttribute("aria-disabled")
    expect(button).not.toHaveAttribute("aria-busy")
  })

  it("runs onClick from a press and from the keyboard", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole("button", { name: "Save" }))
    await user.keyboard("{Enter}")
    await user.keyboard(" ")
    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it("ignores presses while disabled, with the disabled style", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled disabledTone="relaxed" onClick={onClick}>
        Save
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Save" })
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("data-disabled")
    expect(button).toHaveAttribute("data-disabled-tone", "relaxed")
    expect(button).not.toHaveAttribute("data-inert")
  })

  it("keeps focus and ignores presses while loading, without the disabled style", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(<Button onClick={onClick}>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })
    button.focus()
    rerender(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    )

    expect(button).toHaveFocus()
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("aria-disabled", "true")
    expect(button).toHaveAttribute("data-loading", "")
    expect(button).toHaveAttribute("data-inert", "")
    await user.keyboard("{Enter}")
    expect(onClick).not.toHaveBeenCalled()
  })

  it("stays pending while the Promise from onClick runs", async () => {
    const user = userEvent.setup()
    let finish = () => {}
    render(<Button onClick={() => new Promise<void>((resolve) => (finish = resolve))}>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })
    await user.click(button)
    expect(button).toHaveAttribute("data-pending")
    await act(async () => finish())
    expect(button).not.toHaveAttribute("data-pending")
  })

  it("keeps the Kova class with a state class name", () => {
    render(<Button className={(state) => (state.disabled ? "off" : "on")}>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })
    expect(button.className).toMatch(/Button/)
    expect(button).toHaveClass("on")
  })
})

describe("ButtonLink", () => {
  it("renders an anchor with the button's styles", () => {
    render(
      <ButtonLink href="/settings" color="secondary" variant="ghost">
        Settings
      </ButtonLink>,
    )

    const link = screen.getByRole("link", { name: "Settings" })
    expect(link).toHaveAttribute("href", "/settings")
    expect(link).toHaveAttribute("data-color", "secondary")
    expect(link).toHaveAttribute("data-variant", "ghost")
    expect(link).not.toHaveAttribute("target")
  })

  it("opens external links in a new tab", () => {
    render(<ButtonLink href="https://example.com">Docs</ButtonLink>)

    const link = screen.getByRole("link", { name: "Docs" })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("uses KovaProvider's link component for internal links", () => {
    function RouterLink(props: React.ComponentProps<"a">) {
      return <a data-router="" {...props} />
    }
    render(
      <KovaProvider linkComponent={RouterLink}>
        <ButtonLink href="/billing">Billing</ButtonLink>
      </KovaProvider>,
    )

    expect(screen.getByRole("link", { name: "Billing" })).toHaveAttribute("data-router", "")
  })

  it("can't be followed while disabled", () => {
    render(
      <ButtonLink href="/billing" disabled>
        Billing
      </ButtonLink>,
    )

    const link = screen.getByRole("link", { name: "Billing" })
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})

describe("CopyButton", () => {
  it("copies its value and shows the copied state", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CopyButton copyValue="npm i kova-ui" onClick={onClick}>
        {({ copied }) => (copied ? "Copied" : "Copy")}
      </CopyButton>,
    )

    await user.click(screen.getByRole("button", { name: "Copy" }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(await navigator.clipboard.readText()).toBe("npm i kova-ui")
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument()
  })

  it("is named Copy when icon-only, and keeps its name while showing the copied state", async () => {
    const user = userEvent.setup()
    render(
      <>
        <CopyButton copyValue="abc" uniform />
        <CopyButton copyValue="def" uniform aria-label="Copy code" />
      </>,
    )

    const button = screen.getByRole("button", { name: "Copy" })
    await user.click(button)
    expect(button).toHaveAccessibleName("Copy")
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument()
  })
})
