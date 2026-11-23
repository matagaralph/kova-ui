import { Button, Popover } from "kova-ui/components"

const sides = ["top", "right", "bottom", "left"] as const

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => (
        <Popover key={side}>
          <Popover.Trigger render={<Button variant="outline" />}>{side}</Popover.Trigger>
          <Popover.Content side={side} align="start" minWidth="auto" className="p-3 text-sm">
            Opens on the {side}, aligned to the start.
          </Popover.Content>
        </Popover>
      ))}
    </div>
  )
}

export { Example }
