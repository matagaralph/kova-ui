import { BookOpen, Comment, Headphones } from "@kova-ui/icons"
import { Tabs } from "kova-ui/components"

function Example() {
  return (
    <Tabs defaultValue="read">
      <Tabs.List aria-label="Story">
        <Tabs.Tab value="read">
          <Tabs.TabIcon>
            <BookOpen />
          </Tabs.TabIcon>
          Read
        </Tabs.Tab>
        <Tabs.Tab value="comments" counter={24}>
          <Tabs.TabIcon>
            <Comment />
          </Tabs.TabIcon>
          Comments
        </Tabs.Tab>
        <Tabs.Tab value="listen">
          <Tabs.TabIcon>
            <Headphones />
          </Tabs.TabIcon>
          Listen
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="read" className="p-4 text-sm">
        The story in 12 short parts, with the English beside the Shona.
      </Tabs.Panel>
      <Tabs.Panel value="comments" className="p-4 text-sm">
        24 comments, 3 of them waiting for your reply.
      </Tabs.Panel>
      <Tabs.Panel value="listen" className="p-4 text-sm">
        Told by Tafadzwa Marufu, 14 minutes long.
      </Tabs.Panel>
    </Tabs>
  )
}

export { Example }
