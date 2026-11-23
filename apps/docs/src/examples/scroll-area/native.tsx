import { ScrollArea } from "kova-ui/components"

const words = [
  { word: "ambuya", meaning: "grandmother" },
  { word: "amai", meaning: "mother" },
  { word: "baba", meaning: "father" },
  { word: "bhuku", meaning: "book" },
  { word: "chikoro", meaning: "school" },
  { word: "gomo", meaning: "mountain" },
  { word: "imba", meaning: "house" },
  { word: "mbira", meaning: "thumb piano" },
  { word: "moyo", meaning: "heart" },
  { word: "mufaro", meaning: "joy" },
  { word: "musha", meaning: "home, village" },
  { word: "mvura", meaning: "water" },
  { word: "mwana", meaning: "child" },
  { word: "mwedzi", meaning: "moon, month" },
  { word: "ngoma", meaning: "drum" },
  { word: "nyeredzi", meaning: "star" },
  { word: "nyika", meaning: "country, land" },
  { word: "nzou", meaning: "elephant" },
  { word: "rudo", meaning: "love" },
  { word: "rwiyo", meaning: "song" },
  { word: "rwizi", meaning: "river" },
  { word: "sadza", meaning: "thick maize porridge" },
  { word: "sekuru", meaning: "grandfather" },
  { word: "shiri", meaning: "bird" },
  { word: "shumba", meaning: "lion" },
  { word: "zuva", meaning: "sun, day" },
]

function Example() {
  return (
    <ScrollArea className="h-72 w-72 rounded-lg border border-default">
      <ScrollArea.Viewport role="region" aria-label="Words">
        <ScrollArea.Content>
          <ul className="divide-y divide-(--color-border)">
            {words.map(({ word, meaning }) => (
              <li key={word} className="flex justify-between gap-4 px-4 py-2 text-sm">
                <span className="font-medium">{word}</span>
                <span className="text-secondary">{meaning}</span>
              </li>
            ))}
          </ul>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
    </ScrollArea>
  )
}

export { Example }
