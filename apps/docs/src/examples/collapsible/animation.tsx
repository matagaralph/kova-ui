import { Collapsible } from "kova-ui/components"
import { useState } from "react"

const changes = [
  "Search now matches meanings, not only headwords.",
  "Recordings show the speaker's dialect.",
  "Drafts save while you type.",
]

function Example() {
  const [status, setStatus] = useState("Closed")

  return (
    <div className="flex w-80 flex-col gap-4">
      <Collapsible
        onOpenChange={(open) => setStatus(open ? "Opening…" : "Closing…")}
        onOpenChangeComplete={(open) => setStatus(open ? "Finished opening" : "Finished closing")}
      >
        <Collapsible.Trigger>What's new in the dictionary</Collapsible.Trigger>
        <Collapsible.Panel>
          <ul>
            {changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </Collapsible.Panel>
      </Collapsible>
      <p className="text-sm text-secondary">{status}</p>
    </div>
  )
}

export { Example }
