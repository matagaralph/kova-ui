import { Analytics, Folder, Home, Tasks } from "@kova-ui/icons"
import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Project">
      <TabNav.Link href="#overview" current>
        <TabNav.LinkIcon>
          <Home />
        </TabNav.LinkIcon>
        Overview
      </TabNav.Link>
      <TabNav.Link href="#tasks" counter={24}>
        <TabNav.LinkIcon>
          <Tasks />
        </TabNav.LinkIcon>
        Tasks
      </TabNav.Link>
      <TabNav.Link href="#files" counter="1.2K">
        <TabNav.LinkIcon>
          <Folder />
        </TabNav.LinkIcon>
        Files
      </TabNav.Link>
      <TabNav.Link href="#reports">
        <TabNav.LinkIcon>
          <Analytics />
        </TabNav.LinkIcon>
        Reports
      </TabNav.Link>
    </TabNav>
  )
}

export { Example }
