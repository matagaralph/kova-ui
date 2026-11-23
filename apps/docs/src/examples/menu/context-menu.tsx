import { Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.ContextTrigger
        tabIndex={0}
        className="flex h-32 w-72 items-center justify-center rounded-lg border border-dashed text-sm text-secondary"
      >
        Right-click here
      </Menu.ContextTrigger>
      <Menu.Content minWidth={200}>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Bookmark</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Look up in the dictionary</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
