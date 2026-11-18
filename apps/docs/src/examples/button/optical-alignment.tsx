import { ArrowRight } from "@kova-ui/icons"
import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex w-80 flex-col gap-1">
      <h3 className="text-sm font-medium">Recent activity</h3>
      <p className="text-sm text-secondary">Three deploys finished in the last hour.</p>
      <div>
        <Button color="primary" variant="ghost" size="sm" opticallyAlign="start">
          View all
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export { Example }
