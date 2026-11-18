import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="preview" activation="manual">
      <Tabs.List aria-label="Snippet">
        <Tabs.Tab value="preview">Preview</Tabs.Tab>
        <Tabs.Tab value="code">Code</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="preview" className="p-4 text-sm">
        Welcome back, Hollis. You have 3 unread messages.
      </Tabs.Panel>
      <Tabs.Panel value="code" className="p-4 font-mono text-sm">
        {'<Welcome name="Hollis" unread={3} />'}
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
