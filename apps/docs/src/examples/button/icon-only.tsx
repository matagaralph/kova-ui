import { Volume } from "@kova-ui/icons"
import { Button } from "kova-ui/components"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" uniform aria-label="Play pronunciation">
        <Volume />
      </Button>
      <Button variant="secondary" uniform pill aria-label="Play pronunciation">
        <Volume />
      </Button>
    </div>
  )
}

export { Example }
