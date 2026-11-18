import { Button, Tooltip } from "kova-ui/components"

function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger render={<Button color="primary" />}>Deploy</Tooltip.Trigger>
      <Tooltip.Content>
        Builds the main branch and ships it to production. Takes about two minutes.
      </Tooltip.Content>
    </Tooltip>
  )
}

export { Example }
