import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="open">
      <Tabs.List aria-label="Issues">
        <Tabs.Tab value="open" counter={24}>
          Open
        </Tabs.Tab>
        <Tabs.Tab value="closed" counter="1.2K">
          Closed
        </Tabs.Tab>
        <Tabs.Tab value="drafts" counter={0}>
          Drafts
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="open" className="p-4 text-sm">
        24 open issues, 3 of them assigned to you.
      </Tabs.Panel>
      <Tabs.Panel value="closed" className="p-4 text-sm">
        1,204 issues closed since the project started.
      </Tabs.Panel>
      <Tabs.Panel value="drafts" className="p-4 text-sm">
        No drafts. Issues you start but don't submit appear here.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
