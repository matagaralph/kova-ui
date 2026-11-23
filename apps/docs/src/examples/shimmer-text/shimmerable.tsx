import { Button, ShimmerableText } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [searching, setSearching] = useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <div role="status">
        <ShimmerableText shimmer={searching} className="text-secondary">
          {searching ? "Searching the dictionary…" : "Found 24 entries"}
        </ShimmerableText>
      </div>
      <Button variant="outline" size="sm" onClick={() => setSearching(!searching)}>
        {searching ? "Finish" : "Search again"}
      </Button>
    </div>
  )
}

export { Example }
