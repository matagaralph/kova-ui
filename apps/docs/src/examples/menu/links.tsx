import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>Account</Menu.Trigger>
      <Menu.Content>
        <Menu.Item href="/settings/profile">Profile</Menu.Item>
        <Menu.Item href="/bookmarks">Bookmarks</Menu.Item>
        <Menu.Separator />
        <Menu.Item href="https://en.wikipedia.org/wiki/Shona_language">
          Shona on Wikipedia
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
