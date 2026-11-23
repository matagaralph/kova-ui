import { Plus } from "@kova-ui/icons"
import { Button, createColumnHelper, DataTable, Table } from "kova-ui/components"

type Contributor = { id: number; name: string; email: string; role: string }

const contributors: Contributor[] = [
  { id: 1, name: "Tendai Moyo", email: "tendai@example.com", role: "Lead reviewer" },
  { id: 2, name: "Rudo Ncube", email: "rudo@example.com", role: "Reviewer" },
  { id: 3, name: "Farai Mutasa", email: "farai@example.com", role: "Contributor" },
]

const column = createColumnHelper<Contributor>()

const columns = [
  column.column({ header: "Name", field: "name", rowHeader: true }),
  column.column({ header: "Email", field: "email" }),
  column.column({ header: "Role", field: "role", width: "auto" }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="contributors-actions">
        Contributors
      </Table.Title>
      <Table.Actions>
        <Button size="sm">
          <Plus />
          Invite
        </Button>
      </Table.Actions>
      <Table.Divider />
      <Table.Subtitle as="p" id="contributors-actions-subtitle">
        People who add and review entries in this collection.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="contributors-actions"
        aria-describedby="contributors-actions-subtitle"
        data={contributors}
        columns={columns}
      />
    </Table.Container>
  )
}

export { Example }
