import { TabNav } from "kova-ui/components"

const pages = [
  "Overview",
  "Dictionary",
  "Proverbs",
  "Stories",
  "Lessons",
  "Recordings",
  "Dialects",
  "Contributors",
  "Reviews",
  "Settings",
]

function Example() {
  return (
    <div className="max-w-sm">
      <TabNav aria-label="AmaShona">
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
