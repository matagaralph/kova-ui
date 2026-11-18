import { Button, Popover } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <Popover.Trigger render={<Button color="secondary" variant="outline" />}>
          Fixed width
        </Popover.Trigger>
        <Popover.Content width={360} className="p-4 text-sm">
          This popover is always 360px wide.
        </Popover.Content>
      </Popover>
      <Popover>
        <Popover.Trigger render={<Button color="secondary" variant="outline" />}>
          Translucent
        </Popover.Trigger>
        <Popover.Content translucent className="p-4 text-sm">
          The page shows through, blurred.
        </Popover.Content>
      </Popover>
    </div>
  )
}

export { Example }
