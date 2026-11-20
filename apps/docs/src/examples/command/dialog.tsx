import { Calendar, CreditCard, Palette, Search, Settings, User } from "@kova-ui/icons"
import { Button, Command, Dialog } from "kova-ui/components"
import { useState } from "react"

const commands = [
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "theme", label: "Change theme", icon: Palette },
  { value: "profile", label: "Profile", icon: User },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "settings", label: "Settings", icon: Settings },
]

function Example() {
  const [open, setOpen] = useState(false)
  const [ran, setRan] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger shortcut="mod+k" render={<Button color="secondary" variant="outline" />}>
          <Search aria-hidden="true" />
          Search…
          <Dialog.Shortcut />
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Content width="large" align="top">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command
            onAction={(value) => {
              setRan(value)
              setOpen(false)
            }}
          >
            <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
            <Command.Empty>No results found.</Command.Empty>
            <Command.List>
              {commands.map((item) => (
                <Command.Item key={item.value} value={item.value} label={item.label}>
                  <Command.ItemIcon>
                    <item.icon />
                  </Command.ItemIcon>
                  <span>{item.label}</span>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog>
      <p className="m-0 text-sm text-secondary" role="status">
        {ran ? `Ran ${ran}` : "Press the button, or Ctrl+K or ⌘K."}
      </p>
    </div>
  )
}

export { Example }
