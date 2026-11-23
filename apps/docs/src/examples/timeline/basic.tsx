import { Timeline } from "kova-ui/components"

const events = [
  {
    title: "Published",
    dateTime: "2026-11-10T14:32",
    time: "Today, 2:32 PM",
    description: "mvura is live in the dictionary, with two recordings.",
  },
  {
    title: "Review approved",
    dateTime: "2026-11-10T14:20",
    time: "Today, 2:20 PM",
    description: "Chipo checked the meaning and both recordings.",
  },
  {
    title: "Recording added",
    dateTime: "2026-11-10T13:58",
    time: "Today, 1:58 PM",
    description: "Tendai recorded the Zezuru pronunciation.",
  },
  {
    title: "Review requested",
    dateTime: "2026-11-09T17:05",
    time: "Yesterday, 5:05 PM",
    description: "Farai and Nyasha were asked to review.",
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
