import { Button, Tooltip } from "kova-ui/components"

const sides = ["top", "right", "bottom", "left"] as const

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <Tooltip.Trigger render={<Button variant="outline" />}>{side}</Tooltip.Trigger>
          <Tooltip.Content side={side} compact>
            On the {side}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  )
}

export { Example }
