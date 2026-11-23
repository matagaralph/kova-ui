import { Button, Popover } from "kova-ui/components"

function Example() {
  return (
    <Popover openOnHover delay={150}>
      <Popover.Trigger render={<Button variant="ghost" />}>@tendai</Popover.Trigger>
      <Popover.Content className="p-4" minWidth={240}>
        <Popover.Title>Tendai Moyo</Popover.Title>
        <Popover.Description>Reviewer · Karanga · Joined March 2023</Popover.Description>
      </Popover.Content>
    </Popover>
  )
}

export { Example }
