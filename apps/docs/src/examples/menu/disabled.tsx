import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button color="secondary" variant="outline" />}>Edit</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Cut</Menu.Item>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item disabled>Paste</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
