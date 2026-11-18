import { Select } from "kova-ui/components"
import { useState } from "react"

const intervals = [
  { value: "day", label: "Last 24 hours" },
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "Last 30 days" },
]

function Example() {
  const [interval, setInterval] = useState<string | null>("week")

  return (
    <div className="flex flex-col items-start gap-3">
      <Select value={interval} onValueChange={setInterval} items={intervals}>
        <Select.Trigger variant="ghost" aria-label="Interval" />
        <Select.Content>
          {intervals.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <p className="text-sm text-secondary">Showing data for: {interval ?? "nothing"}</p>
    </div>
  )
}

export { Example }
