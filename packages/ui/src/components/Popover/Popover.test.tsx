import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vite-plus/test"
import { Button } from "../Button/index.js"
import { Dialog } from "../Dialog/index.js"
import { Menu } from "../Menu/index.js"
import { Popover } from "./index.js"

const PopoverInDialog = () => {
  const [open, setOpen] = useState(true)
  return open ? (
    <Dialog title="Settings" onClose={() => setOpen(false)}>
      <Popover>
        <Popover.Trigger>
          <Button color="secondary">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p>Popover content</p>
        </Popover.Content>
      </Popover>
    </Dialog>
  ) : null
}

const MenuInDialog = () => {
  const [open, setOpen] = useState(true)
  return open ? (
    <Dialog title="Settings" onClose={() => setOpen(false)}>
      <Menu>
        <Menu.Trigger>
          <Button color="secondary">Open menu</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={() => {}}>Rename</Menu.Item>
        </Menu.Content>
      </Menu>
    </Dialog>
  ) : null
}

describe("Popover", () => {
  it("opens from the trigger and closes with Escape", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <Popover.Trigger>
          <Button color="secondary">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p>Popover content</p>
        </Popover.Content>
      </Popover>,
    )

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    expect(await screen.findByText("Popover content")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByText("Popover content")).not.toBeInTheDocument())
  })

  it("closes only the popover when Escape is pressed inside a dialog", async () => {
    const user = userEvent.setup()
    render(<PopoverInDialog />)

    await user.click(screen.getByRole("button", { name: "Open popover" }))
    expect(await screen.findByText("Popover content")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByText("Popover content")).not.toBeInTheDocument())
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
  })

  it("closes only the menu when Escape is pressed inside a dialog", async () => {
    const user = userEvent.setup()
    render(<MenuInDialog />)

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(await screen.findByRole("menu", { hidden: true })).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.queryByRole("menu", { hidden: true })).not.toBeInTheDocument(),
    )
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument()
  })
})
