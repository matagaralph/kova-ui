import { Tabs } from "kova-ui/components"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState<string | null>("inbox")

  return (
    <div className="flex flex-col gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List aria-label="Mail">
          <Tabs.Tab value="inbox">Inbox</Tabs.Tab>
          <Tabs.Tab value="drafts">Drafts</Tabs.Tab>
          <Tabs.Tab value="sent">Sent</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="inbox" className="p-4 text-sm">
          3 unread messages from Hollis Grant and Inès Moreau.
        </Tabs.Panel>
        <Tabs.Panel value="drafts" className="p-4 text-sm">
          2 drafts, the last one edited yesterday at 4:12 PM.
        </Tabs.Panel>
        <Tabs.Panel value="sent" className="p-4 text-sm">
          12 messages sent this week, all delivered.
        </Tabs.Panel>
      </Tabs>
      <p className="text-sm text-secondary">Selected: {value}</p>
    </div>
  )
}

export { Example }
