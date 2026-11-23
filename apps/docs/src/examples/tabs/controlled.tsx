import { Tabs } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState<string | null>("drafts")

  return (
    <div className="flex flex-col gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List aria-label="Your entries">
          <Tabs.Tab value="drafts">Drafts</Tabs.Tab>
          <Tabs.Tab value="in-review">In review</Tabs.Tab>
          <Tabs.Tab value="published">Published</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="drafts" className="p-4 text-sm">
          2 drafts, the last one edited yesterday at 4:12 PM.
        </Tabs.Panel>
        <Tabs.Panel value="in-review" className="p-4 text-sm">
          3 entries waiting for Chipo Ncube and Farai Mutasa to review.
        </Tabs.Panel>
        <Tabs.Panel value="published" className="p-4 text-sm">
          12 entries published this week, with 9 recordings.
        </Tabs.Panel>
      </Tabs>
      <p className="text-sm text-secondary">Selected: {value}</p>
    </div>
  )
}

export { Example }
