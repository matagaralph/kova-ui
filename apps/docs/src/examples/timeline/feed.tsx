import { Button, Timeline } from "kova-ui/components"
import { useState } from "react"

const updates = [
  {
    id: 1,
    author: "Ada",
    date: "2026-11-10",
    time: "Nov 10",
    text: "Shipped the new onboarding flow.",
  },
  {
    id: 2,
    author: "Grace",
    date: "2026-11-10",
    time: "Nov 10",
    text: "Fixed the flaky upload test.",
  },
  {
    id: 3,
    author: "Linus",
    date: "2026-11-09",
    time: "Nov 9",
    text: "Moved the docs to the new theme.",
  },
  {
    id: 4,
    author: "Margaret",
    date: "2026-11-09",
    time: "Nov 9",
    text: "Wrote the launch checklist.",
  },
  { id: 5, author: "Ada", date: "2026-11-08", time: "Nov 8", text: "Cut search latency in half." },
  {
    id: 6,
    author: "Grace",
    date: "2026-11-07",
    time: "Nov 7",
    text: "Added keyboard shortcuts to the editor.",
  },
  {
    id: 7,
    author: "Linus",
    date: "2026-11-06",
    time: "Nov 6",
    text: "Cleaned up the old billing code.",
  },
  {
    id: 8,
    author: "Margaret",
    date: "2026-11-05",
    time: "Nov 5",
    text: "Ran the accessibility review.",
  },
  { id: 9, author: "Ada", date: "2026-11-04", time: "Nov 4", text: "Started the mobile layout." },
]

const pageSize = 3

function Example() {
  const [count, setCount] = useState(pageSize)
  const [busy, setBusy] = useState(false)

  function loadMore() {
    setBusy(true)
    setTimeout(() => {
      setCount((shown) => shown + pageSize)
      setBusy(false)
    }, 600)
  }

  return (
    <div className="flex w-80 flex-col items-start gap-6">
      <Button
        color="secondary"
        variant="outline"
        size="sm"
        disabled={count >= updates.length}
        loading={busy}
        onClick={loadMore}
      >
        Load More
      </Button>
      <Timeline feed busy={busy} aria-label="Team updates" className="w-full">
        {updates.slice(0, count).map((update) => (
          <Timeline.Item key={update.id}>
            <Timeline.Marker />
            <Timeline.Connector />
            <Timeline.Title>{update.author}</Timeline.Title>
            <Timeline.Time dateTime={update.date}>{update.time}</Timeline.Time>
            <Timeline.Description>{update.text}</Timeline.Description>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export { Example }
