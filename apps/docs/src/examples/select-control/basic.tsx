import { Calendar } from "@kova-ui/icons"
import { Button, Popover, SelectControl } from "kova-ui/components"
import { useState } from "react"

const ranges = ["Today", "Last 7 days", "Last 30 days"]

function Example() {
  const [range, setRange] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <div className="w-64">
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          render={<SelectControl block StartIcon={Calendar} placeholder={!range} />}
          aria-label="Date range"
        >
          {range ?? "Pick a range"}
        </Popover.Trigger>
        <Popover.Content side="bottom" align="start" className="w-(--anchor-width) min-w-0 p-2">
          <Popover.Title className="px-2 pt-1">Date range</Popover.Title>
          <div className="mt-1 flex flex-col">
            {ranges.map((option) => (
              <Button
                key={option}
                color="secondary"
                variant="ghost"
                size="sm"
                block
                className="justify-start"
                onClick={() => {
                  setRange(option)
                  setOpen(false)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  )
}

export { Example }
