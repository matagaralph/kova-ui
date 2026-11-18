import { Code, Comment, Play } from "@kova-ui/icons"
import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="code">
      <Tabs.List aria-label="Repository">
        <Tabs.Tab value="code">
          <Tabs.TabIcon>
            <Code />
          </Tabs.TabIcon>
          Code
        </Tabs.Tab>
        <Tabs.Tab value="issues" counter={24}>
          <Tabs.TabIcon>
            <Comment />
          </Tabs.TabIcon>
          Issues
        </Tabs.Tab>
        <Tabs.Tab value="actions">
          <Tabs.TabIcon>
            <Play />
          </Tabs.TabIcon>
          Actions
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="code" className="p-4 text-sm">
        48 files on the main branch, last changed an hour ago.
      </Tabs.Panel>
      <Tabs.Panel value="issues" className="p-4 text-sm">
        24 open issues, 3 of them assigned to you.
      </Tabs.Panel>
      <Tabs.Panel value="actions" className="p-4 text-sm">
        The last deploy finished in 2 minutes 14 seconds.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
