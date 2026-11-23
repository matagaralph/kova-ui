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
        Mhoro, Tendai. You have 3 words to review.
      </Tabs.Panel>
      <Tabs.Panel value="code" className="p-4 font-mono text-sm">
        {'<Welcome name="Tendai" toReview={3} />'}
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
