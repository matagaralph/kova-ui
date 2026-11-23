import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Entry = { id: number; headword: string; meaning: string; contributor: string; lookups: number }

const entries: Entry[] = [
  { id: 1, headword: "mvura", meaning: "water", contributor: "Tendai Moyo", lookups: 48210 },
  {
    id: 2,
    headword: "sadza",
    meaning: "thick maize porridge",
    contributor: "Rudo Ncube",
    lookups: 32560,
  },
  { id: 3, headword: "shumba", meaning: "lion", contributor: "Farai Mutasa", lookups: 21090 },
  { id: 4, headword: "rwiyo", meaning: "song", contributor: "Chipo Chikore", lookups: 7640 },
]

const column = createColumnHelper<Entry>()

const columns = [
  column.column({ header: "Headword", field: "headword", rowHeader: true }),
  column.column({ header: "Meaning", field: "meaning" }),
  column.column({ header: "Contributor", field: "contributor" }),
  column.column({
    header: "Lookups",
    field: "lookups",
    align: "end",
    renderCell: (row) => row.lookups.toLocaleString("en-US"),
  }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="entries-basic">
        Dictionary entries
      </Table.Title>
      <DataTable aria-labelledby="entries-basic" data={entries} columns={columns} />
    </Table.Container>
  )
}

export { Example }
