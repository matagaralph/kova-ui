import { Button, Tree, createTreeController, type TreeItemData } from "kova-ui/components"
import { useState } from "react"

const regions: TreeItemData[] = [
  {
    value: "africa",
    label: "Africa",
    children: [
      {
        value: "zimbabwe",
        label: "Zimbabwe",
        children: [
          { value: "harare", label: "Harare" },
          { value: "bulawayo", label: "Bulawayo" },
          { value: "mutare", label: "Mutare" },
        ],
      },
      {
        value: "south-africa",
        label: "South Africa",
        children: [{ value: "johannesburg", label: "Johannesburg" }],
      },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [
      {
        value: "united-kingdom",
        label: "United Kingdom",
        children: [{ value: "london", label: "London" }],
      },
    ],
  },
]

function Example() {
  const [places] = useState(() => createTreeController())

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => places.expandAll()}>
          Expand all
        </Button>
        <Button variant="outline" size="sm" onClick={() => places.collapseAll()}>
          Collapse all
        </Button>
        <Button variant="outline" size="sm" onClick={() => places.reveal("mutare")}>
          Show Mutare
        </Button>
      </div>
      <Tree aria-label="Where contributors live" items={regions} controller={places} />
    </div>
  )
}

export { Example }
