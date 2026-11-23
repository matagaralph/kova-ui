import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="meaning">
      <Tabs.List aria-label="Word">
        <Tabs.Tab value="meaning">Meaning</Tabs.Tab>
        <Tabs.Tab value="recordings">Recordings</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="meaning" className="p-4 text-sm">
        mvura, noun. Water.
      </Tabs.Panel>
      <Tabs.Panel value="recordings" className="p-4 text-sm">
        Tendai Moyo recorded it in Zezuru, and Chipo Ncube in Karanga.
      </Tabs.Panel>
      <Tabs.Panel value="history" className="p-4 text-sm">
        Added by Farai Mutasa, and reviewed by Nyasha Gumbo last week.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
