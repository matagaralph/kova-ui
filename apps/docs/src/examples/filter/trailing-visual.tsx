import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  { key: "label", displayName: "Label", options: [{ value: "urgent" }, { value: "design" }] },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter tasks"
        providers={providers}
        initialFilterValue="label:urgent"
        trailingVisual="4 results"
      />
    </div>
  )
}

export { Example }
