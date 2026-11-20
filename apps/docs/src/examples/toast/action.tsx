import { Button, createToaster, ToastRegion } from "kova-ui/components"
import { useEffect, useState } from "react"

function Example() {
  const [toast] = useState(() => createToaster())
  const [log, setLog] = useState("Nothing yet")
  useEffect(() => () => void toast.dismiss(), [toast])

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        color="secondary"
        variant="outline"
        onClick={() =>
          toast("Message archived", {
            description: "From Tendai Moyo",
            action: { label: "Undo", onAction: () => setLog("Message restored") },
            cancel: { label: "Dismiss", onCancel: () => setLog("Kept archived") },
            onDismiss: ({ reason }) => setLog((last) => `${last} · closed (${reason})`),
          })
        }
      >
        Archive message
      </Button>
      <p className="m-0 text-sm text-secondary" role="status">
        {log}
      </p>
      <ToastRegion toaster={toast} />
    </div>
  )
}

export { Example }
