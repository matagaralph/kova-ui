import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    type: "select",
    options: [{ value: "draft" }, { value: "published" }],
  },
  { key: "recordings", displayName: "Recordings", type: "number", negatable: false },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter entries"
        providers={providers}
        initialFilterValue="status:archived recordings:many"
      />
    </div>
  )
}

export { Example }
