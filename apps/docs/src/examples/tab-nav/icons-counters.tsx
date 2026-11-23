import { BookOpen, Home, Quote, Translate } from "@kova-ui/icons"
import { TabNav } from "kova-ui/components"

function Example() {
  return (
    <TabNav aria-label="Library">
      <TabNav.Link href="#overview" current>
        <TabNav.LinkIcon>
          <Home />
        </TabNav.LinkIcon>
        Overview
      </TabNav.Link>
      <TabNav.Link href="#proverbs" counter={24}>
        <TabNav.LinkIcon>
          <Quote />
        </TabNav.LinkIcon>
        Proverbs
      </TabNav.Link>
      <TabNav.Link href="#words" counter="1.2K">
        <TabNav.LinkIcon>
          <Translate />
        </TabNav.LinkIcon>
        Words
      </TabNav.Link>
      <TabNav.Link href="#stories">
        <TabNav.LinkIcon>
          <BookOpen />
        </TabNav.LinkIcon>
        Stories
      </TabNav.Link>
    </TabNav>
  )
}

export { Example }
