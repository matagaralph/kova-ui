import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  { key: "dialect", displayName: "Dialect", options: [{ value: "karanga" }, { value: "ndau" }] },
]

function Example() {
  return (
    <div className="max-w-2xl w-full">
      <Filter
        label="Filter entries"
        providers={providers}
        initialFilterValue="dialect:karanga"
        trailingVisual="4 results"
      />
    </div>
  )
}

export { Example }
