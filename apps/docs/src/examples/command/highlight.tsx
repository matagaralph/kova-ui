import { BookBookmark, BookOpen, Calendar, Quote, Settings } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const commands = [
  { value: "word-of-the-day", label: "Word of the day", icon: Calendar },
  { value: "proverbs", label: "Proverbs", icon: Quote },
  { value: "stories", label: "Stories", icon: BookOpen },
  { value: "bookmarks", label: "Bookmarks", icon: BookBookmark },
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
