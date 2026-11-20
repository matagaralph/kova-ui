import { Command, type CommandData } from "kova-ui/components"
import { useState } from "react"

const commands: CommandData = [
  {
    type: "group",
    label: "Projects",
    items: [
      { value: "new-project", label: "New project", shortcut: "mod+shift+n" },
      { value: "import", label: "Import from GitHub", keywords: ["repository", "git"] },
    ],
  },
  { type: "separator" },
  {
    type: "group",
    label: "Account",
    items: [
      { value: "profile", label: "Profile" },
      { value: "sign-out", label: "Sign out" },
    ],
  },
]

function Example() {
  const [ran, setRan] = useState<string | null>(null)

  return (
    <div className="max-w-sm flex w-full flex-col gap-3">
      <Command items={commands} onAction={setRan}>
        <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
        <Command.Empty>No results found.</Command.Empty>
        <Command.List />
      </Command>
      <p className="m-0 text-sm text-secondary" role="status">
        {ran ? `Ran ${ran}` : "Choose a command."}
      </p>
    </div>
  )
}

export { Example }
