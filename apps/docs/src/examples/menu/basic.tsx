import { DotsHorizontal } from "@kova-ui/icons"
import { Button, Menu } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [action, setAction] = useState("none")

  return (
    <div className="flex items-center gap-3">
      <Menu onAction={setAction}>
        <Menu.Trigger aria-label="Entry actions" render={<Button variant="outline" uniform />}>
          <DotsHorizontal aria-hidden />
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.Item value="bookmark">Bookmark</Menu.Item>
          <Menu.Item value="archive">Archive</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="delete" destructive>
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu>
      <span className="text-sm text-secondary">Last action: {action}</span>
    </div>
  )
}

export { Example }
