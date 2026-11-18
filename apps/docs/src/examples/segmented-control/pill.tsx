import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <SegmentedControl aria-label="Billing period" defaultValue="monthly" pill gutterSize="lg">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="monthly">Monthly</SegmentedControl.Item>
      <SegmentedControl.Item value="yearly">Yearly</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export { Example }
