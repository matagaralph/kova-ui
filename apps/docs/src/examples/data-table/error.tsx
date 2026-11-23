import { Button, TableErrorDialog } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [state, setState] = useState<"ready" | "error" | "retrying">("ready")

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button variant="outline" onClick={() => setState("error")}>
          Refresh entries
        </Button>
      </div>
      <p className="text-sm text-secondary">
        {state === "retrying" ? "Retrying…" : "Press Refresh to see a failed load."}
      </p>
      <TableErrorDialog
        open={state === "error"}
        title="Couldn't load entries"
        onRetry={() => setState("retrying")}
        onDismiss={() => setState("ready")}
      >
        The server took too long to respond. Check your connection and try again.
      </TableErrorDialog>
    </div>
  )
}

export { Example }
