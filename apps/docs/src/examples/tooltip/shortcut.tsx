import { Pencil } from "@kova-ui/icons"
import { Button, Tooltip } from "kova-ui/components"

function Example() {
  return (
    <Tooltip shortcut="mod+e">
      <Tooltip.Trigger render={<Button variant="ghost" uniform />}>
        <Pencil aria-hidden />
      </Tooltip.Trigger>
      <Tooltip.Content compact>
        Edit
        <Tooltip.Shortcut />
      </Tooltip.Content>
    </Tooltip>
  )
}

export { Example }
