import { act, render, screen, waitFor, within } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vite-plus/test"
import { createToaster, type Toaster } from "./index.js"
import { Toast, ToastRegion } from "./Toast.js"

let toaster: Toaster
afterEach(() => {
  act(() => {
    toaster?.dismiss()
  })
})

describe("Toast", () => {
  it("shows a toast named by its title and described by its description in the Notifications region", async () => {
    toaster = createToaster({ duration: Infinity })
    render(<ToastRegion toaster={toaster} />)

    act(() => {
      toaster("Event created", { description: "Friday at 10:00" })
    })

    const region = await screen.findByRole("region", { name: "Notifications" })
    const item = await within(region).findByText("Event created")
    expect(within(region).getByText("Friday at 10:00")).toBeInTheDocument()
    expect(item.closest('[data-slot="toast"]')).toHaveAttribute("data-type", "default")
  })

  it("draws an icon for each type and none for the default", async () => {
    toaster = createToaster({ duration: Infinity })
    render(<ToastRegion toaster={toaster} />)

    act(() => {
      toaster.success("Changes saved")
    })

    const toast = (await screen.findByText("Changes saved")).closest('[data-slot="toast"]')
    expect(toast).toHaveAttribute("data-type", "success")
    const icon = toast?.querySelector('[data-type="success"][aria-hidden="true"]')
    expect(icon?.querySelector("svg")).toBeInTheDocument()

    act(() => {
      toaster("Event created")
    })
    const plain = (await screen.findByText("Event created")).closest('[data-slot="toast"]')
    expect(plain?.querySelector('[aria-hidden="true"][data-type]')).toBeNull()
  })

  it("runs the action, and the cancel button dismisses with its callback", async () => {
    const user = userEvent.setup()
    toaster = createToaster({ duration: Infinity })
    const onAction = vi.fn()
    const onCancel = vi.fn()
    render(<ToastRegion toaster={toaster} expanded />)

    act(() => {
      toaster("Message archived", {
        action: { label: "Undo", onAction },
        cancel: { label: "Dismiss", onCancel },
      })
    })

    await user.click(await screen.findByRole("button", { name: "Undo" }))
    expect(onAction).toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByText("Message archived")).not.toBeInTheDocument())

    act(() => {
      toaster("Message archived again", { cancel: { label: "Dismiss", onCancel } })
    })
    await user.click(await screen.findByRole("button", { name: "Dismiss" }))
    expect(onCancel).toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.queryByText("Message archived again")).not.toBeInTheDocument(),
    )
  })

  it("closes from an icon close button named Close", async () => {
    const user = userEvent.setup()
    toaster = createToaster({ duration: Infinity })
    render(
      <ToastRegion toaster={toaster}>
        {() => (
          <Toast>
            <Toast.Content>
              <Toast.Title />
            </Toast.Content>
            <Toast.Close />
          </Toast>
        )}
      </ToastRegion>,
    )

    act(() => {
      toaster("Invite sent")
    })

    const close = await screen.findByRole("button", { name: "Close" })
    expect(close).toHaveAttribute("data-icon")
    expect(close.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
    await user.click(close)
    await waitFor(() => expect(screen.queryByText("Invite sent")).not.toBeInTheDocument())
  })

  it("puts the region on its side and alignment, and merges a className", async () => {
    toaster = createToaster({ duration: Infinity })
    render(<ToastRegion toaster={toaster} side="top" align="center" className="region" />)

    act(() => {
      toaster("Event created")
    })

    const region = await screen.findByRole("region", { name: "Notifications" })
    expect(region).toHaveAttribute("data-side", "top")
    expect(region).toHaveAttribute("data-align", "center")
    expect(region).toHaveClass("region")
    expect(region.classList.length).toBeGreaterThan(1)
  })
})
