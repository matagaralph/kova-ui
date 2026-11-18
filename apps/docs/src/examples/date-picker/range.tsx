import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker mode="range" months={2} defaultValue={["2026-10-12", "2026-10-16"]}>
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
