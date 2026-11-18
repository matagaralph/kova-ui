import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl aria-label="Theme" defaultValue="system" disabled>
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
        <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
        <SegmentedControl.Item value="system">System</SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl aria-label="Billing period" defaultValue="monthly">
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
        <SegmentedControl.Item value="yearly">Yearly</SegmentedControl.Item>
        <SegmentedControl.Item value="lifetime" disabled>
          Lifetime
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  )
}

export { Example }
