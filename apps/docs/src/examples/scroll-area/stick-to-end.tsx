import { ArrowDown } from "@kova-ui/icons"
import { Button, ScrollArea } from "kova-ui/components"
import { useState } from "react"

const replies = [
  "Mhoro! Is mvura the same in Karanga?",
  "Yes, mvura is water in every dialect I know.",
  "Ndatenda! I'll add a Karanga recording.",
  "Mazvita. I'll review it when it's in.",
]

const people = ["Tendai", "Rudo", "Farai", "Chipo"]

function Example() {
  const [comments, setComments] = useState(() =>
    Array.from({ length: 8 }, (_, index) => ({
      id: index,
      author: people[index % people.length],
      text: replies[index % replies.length],
    })),
  )

  return (
    <div className="flex w-80 flex-col gap-3">
      <ScrollArea stickToEnd className="h-64 rounded-lg border border-default">
        <ScrollArea.Viewport role="log" aria-label="Comments on mvura">
          <ScrollArea.Content>
            <ul className="flex flex-col gap-3 p-4 text-sm">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <span className="font-medium">{comment.author}</span>
                  <p className="text-secondary">{comment.text}</p>
                </li>
              ))}
            </ul>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.ScrollToEnd render={<Button variant="secondary" size="sm" pill />}>
          <ArrowDown />
          Latest
        </ScrollArea.ScrollToEnd>
      </ScrollArea>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setComments((current) => [
              ...current,
              {
                id: current.length,
                author: people[current.length % people.length],
                text: replies[current.length % replies.length],
              },
            ])
          }
        >
          Add a comment
        </Button>
      </div>
    </div>
  )
}

export { Example }
