import { Button, Menu } from "kova-ui/components"

function Example() {
  return (
    <Menu>
      <Menu.Trigger render={<Button variant="outline" />}>File</Menu.Trigger>
      <Menu.Content>
        <Menu.Item>New file</Menu.Item>
        <Menu.Item>Open…</Menu.Item>
        <Menu.Sub>
          <Menu.SubTrigger>Open recent</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>proverbs.md</Menu.Item>
            <Menu.Item>word-list.xlsx</Menu.Item>
            <Menu.Item>greetings-lesson.pdf</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
        <Menu.Separator />
        <Menu.Sub>
          <Menu.SubTrigger>Export as</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>PDF</Menu.Item>
            <Menu.Item>Markdown</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu>
  )
}

export { Example }
