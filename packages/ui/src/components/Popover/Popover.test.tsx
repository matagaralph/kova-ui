import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../Button/index.js"
import { Dialog } from "../Dialog/index.js"
import { Popover } from "./index.js"

const BasicPopover = (props: { onOpenChange?: () => void }) => (
  <Popover onOpenChange={props.onOpenChange}>
    <Popover.Trigger render={<Button variant="secondary" />}>Open popover</Popover.Trigger>
    <Popover.Content>
      <Popover.Title>Notifications</Popover.Title>
      <Popover.Description>You're all caught up.</Popover.Description>
      <Popover.Close>Done</Popover.Close>
    </Popover.Content>
  </Popover>
)

describe("Popover", () => {
  it("opens from a Button trigger, named and described by its parts", async () => {
    const user = userEvent.setup()
    render(<BasicPopover />)

    const trigger = screen.getByRole("button", { name: "Open popover" })
    await user.click(trigger)

    const popover = screen.getByRole("dialog", { name: "Notifications" })
    expect(popover).toHaveAccessibleDescription("You're all caught up.")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup()
    render(<BasicPopover />)

    const trigger = screen.getByRole("button", { name: "Open popover" })
    await user.click(trigger)
    await user.keyboard("{Escape}")

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(trigger).toHaveFocus()
  })

  it("closes from a Close part", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<BasicPopover onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    await user.click(screen.getByRole("button", { name: "Done" }))

    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ reason: "close-press" }),
    )
  })

  it("closes only the popover when Escape is pressed inside a dialog", async () => {
    const user = userEvent.setup()
    render(
      <Dialog defaultOpen>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Settings</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BasicPopover />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>,
    )

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    expect(screen.getByRole("dialog", { name: "Notifications" })).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Notifications" })).toBeNull())
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument()
  })

  it("writes its size props as CSS variables and `translucent` as a data attribute", () => {
    render(
      <Popover defaultOpen>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Content width={320} minWidth="auto" maxWidth={480} translucent>
          <Popover.Title>Sized</Popover.Title>
        </Popover.Content>
      </Popover>,
    )

    const popover = screen.getByRole("dialog", { name: "Sized" })
    expect(popover.style.getPropertyValue("--popover-width")).toBe("320px")
    expect(popover.style.getPropertyValue("--popover-min-width")).toBe("auto")
    expect(popover.style.getPropertyValue("--popover-max-width")).toBe("480px")
    expect(popover).toHaveAttribute("data-translucent")
    expect(popover.className).toMatch(/PopoverContent/)
  })
})
