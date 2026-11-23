import { Button, Tooltip } from "kova-ui/components"

function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger render={<Button />}>Submit for review</Tooltip.Trigger>
      <Tooltip.Content>
        Sends the entry to a reviewer. It goes live in the dictionary once they approve it.
      </Tooltip.Content>
    </Tooltip>
  )
}

export { Example }
