import { BookBookmark, Calendar, Settings, User, Users, Volume } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const suggestions = [
  { value: "word-of-the-day", label: "Word of the day", icon: Calendar },
  { value: "pronunciation", label: "Play pronunciation", icon: Volume },
  { value: "invite", label: "Invite contributors", icon: Users, disabled: true },
]

const settings = [
  { value: "profile", label: "Profile", icon: User, shortcut: "mod+shift+p" },
  { value: "bookmarks", label: "Bookmarks", icon: BookBookmark, shortcut: "mod+shift+b" },
  { value: "settings", label: "Settings", icon: Settings, shortcut: "mod+," },
]

function Example() {
  return (
    <Command className="max-w-sm">
      <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        <Command.Group>
          <Command.GroupLabel>Suggestions</Command.GroupLabel>
          {suggestions.map((item) => (
            <Command.Item key={item.value} value={item.value} disabled={item.disabled}>
              <Command.ItemIcon>
                <item.icon />
              </Command.ItemIcon>
              <span>{item.label}</span>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Separator />
        <Command.Group>
          <Command.GroupLabel>Settings</Command.GroupLabel>
          {settings.map((item) => (
            <Command.Item key={item.value} value={item.value} shortcut={item.shortcut}>
              <Command.ItemIcon>
                <item.icon />
              </Command.ItemIcon>
              <span>{item.label}</span>
              <Command.Shortcut />
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  )
}

export { Example }
