import { createColumnHelper, DataTable, Table } from "kova-ui/components"

type Project = { id: number; name: string; client: string; owner: string; budget: number }

const projects: Project[] = [
  { id: 1, name: "Harbor redesign", client: "Northwind", owner: "Inès Moreau", budget: 48000 },
  { id: 2, name: "Checkout flow", client: "Contoso", owner: "Kofi Mensah", budget: 32500 },
  { id: 3, name: "Brand refresh", client: "Fabrikam", owner: "Wren Takahashi", budget: 21000 },
  { id: 4, name: "Mobile app", client: "Tailspin", owner: "Hollis Grant", budget: 76000 },
]

const column = createColumnHelper<Project>()

const columns = [
  column.column({ header: "Project", field: "name", rowHeader: true }),
  column.column({ header: "Client", field: "client" }),
  column.column({ header: "Owner", field: "owner" }),
  column.column({
    header: "Budget",
    field: "budget",
    align: "end",
    renderCell: (row) => `$${row.budget.toLocaleString("en-US")}`,
  }),
]

function Example() {
  return (
    <Table.Container>
      <Table.Title as="h3" id="projects-basic">
        Projects
      </Table.Title>
      <DataTable aria-labelledby="projects-basic" data={projects} columns={columns} />
    </Table.Container>
  )
}

export { Example }
