import { Moon, Palette, Sun } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const commands = [
  { value: "light", label: "Light theme", icon: Sun, keywords: ["day", "bright"] },
  { value: "dark", label: "Dark theme", icon: Moon, keywords: ["night", "dim"] },
  { value: "brand", label: "Brand colors", icon: Palette, keywords: ["accent", "logo"] },
]

function Example() {
  return (
    <Command className="max-w-sm">
      <Command.Input aria-label="Search appearance" placeholder="Try “night” or “logo”…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        {commands.map((item) => (
          <Command.Item key={item.value} value={item.value} keywords={item.keywords}>
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
