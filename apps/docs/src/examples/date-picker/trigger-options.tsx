import { DatePicker } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker defaultValue="2026-10-16">
        <DatePicker.Trigger pill />
        <DatePicker.Content />
      </DatePicker>
      <DatePicker defaultValue="2026-10-16">
        <DatePicker.Trigger showIcon={false} dropdownIconType="chevronDown" />
        <DatePicker.Content />
      </DatePicker>
      <DatePicker>
        <DatePicker.Trigger block />
        <DatePicker.Content />
      </DatePicker>
    </div>
  )
}

export { Example }
