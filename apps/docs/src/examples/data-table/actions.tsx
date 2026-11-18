import { Plus } from "@kova-ui/icons"
import { Button, createColumnHelper, DataTable, Table } from "kova-ui/components"

type Member = { id: number; name: string; email: string; role: string }

const members: Member[] = [
  { id: 1, name: "Inès Moreau", email: "ines@example.com", role: "Owner" },
  { id: 2, name: "Kofi Mensah", email: "kofi@example.com", role: "Admin" },
  { id: 3, name: "Wren Takahashi", email: "wren@example.com", role: "Member" },
]

const column = createColumnHelper<Member>()

const columns = [
  column.column({ header: "Name", field: "name", rowHeader: true }),
  column.column({ header: "Email", field: "email" }),
  column.column({ header: "Role", field: "role", width: "auto" }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="members-actions">
        Members
      </Table.Title>
      <Table.Actions>
        <Button color="primary" size="sm">
          <Plus />
          Invite
        </Button>
      </Table.Actions>
      <Table.Divider />
      <Table.Subtitle as="p" id="members-actions-subtitle">
        People with access to this workspace.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="members-actions"
        aria-describedby="members-actions-subtitle"
        data={members}
        columns={columns}
      />
    </Table.Container>
  )
}

export { Example }
