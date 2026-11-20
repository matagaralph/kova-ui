import { Calendar, CreditCard, Palette, Settings, User } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const commands = [
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "theme", label: "Change theme", icon: Palette },
  { value: "profile", label: "Profile", icon: User },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "settings", label: "Settings", icon: Settings },
]

function Example() {
  return (
    <Command className="max-w-sm" defaultQuery="set">
      <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        {commands.map((item) => (
          <Command.Item key={item.value} value={item.value}>
            <Command.ItemIcon>
              <item.icon />
            </Command.ItemIcon>
            <Command.ItemText>{item.label}</Command.ItemText>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  )
}

export { Example }
