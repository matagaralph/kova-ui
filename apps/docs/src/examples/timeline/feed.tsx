import { Button, Timeline } from "kova-ui/components"
import { useState } from "react"

const updates = [
  {
    id: 1,
    author: "Tendai",
    date: "2026-11-10",
    time: "Nov 10",
    text: "Recorded 12 words about the home.",
  },
  {
    id: 2,
    author: "Chipo",
    date: "2026-11-10",
    time: "Nov 10",
    text: "Reviewed every proverb in the queue.",
  },
  {
    id: 3,
    author: "Farai",
    date: "2026-11-09",
    time: "Nov 9",
    text: "Translated a folk story into English.",
  },
  {
    id: 4,
    author: "Rudo",
    date: "2026-11-09",
    time: "Nov 9",
    text: "Wrote the lesson on greetings.",
  },
  { id: 5, author: "Tendai", date: "2026-11-08", time: "Nov 8", text: "Added 20 bird names." },
  {
    id: 6,
    author: "Chipo",
    date: "2026-11-07",
    time: "Nov 7",
    text: "Added Karanga recordings for 30 words.",
  },
  {
    id: 7,
    author: "Farai",
    date: "2026-11-06",
    time: "Nov 6",
    text: "Fixed typos in the animal names.",
  },
  {
    id: 8,
    author: "Rudo",
    date: "2026-11-05",
    time: "Nov 5",
    text: "Reviewed the lesson on the months.",
  },
  {
    id: 9,
    author: "Tendai",
    date: "2026-11-04",
    time: "Nov 4",
    text: "Started a song collection.",
  },
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
        variant="outline"
        size="sm"
        disabled={count >= updates.length}
        loading={busy}
        onClick={loadMore}
      >
        Load More
      </Button>
      <Timeline feed busy={busy} aria-label="Contributor updates" className="w-full">
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
