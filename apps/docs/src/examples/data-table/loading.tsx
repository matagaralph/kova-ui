import { Button, createColumnHelper, DataTable, Table } from "kova-ui/components"
import { useState } from "react"

type Deploy = { id: number; branch: string; status: string; duration: string }

const deploys: Deploy[] = [
  { id: 1, branch: "main", status: "Ready", duration: "1m 52s" },
  { id: 2, branch: "checkout-v2", status: "Ready", duration: "2m 14s" },
  { id: 3, branch: "fix-search", status: "Failed", duration: "48s" },
]

const column = createColumnHelper<Deploy>()

const columns = [
  column.column({ header: "Branch", field: "branch", rowHeader: true }),
  column.column({ header: "Status", field: "status" }),
  column.column({ header: "Duration", field: "duration", align: "end" }),
]

function Example() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Table.Container>
        <Table.Title as="h3" id="deploys-loading">
          Deploys
        </Table.Title>
        {loading ? (
          <Table.Skeleton aria-labelledby="deploys-loading" columns={columns} rows={3} />
        ) : (
          <DataTable aria-labelledby="deploys-loading" data={deploys} columns={columns} />
        )}
      </Table.Container>
      <div>
        <Button color="secondary" variant="outline" size="sm" onClick={() => setLoading(!loading)}>
          {loading ? "Show rows" : "Load again"}
        </Button>
      </div>
    </div>
  )
}

export { Example }
