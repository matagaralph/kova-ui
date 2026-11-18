import { Button, Tooltip } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip>
        <Tooltip.Trigger render={<Button color="secondary" variant="outline" />}>
          Compact
        </Tooltip.Trigger>
        <Tooltip.Content compact>Copy link</Tooltip.Content>
      </Tooltip>
      {(["sm", "md", "lg"] as const).map((gutterSize) => (
        <Tooltip key={gutterSize}>
          <Tooltip.Trigger render={<Button color="secondary" variant="outline" />}>
            Gutter {gutterSize}
          </Tooltip.Trigger>
          <Tooltip.Content gutterSize={gutterSize}>
            Usage resets on the first day of each month.
          </Tooltip.Content>
        </Tooltip>
      ))}
      <Tooltip>
        <Tooltip.Trigger render={<Button color="secondary" variant="outline" />}>
          One line
        </Tooltip.Trigger>
        <Tooltip.Content maxWidth="none">
          This tooltip stays on a single line, however long it is.
        </Tooltip.Content>
      </Tooltip>
    </div>
  )
}

export { Example }
