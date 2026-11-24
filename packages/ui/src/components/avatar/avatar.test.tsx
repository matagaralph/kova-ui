import { Headphones } from "@kova-ui/icons"
import { fireEvent, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { AvatarGroup } from "./avatar-group.js"
import { Avatar } from "./avatar.js"

describe("Avatar", () => {
  it("shows the first and last initials and keeps the full name for screen readers", () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback name=" ada  King Lovelace " />
      </Avatar>,
    )

    expect(screen.getByText("AL")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByText("ada King Lovelace", { exact: false }).className).toMatch(
      /VisuallyHidden/,
    )
  })

  it("shows one initial for a single name", () => {
    render(
      <Avatar>
        <Avatar.Fallback name="Noah" />
      </Avatar>,
    )

    expect(screen.getByText("N")).toHaveAttribute("aria-hidden", "true")
  })

  it("writes the size as a variable", () => {
    render(
      <Avatar data-testid="avatar" size={48} style={{ margin: 4 }}>
        <Avatar.Fallback>
          <Headphones data-testid="icon" />
        </Avatar.Fallback>
      </Avatar>,
    )

    const avatar = screen.getByTestId("avatar")
    expect(avatar.style.getPropertyValue("--avatar-size")).toBe("48px")
    expect(avatar.style.margin).toBe("4px")
    expect(avatar.className).toMatch(/Avatar/)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders a badge on the avatar", () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback name="Noah" />
        <Avatar.Badge aria-label="Reviewer">
          <Headphones aria-hidden="true" />
        </Avatar.Badge>
      </Avatar>,
    )

    const badge = screen.getByLabelText("Reviewer")
    expect(badge.className).toMatch(/AvatarBadge/)
    expect(screen.getByTestId("avatar")).toContainElement(badge)
  })

  it("replaces the fallback once the image loads, and reports the status", () => {
    const onLoadingStatusChange = vi.fn()
    render(
      <Avatar data-testid="avatar" onLoadingStatusChange={onLoadingStatusChange}>
        <Avatar.Image src="https://example.com/ada.png" alt="Ada Lovelace" />
        <Avatar.Fallback name="Ada Lovelace" />
      </Avatar>,
    )

    fireEvent.load(screen.getByRole("img", { hidden: true }))
    expect(screen.getByTestId("avatar")).toHaveAttribute("data-loading-status", "loaded")
    expect(screen.getByRole("img", { name: "Ada Lovelace" }).className).toMatch(/AvatarImage/)
    expect(onLoadingStatusChange).toHaveBeenLastCalledWith("loaded", expect.anything())
  })

  it("keeps the fallback when the image fails", () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Image src="https://example.com/missing.png" alt="" />
        <Avatar.Fallback name="Grace" />
      </Avatar>,
    )

    fireEvent.error(screen.getByRole("presentation", { hidden: true }))
    expect(screen.getByTestId("avatar")).toHaveAttribute("data-loading-status", "error")
    expect(screen.getByText("G")).toBeVisible()
  })

  it("acts as a button through render, and keeps a state class name", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Avatar
        render={<button type="button" aria-label="Open Noah's profile" />}
        onClick={onClick}
        className={(state) => `status-${state.loadingStatus}`}
      >
        <Avatar.Fallback aria-hidden="true">N</Avatar.Fallback>
      </Avatar>,
    )

    const button = screen.getByRole("button", { name: "Open Noah's profile" })
    expect(button).toHaveClass("status-idle")
    button.focus()
    await user.keyboard("{Enter}")
    expect(onClick).toHaveBeenCalledOnce()
  })
})

describe("AvatarGroup", () => {
  it("puts the first avatar on top by default and sizes every avatar", () => {
    render(
      <AvatarGroup data-testid="group" size={32}>
        <span>Ada</span>
        <span>Grace</span>
        <AvatarGroup.Overflow count={1234} />
      </AvatarGroup>,
    )

    const group = screen.getByTestId("group")
    expect(group).toHaveAttribute("data-stack", "start")
    expect(group.style.getPropertyValue("--avatar-size")).toBe("32px")
    expect([...group.children].map((child) => child.textContent)).toEqual(["+1k", "Grace", "Ada"])
  })

  it("writes overlap as the group spacing", () => {
    render(
      <AvatarGroup data-testid="group" overlap={6}>
        <span>Ada</span>
      </AvatarGroup>,
    )

    expect(screen.getByTestId("group").style.getPropertyValue("--avatar-group-spacing")).toBe(
      "-6px",
    )
  })

  it("keeps the order with stack end", () => {
    render(
      <AvatarGroup data-testid="group" stack="end">
        <span>Ada</span>
        <span>Grace</span>
      </AvatarGroup>,
    )

    expect([...screen.getByTestId("group").children].map((child) => child.textContent)).toEqual([
      "Ada",
      "Grace",
    ])
  })

  it("writes the overflow compactly with its letter count", () => {
    render(<AvatarGroup.Overflow data-testid="overflow" count={12} />)

    const overflow = screen.getByTestId("overflow")
    expect(overflow).toHaveTextContent("+12")
    expect(overflow).toHaveAttribute("data-letter-count", "2")
  })
})
