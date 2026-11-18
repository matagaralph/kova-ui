import { Button, DeleteResource } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Button color="danger" variant="soft" disabled={deleted} onClick={() => setOpen(true)}>
        Delete API key
      </Button>
      {deleted && <span className="text-sm text-secondary">Key deleted</span>}
      <DeleteResource
        open={open}
        onOpenChange={setOpen}
        resourceType="API key"
        resourceName="ci-deploy"
        onDelete={() => setDeleted(true)}
      />
    </div>
  )
}

export { Example }
