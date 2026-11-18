import { Download, Plus, Settings, Trash } from "@kova-ui/icons"
import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <Plus />
        New project
      </Button>
      <Button color="secondary" variant="outline">
        Export
        <Download />
      </Button>
      <Button color="secondary" variant="ghost" uniform aria-label="Settings">
        <Settings />
      </Button>
      <Button color="danger" variant="soft" uniform pill aria-label="Delete">
        <Trash />
      </Button>
      <Button color="secondary" variant="outline" size="lg" iconSize="lg" gutterSize="xs">
        <Settings />
      </Button>
    </div>
  )
}

export { Example }
