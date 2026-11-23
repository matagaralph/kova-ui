import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="general" orientation="vertical">
      <Tabs.List aria-label="Preferences">
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="learning">Learning</Tabs.Tab>
        <Tabs.Tab value="security">Security</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="general" className="text-sm">
        Choose your language, time zone and the page you start on.
      </Tabs.Panel>
      <Tabs.Panel value="learning" className="text-sm">
        Choose a dialect, like Zezuru or Karanga, and when your word of the day arrives.
      </Tabs.Panel>
      <Tabs.Panel value="security" className="text-sm">
        Manage passkeys, signed-in sessions and recovery codes.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
