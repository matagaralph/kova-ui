import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Command } from "./command.js"

function Example(props: Partial<React.ComponentProps<typeof Command>>) {
  return (
    <Command {...props}>
      <Command.Input aria-label="Search commands" placeholder="Type a command…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        <Command.Group>
          <Command.GroupLabel>Settings</Command.GroupLabel>
          <Command.Item value="profile" shortcut="mod+p">
            <Command.ItemText>Profile</Command.ItemText>
            <Command.Shortcut />
          </Command.Item>
          <Command.Item value="billing">
            <Command.ItemText>Billing</Command.ItemText>
          </Command.Item>
          <Command.Item value="team" disabled>
            <Command.ItemText>Team</Command.ItemText>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  )
}

describe("Command", () => {
  it("names the search field and draws a hidden search icon beside it", () => {
    render(<Example />)

    const input = screen.getByRole("combobox", { name: "Search commands" })
    expect(input.parentElement?.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByRole("option", { name: /Profile/ })).toBeInTheDocument()
  })

  it("filters as you type and runs the highlighted command with Enter", async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<Example onAction={onAction} />)

    await user.type(screen.getByRole("combobox"), "bil")
    await waitFor(() => expect(screen.queryByRole("option", { name: /Profile/ })).toBeNull())
    await user.keyboard("{Enter}")

    expect(onAction).toHaveBeenCalledWith("billing", expect.anything())
  })

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup()
    render(<Example />)

    await user.type(screen.getByRole("combobox"), "zzz")
    expect(await screen.findByText("No results found.")).toBeInTheDocument()
  })

  it("renders data commands with Kova's parts, filters them and runs one", async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <Command
        onAction={onAction}
        items={[
          { type: "group", label: "Files", items: [{ value: "new-file", label: "New file" }] },
          { value: "new-folder", label: "New folder", shortcut: "mod+shift+f" },
        ]}
      >
        <Command.Input aria-label="Search" />
        <Command.List />
      </Command>,
    )

    expect(await screen.findByRole("group", { name: "Files" })).toBeInTheDocument()
    const folder = screen.getByRole("option", { name: /New folder/ })
    expect(folder.querySelector('[data-slot="command-shortcut"]')).toBeInTheDocument()
    expect(folder.closest('[data-slot="command"]')?.className).toMatch(/Command/)

    // The data highlight needs a real browser, so this runs the command with a click
    await user.type(screen.getByRole("combobox"), "folder")
    await waitFor(() => expect(screen.queryByRole("option", { name: /New file/ })).toBeNull())
    await user.click(screen.getByRole("option", { name: /New folder/ }))
    expect(onAction).toHaveBeenCalledWith("new-folder", expect.anything())
  })

  it("merges a className with Kova's class on every part", () => {
    render(<Example className="palette" />)

    expect(document.querySelector('[data-slot="command"]')).toHaveClass("palette")
    for (const slot of ["command-input", "command-list", "command-item", "command-group-label"]) {
      expect(document.querySelector(`[data-slot="${slot}"]`)?.className).toMatch(/\S/)
    }
  })
})
