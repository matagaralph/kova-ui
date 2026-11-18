import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <DatePicker mode="range" months={2} defaultValue={["2026-10-12", "2026-10-16"]}>
      <DatePicker.Input aria-label="Check in" placeholder="Check in" />
      <span className="text-secondary">–</span>
      <DatePicker.Input end aria-label="Check out" placeholder="Check out" />
      <DatePicker.Trigger uniform variant="ghost" />
      <DatePicker.Content />
    </DatePicker>
  )
}

export { Example }
