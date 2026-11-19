import { Button, TabNav } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <TabNav aria-label="Orders" loadingCounters={loading}>
        <TabNav.Link href="#open" current counter={8}>
          Open
        </TabNav.Link>
        <TabNav.Link href="#completed" counter={312}>
          Completed
        </TabNav.Link>
        <TabNav.Link href="#cancelled" counter={41}>
          Cancelled
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
