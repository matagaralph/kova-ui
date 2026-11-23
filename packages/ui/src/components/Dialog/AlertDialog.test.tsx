import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../Button/index.js"
import { AlertDialog } from "./index.js"

const renderAlertDialog = (onOpenChange = vi.fn()) =>
  render(
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialog.Trigger>Discard draft</AlertDialog.Trigger>
      <AlertDialog.Backdrop data-testid="backdrop" />
      <AlertDialog.Content width="medium">
        <AlertDialog.Header>
          <AlertDialog.Title>Discard draft?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <AlertDialog.Description>Your changes will be lost.</AlertDialog.Description>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <AlertDialog.Close render={<Button variant="outline" />}>Cancel</AlertDialog.Close>
          <AlertDialog.Close value="confirm" render={<Button variant="destructive" />}>
            Discard
          </AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>,
  )

describe("AlertDialog", () => {
  it("opens as a named, described alert dialog with focus on the first answer", async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole("button", { name: "Discard draft" }))

    const dialog = screen.getByRole("alertdialog", { name: "Discard draft?" })
    expect(dialog).toHaveAccessibleDescription("Your changes will be lost.")
    expect(dialog).toHaveAttribute("data-width", "medium")
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus())
  })

  it("has no close button in its header", async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole("button", { name: "Discard draft" }))
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull()
  })

  it("reports the confirming answer", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderAlertDialog(onOpenChange)

    await user.click(screen.getByRole("button", { name: "Discard draft" }))
    await user.click(screen.getByRole("button", { name: "Discard" }))

    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ returnValue: "confirm" }),
    )
  })

  for (const key of ["{Enter}", " "]) {
    it(`reports each answer's value when it's pressed with ${key === " " ? "Space" : "Enter"}`, async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderAlertDialog(onOpenChange)

      await user.click(screen.getByRole("button", { name: "Discard draft" }))
      // Focus lands on the first answer once the dialog opens; wait for it before moving on
      await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus())
      await user.tab()
      expect(screen.getByRole("button", { name: "Discard" })).toHaveFocus()
      await user.keyboard(key)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.objectContaining({ returnValue: "confirm" }),
      )

      await user.click(screen.getByRole("button", { name: "Discard draft" }))
      await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus())
      await user.keyboard(key)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        false,
        expect.not.objectContaining({ returnValue: "confirm" }),
      )
    })
  }

  it("stays open on a backdrop press", async () => {
    const user = userEvent.setup()
    renderAlertDialog()

    await user.click(screen.getByRole("button", { name: "Discard draft" }))
    await user.click(screen.getByTestId("backdrop"))

    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
  })
})
