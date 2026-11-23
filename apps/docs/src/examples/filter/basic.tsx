import { Calendar, CheckCircle, Globe, Mic } from "@kova-ui/icons"
import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    icon: CheckCircle,
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "in-review", label: "In review" },
      { value: "published", label: "Published" },
    ],
  },
  {
    key: "dialect",
    displayName: "Dialect",
    icon: Globe,
    type: "select",
    allowsMultiple: true,
    options: [
      { value: "zezuru", label: "Zezuru" },
      { value: "karanga", label: "Karanga" },
      { value: "manyika", label: "Manyika" },
    ],
  },
  { key: "recordings", displayName: "Recordings", icon: Mic, type: "number", negatable: false },
  { key: "added", displayName: "Date added", icon: Calendar, type: "date" },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter entries"
        placeholder="Filter entries"
        providers={providers}
        initialFilterValue="status:in-review "
      />
    </div>
  )
}

export { Example }
