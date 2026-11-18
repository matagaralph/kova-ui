import { Button, Popover } from "kova-ui/components"

function Example() {
  return (
    <Popover openOnHover delay={150}>
      <Popover.Trigger render={<Button color="secondary" variant="ghost" />}>
        @hollis
      </Popover.Trigger>
      <Popover.Content className="p-4" minWidth={240}>
        <Popover.Title>Hollis Grant</Popover.Title>
        <Popover.Description>Design lead · Joined March 2023</Popover.Description>
      </Popover.Content>
    </Popover>
  )
}

export { Example }
