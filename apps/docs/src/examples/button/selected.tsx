import { Button } from "kova-ui/components"
import { useState } from "react"

const sections = ["Dictionary", "Proverbs", "Stories"]

function Example() {
  const [section, setSection] = useState("Dictionary")

  return (
    <div className="flex gap-1">
      {sections.map((name) => (
        <Button
          key={name}
          variant="ghost"
          size="sm"
          selected={section === name}
          aria-pressed={section === name}
          onClick={() => setSection(name)}
        >
          {name}
        </Button>
      ))}
    </div>
  )
}

export { Example }
