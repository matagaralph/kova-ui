import { ChevronDown } from "@kova-ui/icons"
import { AnimateLayout, Button, Timeline } from "kova-ui/components"
import { useId, useState } from "react"

const releases = [
  {
    title: "Version 2.4",
    dateTime: "2026-10-28",
    time: "October 28",
    description: "Faster search and resumable uploads.",
    changes: [
      "Search now matches file contents, not only names.",
      "Uploads resume after the connection drops.",
    ],
  },
  {
    title: "Version 2.3",
    dateTime: "2026-09-30",
    time: "September 30",
    description: "Shared links and a new sidebar.",
    changes: [
      "Shared links remember the folder they were opened from.",
      "The sidebar collapses to icons on narrow screens.",
    ],
  },
  {
    title: "Version 2.2",
    dateTime: "2026-08-26",
    time: "August 26",
    description: "Dark mode follows your system.",
    changes: ["Dark mode follows the system setting.", "Avatars are sharper."],
  },
]

function Changes({ changes }: { changes: string[] }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="mt-2">
      <Button
        color="secondary"
        variant="ghost"
        size="xs"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        What Changed
        <ChevronDown aria-hidden="true" className={open ? "rotate-180" : undefined} />
      </Button>
      <AnimateLayout>
        {open && (
          <ul key="changes" id={id} className="list-disc ps-5 pt-1 text-sm text-secondary">
            {changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        )}
      </AnimateLayout>
    </div>
  )
}

function Example() {
  return (
    <Timeline aria-label="Changelog" className="w-80">
      {releases.map((release) => (
        <Timeline.Item key={release.title}>
          <Timeline.Marker />
          <Timeline.Connector />
          <Timeline.Title>{release.title}</Timeline.Title>
          <Timeline.Time dateTime={release.dateTime}>{release.time}</Timeline.Time>
          <Timeline.Description>{release.description}</Timeline.Description>
          <Changes changes={release.changes} />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export { Example }
