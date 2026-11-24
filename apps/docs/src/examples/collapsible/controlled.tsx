import { Button, Collapsible, createCollapsibleController } from "kova-ui/components"
import { useState } from "react"

const greetings = ["Mangwanani", "Masikati", "Manheru"]

function Example() {
  const [collapsible] = useState(createCollapsibleController)
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<string | null>(null)

  return (
    <div className="flex w-80 flex-col gap-4">
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => collapsible.toggle()}
      >
        Toggle
      </Button>
      <Collapsible
        open={open}
        onOpenChange={(next, details) => {
          setOpen(next)
          setReason(`${next ? "Opened" : "Closed"} by ${details.reason}`)
        }}
        controller={collapsible}
      >
        <Collapsible.Trigger>Greetings by time of day</Collapsible.Trigger>
        <Collapsible.Panel>
          <ul>
            {greetings.map((greeting) => (
              <li key={greeting}>{greeting}</li>
            ))}
          </ul>
          <Button
            variant="secondary"
            size="sm"
            className="self-start"
            onClick={() => collapsible.close()}
          >
            Done
          </Button>
        </Collapsible.Panel>
      </Collapsible>
      <p className="text-sm text-secondary">{reason ?? "Closed"}</p>
    </div>
  )
}

export { Example }
