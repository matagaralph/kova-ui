import { Button, createColumnHelper, DataTable, Table } from "kova-ui/components"
import { useState } from "react"

type Recording = { id: number; word: string; status: string; length: string }

const recordings: Recording[] = [
  { id: 1, word: "mbira", status: "Published", length: "0:02" },
  { id: 2, word: "ngoma", status: "Published", length: "0:02" },
  { id: 3, word: "nyeredzi", status: "Needs changes", length: "0:03" },
]

const column = createColumnHelper<Recording>()

const columns = [
  column.column({ header: "Word", field: "word", rowHeader: true }),
  column.column({ header: "Status", field: "status" }),
  column.column({ header: "Length", field: "length", align: "end" }),
]

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Table.Container>
        <Table.Title as="h3" id="recordings-loading">
          Recordings
        </Table.Title>
        {loading ? (
          <Table.Skeleton aria-labelledby="recordings-loading" columns={columns} rows={3} />
        ) : (
          <DataTable aria-labelledby="recordings-loading" data={recordings} columns={columns} />
        )}
      </Table.Container>
      <div>
        <Button variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show rows" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
