import { Button, DeleteResource } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Button variant="secondary-destructive" disabled={deleted} onClick={() => setOpen(true)}>
        Delete recording
      </Button>
      {deleted && <span className="text-sm text-secondary">Recording deleted</span>}
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="Recording"
        resourceName="mvura.mp3"
        onDelete={() => setDeleted(true)}
      />
    </div>
  )
}

export { Example }
