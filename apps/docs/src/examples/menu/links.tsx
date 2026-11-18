import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button color="secondary" variant="outline" />}>Account</Menu.Trigger>
      <Menu.Content>
        <Menu.Item href="/settings/profile">Profile</Menu.Item>
        <Menu.Item href="/settings/billing">Billing</Menu.Item>
        <Menu.Separator />
        <Menu.Item href="https://status.example.com">System status</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
