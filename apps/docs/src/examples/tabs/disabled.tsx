import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List aria-label="Dashboard">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab value="reports" disabled>
          Reports
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview" className="p-4 text-sm">
        Revenue, visitors and sign-ups for the last 30 days.
      </Tabs.Panel>
      <Tabs.Panel value="analytics" className="p-4 text-sm">
        Where your visitors come from and the pages they read most.
      </Tabs.Panel>
      <Tabs.Panel value="reports" className="p-4 text-sm">
        Monthly reports are available on the Pro plan.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
