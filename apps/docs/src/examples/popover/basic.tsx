import { Button, Popover } from "kova-ui/components"

function Example() {
  return (
    <Popover>
      <Popover.Trigger render={<Button color="secondary" variant="outline" />}>
        Storage
      </Popover.Trigger>
      <Popover.Content className="p-4">
        <Popover.Title>Storage</Popover.Title>
        <Popover.Description>You've used 7.2 GB of your 10 GB plan.</Popover.Description>
      </Popover.Content>
    </Popover>
  )
}

export { Example }
