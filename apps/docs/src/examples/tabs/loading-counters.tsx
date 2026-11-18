import { Button, Tabs } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="open" loadingCounters={loading}>
        <Tabs.List aria-label="Pull requests">
          <Tabs.Tab value="open" counter={8}>
            Open
          </Tabs.Tab>
          <Tabs.Tab value="merged" counter={312}>
            Merged
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="open" className="p-4 text-sm">
          8 pull requests are waiting for review.
        </Tabs.Panel>
        <Tabs.Panel value="merged" className="p-4 text-sm">
          312 pull requests merged this year.
        </Tabs.Panel>
      </Tabs>
      <div>
        <Button color="secondary" variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show counts" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
