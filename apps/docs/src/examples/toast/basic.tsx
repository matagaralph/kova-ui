import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useState } from "react"

function Example() {
  const [toast] = useState(() => createToaster())
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            description: "Friday, 12 June at 10:00",
            action: { label: "Undo", onAction: () => toast("Event removed") },
          })
        }
      >
        Create event
      </Button>
      <ToastRegion toaster={toast} />
    </>
  )
}

export { Example }
