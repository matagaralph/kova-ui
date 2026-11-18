import { Filter, type FilterProvider } from "kova-ui/components"

const providers: FilterProvider[] = [
  { key: "author", displayName: "Author" },
  { key: "tag", displayName: "Tag", allowsMultiple: true },
]

function Example() {
  return (
    <section className="max-w-2xl flex w-full flex-col gap-2">
      <h3 className="text-sm font-semibold">Articles</h3>
      <Filter
        label="Filter articles"
        visuallyHideLabel
        placeholder="Filter articles"
        providers={providers}
      />
    </section>
  )
}

export { Example }
