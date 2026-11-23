import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Notifications</Menu.Trigger>
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
        <Menu.CheckboxItem value="word-of-the-day" defaultChecked>
          <Menu.ItemIndicator variant="ghost" />
          Word of the day
        </Menu.CheckboxItem>
        <Menu.CheckboxItem value="lessons">
          <Menu.ItemIndicator variant="ghost" />
          New lessons
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
