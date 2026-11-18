import { Badge, Button, SlotTransitionGroup } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Button
        color="primary"
        onClick={() => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
      >
        Save
      </Button>
      <div role="status">
        <SlotTransitionGroup enterDuration={300} exitDuration={300}>
          {saved && (
            <Badge
              key="saved"
              color="success"
              size="md"
              className="transition-opacity duration-300 data-exiting-active:opacity-0 [&[data-entering]:not([data-entering-active])]:opacity-0"
            >
              Saved
            </Badge>
          )}
        </SlotTransitionGroup>
      </div>
    </div>
  )
}

export { Example }
