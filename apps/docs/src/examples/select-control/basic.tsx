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
        <Popover.Content side="bottom" align="start" sideOffset={5}>
          <Popover.Title>Date range</Popover.Title>
          <div className="mt-2 flex flex-col items-start gap-1">
            {ranges.map((option) => (
              <Button
                key={option}
                variant="ghost"
                size="sm"
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
