import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List aria-label="Project">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview" className="p-4 text-sm">
        The launch is on track for Friday, with 4 of 6 tasks done.
      </Tabs.Panel>
      <Tabs.Panel value="activity" className="p-4 text-sm">
        Inès Moreau deployed to production and Kofi Mensah left a review.
      </Tabs.Panel>
      <Tabs.Panel value="settings" className="p-4 text-sm">
        Rename the project, transfer it to another team or archive it.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
