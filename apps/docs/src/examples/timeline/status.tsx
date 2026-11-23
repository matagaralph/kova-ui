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
    value: "drafted",
    title: "Drafted",
    dateTime: "2026-11-01",
    time: "Nov 1",
    description: "Tendai Moyo wrote the entry for shumba.",
    status: "complete",
  },
  {
    value: "submitted",
    title: "Submitted",
    dateTime: "2026-11-02",
    time: "Nov 2",
    description: "Sent to the review queue.",
    status: "complete",
  },
  {
    value: "in-review",
    title: "In review",
    dateTime: "2026-11-03",
    time: "Nov 3",
    description: "Chipo Ncube is checking the meaning.",
    status: "current",
  },
  {
    value: "published",
    title: "Published",
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
      <Button variant="outline" size="sm" onClick={() => controller.focus("in-review")}>
        Go to Current Step
      </Button>
      <Timeline aria-label="Review status" controller={controller}>
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
