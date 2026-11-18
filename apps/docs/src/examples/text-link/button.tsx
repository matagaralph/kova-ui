import { TextLink } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-start gap-2 text-sm">
      <p>
        The deploy failed after 3 retries.{" "}
        <TextLink aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Hide details" : "Show details"}
        </TextLink>
      </p>
      {open && <pre className="text-xs text-secondary">Error: build step timed out after 600s</pre>}
    </div>
  )
}

export { Example }
