import { LayerCard } from "kova-ui/components"

function Example() {
  return (
    <LayerCard render={<a href="#getting-started" />} className="w-64">
      <LayerCard.Secondary>Getting started</LayerCard.Secondary>
      <LayerCard.Primary>Set up Kova UI in a new app in five minutes.</LayerCard.Primary>
    </LayerCard>
  )
}

export { Example }
