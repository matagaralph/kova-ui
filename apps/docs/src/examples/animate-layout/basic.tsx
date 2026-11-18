import { AnimateLayout, Button } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-80 flex-col">
      <Button
        color="secondary"
        variant="outline"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "Hide filters" : "Show filters"}
      </Button>
      <AnimateLayout transitionClassName="pt-3">
        {open && (
          <div
            key="filters"
            className="rounded-lg border border-default p-4 text-sm text-secondary"
          >
            Status, owner and date filters go here.
          </div>
        )}
      </AnimateLayout>
      <p className="mt-3 text-sm">Content below moves with the panel.</p>
    </div>
  )
}

export { Example }
