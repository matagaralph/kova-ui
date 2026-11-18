import { ArrowRight } from "@kova-ui/icons"
import { Button, LayerCard } from "kova-ui/components"

function Example() {
  return (
    <LayerCard className="w-80">
      <LayerCard.Secondary className="justify-between">
        Next steps
        <Button variant="ghost" color="secondary" size="sm" uniform aria-label="Go to next steps">
          <ArrowRight />
        </Button>
      </LayerCard.Secondary>
      <LayerCard.Primary>Invite your team and create your first project.</LayerCard.Primary>
    </LayerCard>
  )
}

export { Example }
