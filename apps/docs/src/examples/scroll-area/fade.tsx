import { ScrollArea } from "kova-ui/components"

const proverbs = [
  {
    proverb: "Chara chimwe hachitswanyi inda.",
    meaning: "One thumb can't crush a louse: we need each other.",
  },
  {
    proverb: "Rina manyanga hariputirwi.",
    meaning: "What has horns can't be wrapped up: the truth comes out.",
  },
  { proverb: "Kugara hunzwana.", meaning: "Living together is understanding each other." },
  { proverb: "Mwana washe muranda kumwe.", meaning: "A chief's child is a servant elsewhere." },
]

function Example() {
  return (
    <ScrollArea fade className="h-56 w-80">
      <ScrollArea.Viewport role="region" aria-label="Proverbs">
        <ScrollArea.Content className="flex flex-col gap-6 py-2">
          {[...proverbs, ...proverbs].map((item, index) => (
            <article key={`${item.proverb}-${index}`}>
              <h3 className="font-medium">{item.proverb}</h3>
              <p className="text-sm text-secondary">{item.meaning}</p>
            </article>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  )
}

export { Example }
