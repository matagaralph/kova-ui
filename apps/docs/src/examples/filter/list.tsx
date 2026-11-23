import { CheckCircle, Globe } from "@kova-ui/icons"
import { Filter, type FilterProvider, parseFilterQuery } from "kova-ui/components"
import { useMemo, useState } from "react"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    icon: CheckCircle,
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
  {
    key: "dialect",
    displayName: "Dialect",
    icon: Globe,
    type: "select",
    allowsMultiple: true,
    options: [{ value: "zezuru" }, { value: "karanga" }, { value: "manyika" }],
  },
]

const entries = [
  { id: 1, title: "mbira: thumb piano", status: "draft", dialects: ["zezuru"] },
  { id: 2, title: "ngoma: drum", status: "draft", dialects: ["karanga"] },
  { id: 3, title: "rwiyo: song", status: "published", dialects: ["manyika"] },
  { id: 4, title: "musha: home, village", status: "draft", dialects: ["zezuru", "manyika"] },
]

function Example() {
  const [value, setValue] = useState("status:draft ")
  const query = useMemo(() => parseFilterQuery(value, providers), [value])
  const results = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(query.text.toLowerCase()) &&
      query.qualifiers.every(({ provider, values, negated }) => {
        if (!provider) return true
        const matched = values.some((v) =>
          provider.key === "status" ? entry.status === v : entry.dialects.includes(v),
        )
        return negated ? !matched : matched
      }),
  )
  const filtered = value.trim() !== ""

  return (
    <div className="max-w-2xl flex w-full flex-col gap-3">
      <Filter
        label="Filter entries"
        providers={providers}
        filterValue={value}
        onChange={setValue}
      />
      <div className="flex min-h-8 items-center justify-between gap-2">
        <p role="status" className="text-sm text-secondary">
          {results.length} {results.length === 1 ? "entry" : "entries"}
          {filtered && " match your filters"}
        </p>
        {filtered && <Filter.Revert onClick={() => setValue("")} />}
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {results.map((entry) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
    </div>
  )
}

export { Example }
