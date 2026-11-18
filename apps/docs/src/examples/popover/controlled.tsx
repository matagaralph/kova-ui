import { Button, Popover } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("none")

  return (
    <div className="flex items-center gap-3">
      <Popover
        open={open}
        onOpenChange={(next, details) => {
          setOpen(next)
          setReason(details.reason)
        }}
      >
        <Popover.Trigger render={<Button color="secondary" variant="outline" />}>
          Details
        </Popover.Trigger>
        <Popover.Content className="p-4 text-sm">Press Escape or outside to close.</Popover.Content>
      </Popover>
      <span className="text-sm text-secondary">
        {open ? "Open" : "Closed"}, last reason: {reason}
      </span>
    </div>
  )
}

export { Example }
