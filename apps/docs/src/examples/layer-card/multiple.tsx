import { LayerCard } from "kova-ui/components"

const cards = [
  { title: "Components", body: "Browse every component." },
  { title: "Examples", body: "Copy working code." },
  { title: "Tokens", body: "Colors, spacing and type." },
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
