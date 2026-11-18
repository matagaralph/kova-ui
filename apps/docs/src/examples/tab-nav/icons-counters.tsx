import { Chart, Code, Comment, Play } from "@kova-ui/icons"
import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Repository">
      <TabNav.Link href="#code" current>
        <TabNav.LinkIcon>
          <Code />
        </TabNav.LinkIcon>
        Code
      </TabNav.Link>
      <TabNav.Link href="#issues" counter={24}>
        <TabNav.LinkIcon>
          <Comment />
        </TabNav.LinkIcon>
        Issues
      </TabNav.Link>
      <TabNav.Link href="#actions" counter="1.2K">
        <TabNav.LinkIcon>
          <Play />
        </TabNav.LinkIcon>
        Actions
      </TabNav.Link>
      <TabNav.Link href="#insights">
        <TabNav.LinkIcon>
          <Chart />
        </TabNav.LinkIcon>
        Insights
      </TabNav.Link>
    </TabNav>
  )
}

export { Example }
