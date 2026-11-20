import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button color="secondary" variant="outline" />}>
        Notifications
      </Menu.Trigger>
      <Menu.Content minWidth={240}>
        <Menu.CheckboxItem value="mentions" defaultChecked>
          <Menu.ItemIndicator />
          Mentions
        </Menu.CheckboxItem>
        <Menu.CheckboxItem value="replies">
          <Menu.ItemIndicator />
          Replies
        </Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.CheckboxItem value="digest" defaultChecked>
          <Menu.ItemIndicator variant="ghost" />
          Weekly digest
        </Menu.CheckboxItem>
        <Menu.CheckboxItem value="product">
          <Menu.ItemIndicator variant="ghost" />
          Product news
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
