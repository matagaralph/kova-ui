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
      <SegmentedControl aria-label="Dialect" defaultValue="zezuru">
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="zezuru">Zezuru</SegmentedControl.Item>
        <SegmentedControl.Item value="karanga">Karanga</SegmentedControl.Item>
        <SegmentedControl.Item value="ndau" disabled>
          Ndau
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  )
}

export { Example }
