import { Button, ShimmerableText } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [searching, setSearching] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <div role="status">
        <ShimmerableText shimmer={searching} className="text-secondary">
          {searching ? "Searching the workspace…" : "Found 24 results"}
        </ShimmerableText>
      </div>
      <Button
        color="secondary"
        variant="outline"
        size="sm"
        onClick={() => setSearching(!searching)}
      >
        {searching ? "Finish" : "Search again"}
      </Button>
    </div>
  )
}

export { Example }
