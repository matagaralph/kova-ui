import { Button, Tabs } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="in-review" loadingCounters={loading}>
        <Tabs.List aria-label="Recordings">
          <Tabs.Tab value="in-review" counter={8}>
            In review
          </Tabs.Tab>
          <Tabs.Tab value="published" counter={312}>
            Published
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="in-review" className="p-4 text-sm">
          8 recordings are waiting for review.
        </Tabs.Panel>
        <Tabs.Panel value="published" className="p-4 text-sm">
          312 recordings published this year.
        </Tabs.Panel>
      </Tabs>
      <div>
        <Button variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show counts" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
