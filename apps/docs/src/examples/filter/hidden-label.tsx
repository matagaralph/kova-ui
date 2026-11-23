import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  { key: "author", displayName: "Author" },
  { key: "dialect", displayName: "Dialect", allowsMultiple: true },
]

function Example() {
  return (
    <section className="max-w-2xl flex w-full flex-col gap-2">
      <h3 className="text-sm font-semibold">Stories</h3>
      <Filter
        label="Filter stories"
        visuallyHideLabel
        placeholder="Filter stories"
        providers={providers}
      />
    </section>
  )
}

export { Example }
