import { ArrowRight, FolderPlus, Plus, Users } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const teammates = ["Rudo Chikwanha", "Tendai Moyo", "Nyasha Dube", "Farai Ncube"]

function Example() {
  return (
    <Command className="max-w-sm">
      <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        <Command.Page>
          <Command.Item value="new-project">
            <Command.ItemIcon>
              <Plus />
            </Command.ItemIcon>
            <span>New project</span>
          </Command.Item>
          <Command.Item value="new-folder">
            <Command.ItemIcon>
              <FolderPlus />
            </Command.ItemIcon>
            <span>New folder</span>
          </Command.Item>
          <Command.Item value="assign" page="assign">
            <Command.ItemIcon>
              <Users />
            </Command.ItemIcon>
            <span>Assign to…</span>
            <Command.ItemIcon mirror className="ms-auto">
              <ArrowRight />
            </Command.ItemIcon>
          </Command.Item>
        </Command.Page>
        <Command.Page value="assign">
          {teammates.map((name) => (
            <Command.Item key={name} value={name}>
              {name}
            </Command.Item>
          ))}
        </Command.Page>
      </Command.List>
    </Command>
  )
}

export { Example }
