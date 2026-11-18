import { Calendar, type CalendarValue } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState<CalendarValue>("2026-10-16")

  return (
    <div className="flex flex-col items-start gap-3">
      <Calendar value={value} onValueChange={setValue} />
      <p className="text-sm text-secondary">Selected: {String(value ?? "none")}</p>
    </div>
  )
}

export { Example }
