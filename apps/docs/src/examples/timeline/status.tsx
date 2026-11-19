import { Check } from "@kova-ui/icons"
import { Button, createTimelineController, Timeline, type TimelineStatus } from "kova-ui/components"
import { useState } from "react"

const steps: {
  value: string
  title: string
  dateTime: string
  time: string
  description: string
  status: TimelineStatus
}[] = [
  {
    value: "placed",
    title: "Order placed",
    dateTime: "2026-11-01",
    time: "Nov 1",
    description: "We received your order.",
    status: "complete",
  },
  {
    value: "packed",
    title: "Packed",
    dateTime: "2026-11-02",
    time: "Nov 2",
    description: "Your items left the shelf.",
    status: "complete",
  },
  {
    value: "shipped",
    title: "Shipped",
    dateTime: "2026-11-03",
    time: "Nov 3",
    description: "On its way with the carrier.",
    status: "current",
  },
  {
    value: "delivered",
    title: "Delivered",
    dateTime: "2026-11-05",
    time: "Nov 5",
    description: "Expected by Thursday.",
    status: "upcoming",
  },
]

function Example() {
  const [controller] = useState(() => createTimelineController())

  return (
    <div className="flex w-80 flex-col items-start gap-6">
      <Button
        color="secondary"
        variant="outline"
        size="sm"
        onClick={() => controller.focus("shipped")}
      >
        Go to Current Step
      </Button>
      <Timeline aria-label="Order status" controller={controller}>
        {steps.map((step) => (
          <Timeline.Item key={step.value} value={step.value} status={step.status}>
            <Timeline.Marker>
              {step.status === "complete" && <Check aria-hidden="true" />}
            </Timeline.Marker>
            <Timeline.Connector />
            <Timeline.Title>{step.title}</Timeline.Title>
            <Timeline.Time dateTime={step.dateTime}>{step.time}</Timeline.Time>
            <Timeline.Description>{step.description}</Timeline.Description>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export { Example }
