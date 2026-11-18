import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker defaultValue="2026-10-16">
      <DatePicker.Input aria-label="Due date" />
      <DatePicker.Clear />
      <DatePicker.Trigger uniform variant="ghost" />
      <DatePicker.Hint>{(state) => `Like ${state.example}`}</DatePicker.Hint>
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
