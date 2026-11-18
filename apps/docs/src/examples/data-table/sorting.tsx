import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Release = { id: number; version: string; author: string; downloads: number; date: Date }

const releases: Release[] = [
  {
    id: 1,
    version: "v2.10.0",
    author: "Inès Moreau",
    downloads: 18420,
    date: new Date(2026, 9, 2),
  },
  { id: 2, version: "v2.9.1", author: "Kofi Mensah", downloads: 9012, date: new Date(2026, 7, 21) },
  {
    id: 3,
    version: "v2.9.0",
    author: "Wren Takahashi",
    downloads: 24750,
    date: new Date(2026, 6, 30),
  },
  {
    id: 4,
    version: "v2.8.0",
    author: "Hollis Grant",
    downloads: 31008,
    date: new Date(2026, 4, 12),
  },
]

const column = createColumnHelper<Release>()

const columns = [
  column.column({ header: "Version", field: "version", rowHeader: true, sortBy: "alphanumeric" }),
  column.column({ header: "Author", field: "author", sortBy: true }),
  column.column({
    header: "Downloads",
    field: "downloads",
    align: "end",
    sortBy: true,
    renderCell: (row) => row.downloads.toLocaleString("en-US"),
  }),
  column.column({
    header: "Released",
    field: "date",
    sortBy: "datetime",
    renderCell: (row) => row.date.toLocaleDateString("en-US", { dateStyle: "medium" }),
  }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="releases-sorting">
        Releases
      </Table.Title>
      <DataTable
        aria-labelledby="releases-sorting"
        data={releases}
        columns={columns}
        initialSortColumn="date"
        initialSortDirection="DESC"
      />
    </Table.Container>
  )
}

export { Example }
