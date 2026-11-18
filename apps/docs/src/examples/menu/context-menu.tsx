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
        <Menu.Item>Back</Menu.Item>
        <Menu.Item>Reload</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Inspect</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
