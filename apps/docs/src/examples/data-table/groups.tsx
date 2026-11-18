import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Task = { id: number; title: string; assignee: string; due: string }

const column = createColumnHelper<Task>()

const columns = [
  column.column({ header: "Task", field: "title", rowHeader: true }),
  column.column({ header: "Assignee", field: "assignee" }),
  column.column({ header: "Due", field: "due", width: "auto" }),
]

const data = [
  {
    groupId: "in-progress",
    label: "In progress",
    rows: [
      { id: 1, title: "Write release notes", assignee: "Inès Moreau", due: "Nov 20" },
      { id: 2, title: "Fix search ranking", assignee: "Kofi Mensah", due: "Nov 22" },
    ],
  },
  {
    groupId: "todo",
    label: "To do",
    rows: [{ id: 3, title: "Plan Q1 roadmap", assignee: "Wren Takahashi", due: "Dec 1" }],
  },
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="tasks-groups">
        Tasks
      </Table.Title>
      <DataTable aria-labelledby="tasks-groups" data={data} columns={columns} />
    </Table.Container>
  )
}

export { Example }
