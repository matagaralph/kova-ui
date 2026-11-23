import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Word">
      <TabNav.Link href="#meaning" current>
        Meaning
      </TabNav.Link>
      <TabNav.Link href="#recordings">Recordings</TabNav.Link>
      <TabNav.Link href="#contributors">Contributors</TabNav.Link>
      <TabNav.Link href="#history">History</TabNav.Link>
    </TabNav>
  )
}

export { Example }
