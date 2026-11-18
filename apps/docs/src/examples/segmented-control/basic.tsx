import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <SegmentedControl aria-label="View" defaultValue="list">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="list">List</SegmentedControl.Item>
      <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
      <SegmentedControl.Item value="timeline">Timeline</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export { Example }
