import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <SegmentedControl aria-label="Language" defaultValue="shona" pill gutterSize="lg">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="shona">Shona</SegmentedControl.Item>
      <SegmentedControl.Item value="english">English</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export { Example }
