import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button color="secondary" variant="outline" />}>View</Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.GroupLabel>Columns</Menu.GroupLabel>
          <Menu.CheckboxItem value="status" defaultChecked>
            Status
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem value="owner" defaultChecked>
            Owner
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
          <Menu.CheckboxItem value="updated">
            Last updated
            <Menu.ItemIndicator />
          </Menu.CheckboxItem>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
