import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { type ComponentProps, forwardRef } from "react"
import { describe, expect, it, vi } from "vite-plus/test"
import { Button } from "../Button/index.js"
import { Dialog } from "../Dialog/index.js"
import { KovaProvider } from "../KovaProvider/index.js"
import { Menu } from "./index.js"

describe("Menu", () => {
  it("opens from a Button trigger and runs an item with the keyboard", async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <Menu onAction={onAction}>
        <Menu.Trigger render={<Button color="secondary" />}>Actions</Menu.Trigger>
        <Menu.Content>
          <Menu.Item value="rename">Rename</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="delete" destructive>
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    const trigger = screen.getByRole("button", { name: "Actions" })
    trigger.focus()
    await user.keyboard("{Enter}")

    const menu = screen.getByRole("menu", { name: "Actions" })
    expect(menu.className).toMatch(/MenuContent/)
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus())

    await user.keyboard("{ArrowDown}{Enter}")
    expect(onAction).toHaveBeenCalledWith("delete", expect.anything())
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
    expect(trigger).toHaveFocus()
  })

  it("toggles checkbox items and selects radio items, with Kova indicators", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Menu defaultOpen>
        <Menu.Trigger>View</Menu.Trigger>
        <Menu.Content>
          <Menu.CheckboxItem value="minimap">
            <Menu.ItemIndicator data-testid="check" />
            Minimap
          </Menu.CheckboxItem>
          <Menu.Separator />
          <Menu.RadioGroup defaultValue="name" onValueChange={onValueChange}>
            <Menu.RadioItem value="name">
              <Menu.ItemIndicator variant="ghost" />
              Name
            </Menu.RadioItem>
            <Menu.RadioItem value="date">
              <Menu.ItemIndicator />
              Date
            </Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu>,
    )

    const minimap = screen.getByRole("menuitemcheckbox", { name: "Minimap" })
    const indicator = screen.getByTestId("check")
    expect(indicator).toHaveAttribute("data-unchecked")
    expect(indicator).toHaveAttribute("data-variant", "solid")
    expect(indicator.querySelector("svg")).not.toBeNull()

    await user.click(minimap)
    expect(minimap).toHaveAttribute("aria-checked", "true")
    expect(indicator).toHaveAttribute("data-checked")

    await user.click(screen.getByRole("menuitemradio", { name: "Date" }))
    expect(onValueChange).toHaveBeenCalledWith("date", expect.anything())
    expect(screen.getByRole("menuitemradio", { name: "Date" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("opens a submenu with ArrowRight and shows a chevron on its trigger", async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <Menu.Trigger>File</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>New</Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger>Share</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Copy link</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Content>
      </Menu>,
    )

    screen.getByRole("button", { name: "File" }).focus()
    await user.keyboard("{Enter}")
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "New" })).toHaveFocus())
    await user.keyboard("{ArrowDown}")

    const subTrigger = screen.getByRole("menuitem", { name: "Share" })
    expect(subTrigger).toHaveFocus()
    expect(subTrigger.querySelector("svg")).not.toBeNull()

    await user.keyboard("{ArrowRight}")
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Copy link" })).toHaveFocus())
  })

  it("renders `href` items with KovaProvider's link component, and external ones as anchors", () => {
    const RouterLink = forwardRef<HTMLAnchorElement, ComponentProps<"a">>((props, ref) => (
      <a ref={ref} data-router="" {...props} />
    ))
    render(
      <KovaProvider linkComponent={RouterLink}>
        <Menu defaultOpen>
          <Menu.Trigger>Go</Menu.Trigger>
          <Menu.Content>
            <Menu.Item href="/settings">Settings</Menu.Item>
            <Menu.Item href="https://example.com/docs">Docs</Menu.Item>
          </Menu.Content>
        </Menu>
      </KovaProvider>,
    )

    const settings = screen.getByRole("menuitem", { name: "Settings" })
    expect(settings.tagName).toBe("A")
    expect(settings).toHaveAttribute("href", "/settings")
    expect(settings).toHaveAttribute("data-router")

    const docs = screen.getByRole("menuitem", { name: "Docs" })
    expect(docs).toHaveAttribute("href", "https://example.com/docs")
    expect(docs).toHaveAttribute("target", "_blank")
    expect(docs).not.toHaveAttribute("data-router")
  })

  it("writes its size props as CSS variables", () => {
    render(
      <Menu defaultOpen>
        <Menu.Trigger>Sized</Menu.Trigger>
        <Menu.Content width={240} maxHeight={320}>
          <Menu.Item>One</Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    const menu = screen.getByRole("menu")
    expect(menu.style.getPropertyValue("--menu-width")).toBe("240px")
    expect(menu.style.getPropertyValue("--menu-max-height")).toBe("320px")
  })

  it("closes only the menu when Escape is pressed inside a dialog", async () => {
    const user = userEvent.setup()
    render(
      <Dialog defaultOpen>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Settings</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Menu>
              <Menu.Trigger>Open menu</Menu.Trigger>
              <Menu.Content>
                <Menu.Item>Rename</Menu.Item>
              </Menu.Content>
            </Menu>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog>,
    )

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByRole("menu")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument()
  })
})
