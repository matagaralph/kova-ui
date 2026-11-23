import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <SegmentedControl aria-label="Browse" defaultValue="words">
      <SegmentedControl.Indicator />
      <SegmentedControl.Item value="words">Words</SegmentedControl.Item>
      <SegmentedControl.Item value="proverbs">Proverbs</SegmentedControl.Item>
      <SegmentedControl.Item value="stories">Stories</SegmentedControl.Item>
    </SegmentedControl>
  )
}

export { Example }
