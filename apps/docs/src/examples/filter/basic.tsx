import { Calendar, CheckCircle, Flag, Tag } from "@kova-ui/icons"
import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    icon: CheckCircle,
    type: "select",
    options: [
      { value: "todo", label: "To do" },
      { value: "in-progress", label: "In progress" },
      { value: "done", label: "Done" },
    ],
  },
  {
    key: "label",
    displayName: "Label",
    icon: Tag,
    type: "select",
    allowsMultiple: true,
    options: [
      { value: "design", description: "Visual and UX work" },
      { value: "frontend", description: "Web app" },
      { value: "backend", description: "APIs and data" },
    ],
  },
  { key: "priority", displayName: "Priority", icon: Flag, type: "number", negatable: false },
  { key: "due", displayName: "Due date", icon: Calendar, type: "date" },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter tasks"
        placeholder="Filter tasks"
        providers={providers}
        initialFilterValue="status:in-progress "
      />
    </div>
  )
}

export { Example }
