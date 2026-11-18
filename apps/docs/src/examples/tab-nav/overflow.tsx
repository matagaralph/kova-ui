import { TabNav } from "kova-ui/components"

const pages = [
  "Code",
  "Issues",
  "Pull requests",
  "Discussions",
  "Actions",
  "Projects",
  "Wiki",
  "Security",
  "Insights",
  "Settings",
]

function Example() {
  return (
    <div className="max-w-sm">
      <TabNav aria-label="Repository">
        {pages.map((page) => (
          <TabNav.Link
            key={page}
            href={`#${page.toLowerCase().replace(" ", "-")}`}
            current={page === "Settings"}
          >
            {page}
          </TabNav.Link>
        ))}
      </TabNav>
    </div>
  )
}

export { Example }
