import { Button, TabNav } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="max-w-md flex w-full flex-col gap-3">
      <TabNav aria-label="Review queue" loadingCounters={loading}>
        <TabNav.Link href="#in-review" current counter={8}>
          In review
        </TabNav.Link>
        <TabNav.Link href="#published" counter={312}>
          Published
        </TabNav.Link>
        <TabNav.Link href="#needs-changes" counter={41}>
          Needs changes
        </TabNav.Link>
      </TabNav>
      <div>
        <Button variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show counts" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
