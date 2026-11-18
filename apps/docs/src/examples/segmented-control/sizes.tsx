import { SegmentedControl } from "kova-ui/components"

const sizes = ["xs", "sm", "md", "lg", "xl"] as const

function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <SegmentedControl key={size} aria-label={`Range, ${size}`} defaultValue="week" size={size}>
          <SegmentedControl.Indicator />
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  )
}

export { Example }
