import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker
      defaultValue="2026-10-16"
      min="2026-10-05"
      max="2026-11-20"
      unavailable={[{ weekday: [0, 6] }]}
    >
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
