import { Grid, TextLonger } from "@kova-ui/icons"
import { SegmentedControl } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl aria-label="Layout" defaultValue="grid">
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="grid" aria-label="Grid">
          <Grid />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="list" aria-label="List">
          <TextLonger />
        </SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl aria-label="Layout with labels" defaultValue="grid">
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="grid">
          <Grid />
          Grid
        </SegmentedControl.Item>
        <SegmentedControl.Item value="list">
          <TextLonger />
          List
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  )
}

export { Example }
