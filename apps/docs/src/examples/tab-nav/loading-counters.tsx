import { Button, TabNav } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <TabNav aria-label="Pull requests" loadingCounters={loading}>
        <TabNav.Link href="#open" current counter={8}>
          Open
        </TabNav.Link>
        <TabNav.Link href="#merged" counter={312}>
          Merged
        </TabNav.Link>
        <TabNav.Link href="#closed" counter={41}>
          Closed
        </TabNav.Link>
      </TabNav>
      <div>
        <Button color="secondary" variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show counts" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
