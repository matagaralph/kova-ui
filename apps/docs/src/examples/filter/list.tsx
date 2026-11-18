import { CheckCircle, Tag } from "@kova-ui/icons"
import { Filter, type FilterProvider, parseFilterQuery } from "kova-ui/components"
import { useMemo, useState } from "react"

const providers: FilterProvider[] = [
  {
    key: "status",
    displayName: "Status",
    icon: CheckCircle,
    type: "select",
    options: [
      { value: "todo", label: "To do" },
      { value: "done", label: "Done" },
    ],
  },
  {
    key: "label",
    displayName: "Label",
    icon: Tag,
    type: "select",
    allowsMultiple: true,
    options: [{ value: "design" }, { value: "frontend" }, { value: "backend" }],
  },
]

const tasks = [
  { id: 1, title: "Redesign onboarding", status: "todo", labels: ["design"] },
  { id: 2, title: "Fix session timeout", status: "todo", labels: ["backend"] },
  { id: 3, title: "Add dark mode toggle", status: "done", labels: ["frontend"] },
  { id: 4, title: "Audit color contrast", status: "todo", labels: ["design", "frontend"] },
]

function Example() {
  const [value, setValue] = useState("status:todo ")
  const query = useMemo(() => parseFilterQuery(value, providers), [value])
  const results = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.text.toLowerCase()) &&
      query.qualifiers.every(({ provider, values, negated }) => {
        if (!provider) return true
        const matched = values.some((v) =>
          provider.key === "status" ? task.status === v : task.labels.includes(v),
        )
        return negated ? !matched : matched
      }),
  )
  const filtered = value.trim() !== ""

  return (
    <div className="max-w-2xl flex w-full flex-col gap-3">
      <Filter label="Filter tasks" providers={providers} filterValue={value} onChange={setValue} />
      <div className="flex min-h-8 items-center justify-between gap-2">
        <p role="status" className="text-sm text-secondary">
          {results.length} {results.length === 1 ? "task" : "tasks"}
          {filtered && " match your filters"}
        </p>
        {filtered && <Filter.Revert onClick={() => setValue("")} />}
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {results.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export { Example }
