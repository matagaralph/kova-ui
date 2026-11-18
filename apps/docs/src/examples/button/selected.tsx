import { Button } from "kova-ui/components"
import { useState } from "react"

const views = ["Board", "List", "Calendar"]

function Example() {
  const [view, setView] = useState("Board")

  return (
    <div className="flex gap-1">
      {views.map((name) => (
        <Button
          key={name}
          color="secondary"
          variant="ghost"
          size="sm"
          selected={view === name}
          aria-pressed={view === name}
          onClick={() => setView(name)}
        >
          {name}
        </Button>
      ))}
    </div>
  )
}

export { Example }
