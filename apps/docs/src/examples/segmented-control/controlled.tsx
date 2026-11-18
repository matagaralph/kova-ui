import { SegmentedControl } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [range, setRange] = useState<string | null>("week")

  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl aria-label="Range" value={range} onValueChange={setRange}>
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      </SegmentedControl>
      <p className="text-sm text-secondary">Showing the last {range}.</p>
    </div>
  )
}

export { Example }
