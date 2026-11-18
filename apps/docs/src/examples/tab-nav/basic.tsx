import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Repository">
      <TabNav.Link href="#code" current>
        Code
      </TabNav.Link>
      <TabNav.Link href="#issues">Issues</TabNav.Link>
      <TabNav.Link href="#pull-requests">Pull requests</TabNav.Link>
      <TabNav.Link href="#settings">Settings</TabNav.Link>
    </TabNav>
  )
}

export { Example }
