import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../button/index.js"
import { Dialog, type DialogContentProps } from "./index.js"

const renderDialog = (
  contentProps: Partial<DialogContentProps> = {},
  rootProps: Partial<Parameters<typeof Dialog>[0]> = {},
) =>
  render(
    <Dialog {...rootProps}>
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Dialog.Backdrop data-testid="backdrop" />
      <Dialog.Content {...contentProps}>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Changes are visible to your team.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <input aria-label="Name" />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
          <Dialog.Close value="save" render={<Button />}>
            Save
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>,
  )

describe("Dialog", () => {
  it("opens from its trigger, named and described by its title and description", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole("button", { name: "Edit profile" }))

    const dialog = screen.getByRole("dialog", { name: "Edit profile" })
    expect(dialog).toHaveAccessibleDescription("Changes are visible to your team.")
    expect(dialog).toHaveAttribute("aria-modal", "true")
  })

  it("closes from the header close button and returns focus to the trigger", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderDialog({}, { onOpenChange })

    const trigger = screen.getByRole("button", { name: "Edit profile" })
    await user.click(trigger)
    await user.click(screen.getByRole("button", { name: "Close" }))

    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ reason: "close-press" }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(trigger).toHaveFocus()
  })

  it("closes with Escape", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByRole("button", { name: "Edit profile" }))
    await user.keyboard("{Escape}")

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  })

  it("reports a footer Close part's value", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderDialog({}, { onOpenChange })

    await user.click(screen.getByRole("button", { name: "Edit profile" }))
    await user.click(screen.getByRole("button", { name: "Save" }))

    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ returnValue: "save" }),
    )
  })

  it("omits the header close button with `closeButton={false}`", () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Content>
          <Dialog.Header closeButton={false}>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog>,
    )

    expect(screen.getByRole("dialog", { name: "Notice" })).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull()
  })

  it("writes its size and position props as data attributes", () => {
    renderDialog(
      { width: "small", height: "large", position: { narrow: "bottom", regular: "right" } },
      { defaultOpen: true },
    )

    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("data-width", "small")
    expect(dialog).toHaveAttribute("data-height", "large")
    expect(dialog).toHaveAttribute("data-position", "right")
    expect(dialog).toHaveAttribute("data-position-narrow", "bottom")
  })

  it("defaults to a centered extra large dialog", () => {
    renderDialog({ align: "top" }, { defaultOpen: true })

    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("data-width", "xlarge")
    expect(dialog).toHaveAttribute("data-position", "center")
    expect(dialog).toHaveAttribute("data-align", "top")
    expect(dialog).not.toHaveAttribute("data-position-narrow")
  })

  it("sets a custom width inline, merged with a style function", () => {
    renderDialog({ width: 400, style: () => ({ color: "red" }) }, { defaultOpen: true })

    const dialog = screen.getByRole("dialog")
    expect(dialog).not.toHaveAttribute("data-width")
    expect(dialog.style.width).toBe("400px")
    expect(dialog.style.color).toBe("red")
  })

  it("keeps the Kova class with a state className", () => {
    renderDialog(
      { className: (state) => (state.open ? "is-open" : undefined) },
      { defaultOpen: true },
    )

    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toMatch(/DialogContent/)
    expect(dialog).toHaveClass("is-open")
  })

  it("styles the backdrop variant", () => {
    render(
      <Dialog defaultOpen>
        <Dialog.Backdrop variant="fade" data-testid="backdrop" />
        <Dialog.Content>
          <Dialog.Title>Faded</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    )

    expect(screen.getByTestId("backdrop")).toHaveAttribute("data-variant", "fade")
    expect(screen.getByTestId("backdrop")).toHaveAttribute("data-slot", "dialog-backdrop")
  })

  it("focuses the `initialFocus` control when it opens", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <Dialog.Trigger>Rename</Dialog.Trigger>
        <Dialog.Content initialFocus="[name='new-name']">
          <Dialog.Header>
            <Dialog.Title>Rename</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <input aria-label="New name" name="new-name" />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>,
    )

    await user.click(screen.getByRole("button", { name: "Rename" }))
    await waitFor(() => expect(screen.getByRole("textbox", { name: "New name" })).toHaveFocus())
  })
})
