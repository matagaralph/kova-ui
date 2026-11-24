import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { TableErrorDialog } from "./table-error-dialog.js"

describe("TableErrorDialog", () => {
  it('is an alert dialog named "Error" by default', () => {
    render(<TableErrorDialog />)
    expect(screen.getByRole("alertdialog", { name: "Error" })).toBeInTheDocument()
  })

  it("is named by its title", () => {
    render(<TableErrorDialog title="Couldn't load repositories" />)
    expect(
      screen.getByRole("alertdialog", { name: "Couldn't load repositories" }),
    ).toBeInTheDocument()
  })

  it("focuses Retry and calls onRetry", async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<TableErrorDialog onRetry={onRetry} />)

    await waitFor(() => expect(screen.getByRole("button", { name: "Retry" })).toHaveFocus())
    await user.keyboard("{Enter}")
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("calls onDismiss from Dismiss and from Escape", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<TableErrorDialog onDismiss={onDismiss} />)

    await user.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalledTimes(1)

    await user.keyboard("{Escape}")
    expect(onDismiss).toHaveBeenCalledTimes(2)
  })

  it("describes the dialog with its children", () => {
    render(<TableErrorDialog>The server took too long to respond.</TableErrorDialog>)

    expect(screen.getByRole("alertdialog", { name: "Error" })).toHaveAccessibleDescription(
      "The server took too long to respond.",
    )
  })

  it("renders nothing while closed", () => {
    render(<TableErrorDialog open={false} />)
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })
})
