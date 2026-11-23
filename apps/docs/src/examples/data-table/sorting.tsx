import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Lesson = { id: number; lesson: string; author: string; learners: number; date: Date }

const lessons: Lesson[] = [
  {
    id: 1,
    lesson: "Lesson 12",
    author: "Chipo Mutasa",
    learners: 18420,
    date: new Date(2026, 9, 2),
  },
  {
    id: 2,
    lesson: "Lesson 11",
    author: "Farai Ncube",
    learners: 9012,
    date: new Date(2026, 7, 21),
  },
  {
    id: 3,
    lesson: "Lesson 10",
    author: "Rumbidzai Chikore",
    learners: 24750,
    date: new Date(2026, 6, 30),
  },
  {
    id: 4,
    lesson: "Lesson 9",
    author: "Tinashe Sibanda",
    learners: 31008,
    date: new Date(2026, 4, 12),
  },
]

const column = createColumnHelper<Lesson>()

const columns = [
  column.column({ header: "Lesson", field: "lesson", rowHeader: true, sortBy: "alphanumeric" }),
  column.column({ header: "Author", field: "author", sortBy: true }),
  column.column({
    header: "Learners",
    field: "learners",
    align: "end",
    sortBy: true,
    renderCell: (row) => row.learners.toLocaleString("en-US"),
  }),
  column.column({
    header: "Published",
    field: "date",
    sortBy: "datetime",
    renderCell: (row) => row.date.toLocaleDateString("en-US", { dateStyle: "medium" }),
  }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="lessons-sorting">
        Lessons
      </Table.Title>
      <DataTable
        aria-labelledby="lessons-sorting"
        data={lessons}
        columns={columns}
        initialSortColumn="date"
        initialSortDirection="DESC"
      />
    </Table.Container>
  )
}

export { Example }
