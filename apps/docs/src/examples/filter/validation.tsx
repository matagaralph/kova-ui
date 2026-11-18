import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    type: "select",
    options: [{ value: "todo" }, { value: "done" }],
  },
  { key: "priority", displayName: "Priority", type: "number", negatable: false },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="status:archived priority:high"
      />
    </div>
  )
}

export { Example }
