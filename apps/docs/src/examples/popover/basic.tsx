import { Button, Popover } from "kova-ui/components"

function Example() {
  return (
    <Popover>
      <Popover.Trigger render={<Button variant="outline" />}>Word of the day</Popover.Trigger>
      <Popover.Content className="p-4">
        <Popover.Title>sadza</Popover.Title>
        <Popover.Description>Noun. Thick maize porridge.</Popover.Description>
      </Popover.Content>
    </Popover>
  )
}

export { Example }
