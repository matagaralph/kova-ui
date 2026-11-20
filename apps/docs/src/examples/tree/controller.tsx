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
      { value: "kenya", label: "Kenya", children: [{ value: "nairobi", label: "Nairobi" }] },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [
      { value: "portugal", label: "Portugal", children: [{ value: "lisbon", label: "Lisbon" }] },
    ],
  },
]

function Example() {
  const [offices] = useState(() => createTreeController())

  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button color="secondary" variant="outline" size="sm" onClick={() => offices.expandAll()}>
          Expand all
        </Button>
        <Button color="secondary" variant="outline" size="sm" onClick={() => offices.collapseAll()}>
          Collapse all
        </Button>
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          onClick={() => offices.reveal("mutare")}
        >
          Show Mutare
        </Button>
      </div>
      <Tree aria-label="Offices" items={regions} controller={offices} />
    </div>
  )
}

export { Example }
