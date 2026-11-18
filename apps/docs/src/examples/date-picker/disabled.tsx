import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker disabled defaultValue="2026-10-16">
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
