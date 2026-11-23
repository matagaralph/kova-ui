import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="in-review">
      <Tabs.List aria-label="Proverbs">
        <Tabs.Tab value="in-review" counter={24}>
          In review
        </Tabs.Tab>
        <Tabs.Tab value="published" counter="1.2K">
          Published
        </Tabs.Tab>
        <Tabs.Tab value="drafts" counter={0}>
          Drafts
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="in-review" className="p-4 text-sm">
        24 proverbs waiting for review, 3 of them assigned to you.
      </Tabs.Panel>
      <Tabs.Panel value="published" className="p-4 text-sm">
        1,204 proverbs published since the collection started.
      </Tabs.Panel>
      <Tabs.Panel value="drafts" className="p-4 text-sm">
        No drafts. Proverbs you start but don't submit appear here.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
