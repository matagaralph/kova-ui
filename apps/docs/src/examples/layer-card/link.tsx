import { LayerCard } from "kova-ui/components"

function Example() {
  return (
    <LayerCard render={<a href="#word-of-the-day" />} className="w-64">
      <LayerCard.Secondary>Word of the day</LayerCard.Secondary>
      <LayerCard.Primary>Rwiyo means song. Hear how it's said.</LayerCard.Primary>
    </LayerCard>
  )
}

export { Example }
