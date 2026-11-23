import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>View</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Columns</Menu.GroupLabel>
          <Menu.CheckboxItem value="status" defaultChecked>
            <Menu.ItemIndicator />
            Status
          </Menu.CheckboxItem>
          <Menu.CheckboxItem value="contributor" defaultChecked>
            <Menu.ItemIndicator />
            Contributor
          </Menu.CheckboxItem>
          <Menu.CheckboxItem value="updated">
            <Menu.ItemIndicator />
            Last updated
          </Menu.CheckboxItem>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
