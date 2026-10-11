import { Calendar, CheckCircle, Flag, Search, Tag, User } from "@kova-ui/icons"
import { type Meta } from "@storybook/react-vite"
import { useMemo, useState } from "react"
import { Badge } from "../Badge/index.js"
import { Blankslate } from "../Blankslate/index.js"
import { Filter, type FilterProvider, type FilterQuery, parseFilterQuery } from "./index.js"

const meta = {
  title: "Components/Filter",
  component: Filter,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    providers: { control: false },
    trailingVisual: { control: false },
    customParser: { control: false },
    context: { control: false },
    inputRef: { control: false },
  },
} satisfies Meta<typeof Filter>

export default meta

const people = ["alex", "jordan", "morgan", "riley", "sam", "taylor"]

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
      { value: "urgent", description: "Needs attention today" },
    ],
  },
  {
    key: "assignee",
    displayName: "Assignee",
    icon: User,
    aliases: ["owner"],
    getSuggestions: (query) =>
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              people
                .filter((name) => name.includes(query.toLowerCase()))
                .map((value) => ({ value })),
            ),
          600,
        )
      }),
  },
  { key: "priority", displayName: "Priority", icon: Flag, type: "number", negatable: false },
  { key: "due", displayName: "Due date", icon: Calendar, type: "date" },
]

export const Base = (args: Partial<React.ComponentProps<typeof Filter>>) => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      placeholder="Filter tasks"
      providers={providers}
      initialFilterValue="status:in-progress "
      {...args}
    />
  </div>
)

export const InputOnly = () => (
  <div className="max-w-2xl">
    <Filter label="Filter tasks" placeholder="Filter tasks" variant="input" providers={providers} />
  </div>
)

export const ButtonOnly = () => (
  <Filter
    label="Filter tasks"
    variant="button"
    providers={providers}
    initialFilterValue="status:todo label:design"
  />
)

export const CompactButton = () => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      placeholder="Filter tasks"
      filterButtonVariant="compact"
      providers={providers}
    />
  </div>
)

export const VisuallyHiddenLabel = () => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      visuallyHideLabel
      placeholder="Filter tasks"
      providers={providers}
    />
  </div>
)

export const MultipleValues = () => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      providers={providers}
      initialFilterValue="label:design,frontend "
    />
  </div>
)

export const AsyncSuggestions = () => (
  <div className="max-w-2xl">
    <Filter label="Filter tasks" providers={providers} initialFilterValue="assignee:sam" />
  </div>
)

export const Validation = () => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      providers={providers}
      initialFilterValue="status:archived priority:high"
    />
  </div>
)

export const TrailingVisual = () => (
  <div className="max-w-2xl">
    <Filter
      label="Filter tasks"
      providers={providers}
      initialFilterValue="label:urgent"
      trailingVisual="4 results"
    />
  </div>
)

type Task = {
  id: number
  title: string
  status: string
  labels: string[]
  assignee: string
  priority: number
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Redesign onboarding",
    status: "in-progress",
    labels: ["design"],
    assignee: "alex",
    priority: 1,
  },
  {
    id: 2,
    title: "Fix session timeout",
    status: "todo",
    labels: ["backend", "urgent"],
    assignee: "sam",
    priority: 1,
  },
  {
    id: 3,
    title: "Add dark mode toggle",
    status: "done",
    labels: ["frontend"],
    assignee: "riley",
    priority: 3,
  },
  {
    id: 4,
    title: "Audit color contrast",
    status: "todo",
    labels: ["design", "frontend"],
    assignee: "morgan",
    priority: 2,
  },
  {
    id: 5,
    title: "Paginate invoices API",
    status: "in-progress",
    labels: ["backend"],
    assignee: "jordan",
    priority: 2,
  },
  {
    id: 6,
    title: "Update empty states",
    status: "todo",
    labels: ["design"],
    assignee: "taylor",
    priority: 3,
  },
]

const compare = (actual: number, value: string) => {
  const range = value.split("..")
  if (range.length === 2) return actual >= Number(range[0]) && actual <= Number(range[1])
  const [, operator = "", number] = /^(>=|<=|>|<)?(.*)$/.exec(value) ?? []
  const target = Number(number)
  if (operator === ">") return actual > target
  if (operator === "<") return actual < target
  if (operator === ">=") return actual >= target
  if (operator === "<=") return actual <= target
  return actual === target
}

const matchesQuery = (task: Task, query: FilterQuery) =>
  query.qualifiers.every(({ provider, values, negated }) => {
    if (!provider) return true
    const matched = values.filter(Boolean).some((value) => {
      if (provider.key === "status") return task.status === value
      if (provider.key === "label") return task.labels.includes(value)
      if (provider.key === "assignee") return task.assignee === value
      if (provider.key === "priority") return compare(task.priority, value)
      return true
    })
    return negated ? !matched : matched
  }) && task.title.toLowerCase().includes(query.text.toLowerCase())

export const FilteringAList = () => {
  const [value, setValue] = useState("status:todo ")
  const query = useMemo(() => parseFilterQuery(value, providers), [value])
  const results = tasks.filter((task) => matchesQuery(task, query))
  const isFiltered = value.trim() !== ""

  return (
    <div className="max-w-2xl flex flex-col gap-4">
      <Filter
        label="Filter tasks"
        placeholder="Filter tasks"
        providers={providers}
        filterValue={value}
        onChange={setValue}
      />
      <div className="flex min-h-8 items-center justify-between gap-2">
        <p role="status" className="text-sm text-secondary">
          {results.length} {results.length === 1 ? "task" : "tasks"}
          {isFiltered && " match your filters"}
        </p>
        {isFiltered && <Filter.Revert onClick={() => setValue("")} />}
      </div>
      {results.length > 0 ? (
        <ul className="rounded-md border border-default">
          {results.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-3 border-b border-subtle px-4 py-3 last:border-b-0"
            >
              <span className="text-sm">{task.title}</span>
              <span className="flex gap-1">
                {task.labels.map((label) => (
                  <Badge key={label} color="secondary">
                    {label}
                  </Badge>
                ))}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Blankslate>
          <Blankslate.Icon>
            <Search />
          </Blankslate.Icon>
          <Blankslate.Title>No tasks match {value.trim()}</Blankslate.Title>
          <Blankslate.Description>
            Try removing a filter or changing its value.
          </Blankslate.Description>
        </Blankslate>
      )}
    </div>
  )
}
