import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <div className="w-80">
      <SegmentedControl aria-label="Theme" defaultValue="system" block>
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="light">Light</SegmentedControl.Item>
        <SegmentedControl.Item value="dark">Dark</SegmentedControl.Item>
        <SegmentedControl.Item value="system">System</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  )
}

export { Example }
