import { Timeline } from "kova-ui/components"

const events = [
  {
    title: "Deployed to production",
    dateTime: "2026-11-10T14:32",
    time: "Today, 2:32 PM",
    description: "Version 2.4.1 is live in every region.",
  },
  {
    title: "Checks passed",
    dateTime: "2026-11-10T14:20",
    time: "Today, 2:20 PM",
    description: "312 tests and the bundle size budget.",
  },
  {
    title: "Pull request merged",
    dateTime: "2026-11-10T13:58",
    time: "Today, 1:58 PM",
    description: "Ada merged Cache search results into main.",
  },
  {
    title: "Review requested",
    dateTime: "2026-11-09T17:05",
    time: "Yesterday, 5:05 PM",
    description: "Grace and Linus were asked to review.",
  },
]

function Example() {
  return (
    <Timeline aria-label="Activity" className="w-80">
      {events.map((event) => (
        <Timeline.Item key={event.title}>
          <Timeline.Marker />
          <Timeline.Connector />
          <Timeline.Title>{event.title}</Timeline.Title>
          <Timeline.Time dateTime={event.dateTime}>{event.time}</Timeline.Time>
          <Timeline.Description>{event.description}</Timeline.Description>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export { Example }
