import { ScrollArea } from "kova-ui/components"

const collections = [
  { name: "Proverbs", count: 128 },
  { name: "Greetings", count: 24 },
  { name: "Family", count: 46 },
  { name: "Animals", count: 73 },
  { name: "Music", count: 31 },
  { name: "Places", count: 58 },
  { name: "Food", count: 40 },
  { name: "Nature", count: 87 },
]

function Example() {
  return (
    <ScrollArea type="auto" className="w-80">
      <ScrollArea.Viewport role="region" aria-label="Collections">
        <ScrollArea.Content>
          <ul className="flex gap-3 pb-4">
            {collections.map((collection) => (
              <li
                key={collection.name}
                className="w-32 shrink-0 rounded-lg border border-default p-3 text-sm"
              >
                <div className="font-medium">{collection.name}</div>
                <div className="text-secondary">{collection.count} words</div>
              </li>
            ))}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  )
}

export { Example }
