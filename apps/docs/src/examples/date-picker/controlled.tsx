import { DatePicker, type DatePickerValue } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState<DatePickerValue>("2026-10-16")

  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker value={value} onValueChange={setValue}>
        <DatePicker.Trigger />
        <DatePicker.Content />
      </DatePicker>
      <p className="text-sm text-secondary">Value: {value ?? "none"}</p>
    </div>
  )
}

export { Example }
