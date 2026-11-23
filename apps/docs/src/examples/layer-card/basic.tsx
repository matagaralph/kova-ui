import { ArrowRight } from "@kova-ui/icons"
import { Button, LayerCard } from "kova-ui/components"

function Example() {
  return (
    <LayerCard className="w-80">
      <LayerCard.Secondary className="justify-between">
        Next steps
        <Button variant="ghost" size="sm" uniform aria-label="Go to next steps">
          <ArrowRight />
        </Button>
      </LayerCard.Secondary>
      <LayerCard.Primary>Record how you say mvura, and add an example sentence.</LayerCard.Primary>
    </LayerCard>
  )
}

export { Example }
