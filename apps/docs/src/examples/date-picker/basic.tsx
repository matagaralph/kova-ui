import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker defaultValue="2026-10-16">
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
