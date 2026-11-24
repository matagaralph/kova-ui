import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { AlertDialog } from "../dialog/index.js"
import { DeleteResource, type DeleteResourceProps } from "./index.js"

const renderDeleteResource = (props: Partial<DeleteResourceProps> = {}) =>
  render(
    <DeleteResource
      open
      onOpenChange={() => {}}
      resourceType="Worker"
      resourceName="my-worker"
      onDelete={() => {}}
      {...props}
    />,
  )

const getConfirmInput = () =>
  screen.getByRole("textbox", { name: "Type my-worker to confirm deletion" })

const getDeleteButton = () => screen.getByRole("button", { name: "Delete Worker" })

describe("DeleteResource", () => {
  it("renders a copy control for the resource name", () => {
    renderDeleteResource()

    expect(screen.getByRole("button", { name: "Copy my-worker to clipboard" })).toBeDefined()
  })

  it("renders nothing when closed", () => {
    renderDeleteResource({ open: false })

    expect(screen.queryByRole("alertdialog")).toBeNull()
  })

  it("names the dialog after the resource and describes the deletion", () => {
    renderDeleteResource()

    expect(
      screen.getByRole("alertdialog", { name: "Delete my-worker" }),
    ).toHaveAccessibleDescription(
      "This action cannot be undone. This will permanently delete the my-worker worker.",
    )
    expect(screen.getByText(/This action cannot be undone/)).toHaveTextContent(
      "This will permanently delete the my-worker worker.",
    )
  })

  it("focuses the confirmation input when opened", async () => {
    renderDeleteResource()

    await waitFor(() => expect(getConfirmInput()).toHaveFocus())
  })

  it("only enables delete once the resource name is typed", async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    renderDeleteResource({ onDelete })

    expect(getDeleteButton()).toBeDisabled()

    await user.type(getConfirmInput(), "my-work")
    expect(getDeleteButton()).toBeDisabled()

    await user.type(getConfirmInput(), "er")
    expect(getDeleteButton()).toBeEnabled()

    await user.click(getDeleteButton())
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it("matches the resource name case-sensitively by default", async () => {
    const user = userEvent.setup()
    renderDeleteResource()

    await user.type(getConfirmInput(), "MY-WORKER")
    expect(getDeleteButton()).toBeDisabled()
  })

  it("ignores case when `caseSensitive` is false", async () => {
    const user = userEvent.setup()
    renderDeleteResource({ caseSensitive: false })

    await user.type(getConfirmInput(), "MY-WORKER")
    expect(getDeleteButton()).toBeEnabled()
  })

  it("supports custom delete button text", () => {
    renderDeleteResource({ deleteButtonText: "Remove forever" })

    expect(screen.getByRole("button", { name: "Remove forever" })).toBeInTheDocument()
  })

  it("shows the error message", () => {
    renderDeleteResource({ errorMessage: "Something went wrong" })

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  it("calls `onOpenChange(false)` from Cancel", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderDeleteResource({ onOpenChange })

    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("locks the dialog while deleting", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const onDelete = vi.fn()
    renderDeleteResource({ isDeleting: true, onOpenChange, onDelete })

    expect(getConfirmInput()).toBeDisabled()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled()

    await user.keyboard("{Escape}")
    expect(onOpenChange).not.toHaveBeenCalled()
    expect(onDelete).not.toHaveBeenCalled()
  })

  it("clears the confirmation when the dialog reopens", async () => {
    const user = userEvent.setup()
    const { rerender } = renderDeleteResource()

    await user.type(getConfirmInput(), "my-worker")

    const props: DeleteResourceProps = {
      onOpenChange: () => {},
      resourceType: "Worker",
      resourceName: "my-worker",
      onDelete: () => {},
      open: false,
    }
    rerender(<DeleteResource {...props} />)
    rerender(<DeleteResource {...props} open />)

    expect(getConfirmInput()).toHaveValue("")
  })

  it("keeps the dialog open and pending while an async delete runs, then closes", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    let resolve = () => {}
    const onDelete = vi.fn(() => new Promise<void>((done) => (resolve = done)))
    renderDeleteResource({ onDelete, onOpenChange })

    await user.type(getConfirmInput(), "my-worker")
    await user.click(getDeleteButton())

    expect(onDelete).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(getConfirmInput()).toBeDisabled())
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled()
    expect(onOpenChange).not.toHaveBeenCalled()

    resolve()
    await waitFor(() =>
      expect(onOpenChange).toHaveBeenCalledWith(
        false,
        expect.objectContaining({ returnValue: "confirm" }),
      ),
    )
  })

  it("opens from a trigger passed as children", async () => {
    const user = userEvent.setup()
    render(
      <DeleteResource resourceType="Worker" resourceName="my-worker" onDelete={() => {}}>
        <AlertDialog.Trigger>Delete worker</AlertDialog.Trigger>
      </DeleteResource>,
    )

    await user.click(screen.getByRole("button", { name: "Delete worker" }))
    expect(screen.getByRole("alertdialog", { name: "Delete my-worker" })).toBeInTheDocument()
  })

  it("copies the resource name to the clipboard", async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue()
    renderDeleteResource()

    await user.click(screen.getByRole("button", { name: "Copy my-worker to clipboard" }))
    expect(writeText).toHaveBeenCalledWith("my-worker")

    writeText.mockRestore()
  })
})
