import { ArrowRight, FolderPlus, Plus, Users } from "@kova-ui/icons"
import { Command } from "kova-ui/components"

const reviewers = ["Rudo Ncube", "Tendai Moyo", "Nyasha Gumbo", "Farai Sibanda"]

function Example() {
  return (
    <Command className="max-w-sm">
      <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
      <Command.Empty>No results found.</Command.Empty>
      <Command.List>
        <Command.Page>
          <Command.Item value="new-entry">
            <Command.ItemIcon>
              <Plus />
            </Command.ItemIcon>
            <span>New entry</span>
          </Command.Item>
          <Command.Item value="new-collection">
            <Command.ItemIcon>
              <FolderPlus />
            </Command.ItemIcon>
            <span>New collection</span>
          </Command.Item>
          <Command.Item value="assign" page="assign">
            <Command.ItemIcon>
              <Users />
            </Command.ItemIcon>
            <span>Assign a reviewer…</span>
            <Command.ItemIcon mirror className="ms-auto">
              <ArrowRight />
            </Command.ItemIcon>
          </Command.Item>
        </Command.Page>
        <Command.Page value="assign">
          {reviewers.map((name) => (
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
