import { LayerCard } from "kova-ui/components"

const cards = [
  { title: "Dictionary", body: "Look up any word." },
  { title: "Proverbs", body: "Sayings and their meanings." },
  { title: "Lessons", body: "Start with Mhoro." },
]

function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card) => (
        <LayerCard key={card.title} className="w-48">
          <LayerCard.Secondary>{card.title}</LayerCard.Secondary>
          <LayerCard.Primary>{card.body}</LayerCard.Primary>
        </LayerCard>
      ))}
    </div>
  )
}

export { Example }
