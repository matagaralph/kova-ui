import { Archive } from "@kova-ui/icons"
import { Button, Tooltip } from "kova-ui/components"

function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger render={<Button color="secondary" variant="ghost" uniform />}>
        <Archive aria-hidden />
      </Tooltip.Trigger>
      <Tooltip.Content compact>Archive</Tooltip.Content>
    </Tooltip>
  )
}

export { Example }
