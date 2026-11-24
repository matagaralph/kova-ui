import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it, vi } from "vite-plus/test"
import { Field } from "../field/index.js"
import { Select } from "./select.js"

const roles = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
  { value: "owner", label: "Owner" },
]

function RoleItems() {
  return roles.map((role) => (
    <Select.Item key={role.value} value={role.value}>
      {role.label}
      <Select.ItemIndicator />
    </Select.Item>
  ))
}

describe("Select", () => {
  it("is named by a Field.Label and chooses an item with the keyboard", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Field>
        <Field.Label>Role</Field.Label>
        <Select placeholder="Select a role" onValueChange={onValueChange}>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <RoleItems />
          </Select.Content>
        </Select>
      </Field>,
    )

    const trigger = screen.getByRole("combobox", { name: "Role" })
    expect(trigger).toHaveTextContent("Select a role")
    expect(trigger).toHaveAttribute("data-placeholder")

    trigger.focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{ArrowDown}{Enter}")

    expect(onValueChange).toHaveBeenCalledWith("editor", expect.anything())
    expect(trigger).toHaveTextContent("Editor")
    expect(trigger).not.toHaveAttribute("data-placeholder")
    expect(trigger).toHaveFocus()
  })

  it("renders a Select.Value when the trigger has no children", () => {
    render(
      <Select defaultValue="owner" items={roles}>
        <Select.Trigger aria-label="Role" />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Owner")
  })

  it("writes Kova props as data attributes and keeps state class names", () => {
    render(
      <Select>
        <Select.Trigger
          aria-label="Role"
          variant="soft"
          size="lg"
          pill
          className={(state) => (state.open ? "open" : "closed")}
        />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Role" })
    expect(trigger).toHaveAttribute("data-slot", "select-trigger")
    expect(trigger).toHaveAttribute("data-variant", "soft")
    expect(trigger).toHaveAttribute("data-size", "lg")
    expect(trigger).toHaveAttribute("data-pill")
    expect(trigger).toHaveAttribute("data-block")
    expect(trigger).toHaveClass("closed")
    expect(trigger.className).toMatch(/SelectControl/)
  })

  it("is inline by default with the ghost variant", () => {
    render(
      <Select>
        <Select.Trigger aria-label="Role" variant="ghost" />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    expect(screen.getByRole("combobox", { name: "Role" })).not.toHaveAttribute("data-block")
  })

  it("does not open while loading", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Select onOpenChange={onOpenChange}>
        <Select.Trigger aria-label="Role" loading />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Role" })
    expect(trigger).toHaveAttribute("aria-busy", "true")
    await user.click(trigger)
    trigger.focus()
    await user.keyboard("{ArrowDown}{Enter} ")
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("toggles several values with multiple and keeps the list open", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Select multiple defaultValue={["viewer"]} onValueChange={onValueChange} items={roles}>
        <Select.Trigger aria-label="Roles" />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    await user.click(screen.getByRole("combobox", { name: "Roles" }))
    await user.click(screen.getByRole("option", { name: "Owner" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["viewer", "owner"], expect.anything())
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Owner" })).toHaveAttribute("data-selected")
  })

  it("clears the value with Select.Clear", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Select
        defaultValue="editor"
        placeholder="Unassigned"
        items={roles}
        onValueChange={onValueChange}
      >
        <Select.Trigger aria-label="Role" />
        <Select.Clear />
        <Select.Content>
          <RoleItems />
        </Select.Content>
      </Select>,
    )

    await user.click(screen.getByRole("button", { name: "Clear current value" }))
    expect(onValueChange).toHaveBeenCalledWith(null, expect.anything())
    expect(screen.getByRole("combobox", { name: "Role" })).toHaveTextContent("Unassigned")
  })

  it("filters grouped items with Select.Input", async () => {
    const user = userEvent.setup()
    render(
      <Select placeholder="Select a country">
        <Select.Trigger aria-label="Country" />
        <Select.Content>
          <Select.Input aria-label="Search countries" />
          <Select.Empty>No countries found.</Select.Empty>
          <Select.List>
            <Select.Group>
              <Select.GroupLabel>Europe</Select.GroupLabel>
              <Select.Item value="fr">France</Select.Item>
              <Select.Item value="de">Germany</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Asia</Select.GroupLabel>
              <Select.Item value="jp">Japan</Select.Item>
            </Select.Group>
          </Select.List>
        </Select.Content>
      </Select>,
    )

    await user.click(screen.getByRole("combobox", { name: "Country" }))
    const search = screen.getByRole("combobox", { name: "Search countries" })
    expect(search).toHaveFocus()
    await user.type(search, "ja")
    expect(screen.getByRole("option", { name: "Japan" })).toBeVisible()
    expect(screen.queryByRole("option", { name: "France" })).toBeNull()

    await user.keyboard("{Enter}")
    expect(screen.getByRole("combobox", { name: "Country" })).toHaveTextContent("Japan")
  })

  it("shows the item's label, not its description, in the trigger", async () => {
    const user = userEvent.setup()
    render(
      <Select placeholder="Select a plan">
        <Select.Trigger aria-label="Plan" />
        <Select.Content>
          <Select.Item value="pro" label="Pro">
            Pro
            <Select.ItemDescription>For growing teams</Select.ItemDescription>
            <Select.ItemIndicator />
          </Select.Item>
        </Select.Content>
      </Select>,
    )

    await user.click(screen.getByRole("combobox", { name: "Plan" }))
    await user.click(screen.getByRole("option", { name: /Pro/ }))
    expect(screen.getByRole("combobox", { name: "Plan" })).toHaveTextContent(/^Pro$/)
  })
})
