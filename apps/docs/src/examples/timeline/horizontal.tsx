import { Timeline } from "kova-ui/components"

const milestones = [
  { title: "Kickoff", dateTime: "2026-01", time: "January" },
  { title: "Design review", dateTime: "2026-03", time: "March" },
  { title: "Beta", dateTime: "2026-06", time: "June" },
  { title: "Launch", dateTime: "2026-09", time: "September" },
]

function Example() {
  return (
    <Timeline
      orientation="horizontal"
      loop={false}
      aria-label="Roadmap"
      className="max-w-lg w-full"
    >
      {milestones.map((milestone) => (
        <Timeline.Item key={milestone.title}>
          <Timeline.Marker />
          <Timeline.Connector />
          <Timeline.Title>{milestone.title}</Timeline.Title>
          <Timeline.Time dateTime={milestone.dateTime}>{milestone.time}</Timeline.Time>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export { Example }
