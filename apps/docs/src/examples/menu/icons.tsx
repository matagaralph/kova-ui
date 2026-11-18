import { Copy, Download, Link, Pencil, Share } from "@kova-ui/icons"
import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button color="secondary" variant="outline" />}>
        <Share aria-hidden />
        Share
      </Menu.Trigger>
      <Menu.Content minWidth={220}>
        <Menu.Item shortcut="mod+l">
          <Menu.ItemIcon>
            <Link />
          </Menu.ItemIcon>
          Copy link
          <Menu.Shortcut />
        </Menu.Item>
        <Menu.Item>
          <Menu.ItemIcon>
            <Copy />
          </Menu.ItemIcon>
          Duplicate
        </Menu.Item>
        <Menu.Item>
          <Menu.ItemIcon>
            <Pencil />
          </Menu.ItemIcon>
          Edit
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item>
          <Menu.ItemIcon>
            <Download />
          </Menu.ItemIcon>
          Download
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
