import { TabNav } from "kova-ui/components"

const pages = [
  "Overview",
  "Activity",
  "Tasks",
  "Files",
  "Calendar",
  "Reports",
  "Members",
  "Billing",
  "Integrations",
  "Settings",
]

function Example() {
  return (
    <div className="max-w-sm">
      <TabNav aria-label="Project">
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
