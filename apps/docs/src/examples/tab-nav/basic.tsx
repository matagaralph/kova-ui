import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Project">
      <TabNav.Link href="#overview" current>
        Overview
      </TabNav.Link>
      <TabNav.Link href="#activity">Activity</TabNav.Link>
      <TabNav.Link href="#members">Members</TabNav.Link>
      <TabNav.Link href="#settings">Settings</TabNav.Link>
    </TabNav>
  )
}

export { Example }
