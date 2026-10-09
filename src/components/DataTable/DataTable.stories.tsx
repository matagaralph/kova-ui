import { type Meta } from "@storybook/react-vite"
import { useEffect, useId, useState } from "react"
import { Badge } from "../Badge/index.js"
import { Button } from "../Button/index.js"
import { EmptyMessage } from "../EmptyMessage/index.js"
import { DotsHorizontal, Download, Folder, Pencil, Plus, Trash } from "../Icon/index.js"
import { Menu } from "../Menu/index.js"
import {
  type Column,
  createColumnHelper,
  DataTable,
  type DataTableData,
  type DataTableRowGroup,
  Table,
} from "./index.js"

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DataTable>

export default meta

type Status = "active" | "paused" | "completed"

type Project = {
  id: number
  name: string
  client: string
  status: Status
  owner: { name: string }
  budget: number
  updatedAt: number
}

const CLIENTS = [
  "Northwind Studio",
  "Kijani Foods",
  "Harbor Health",
  "Atlas Logistics",
  "Lumen Bank",
]
const OWNERS = ["Amara Osei", "Kofi Mensah", "Lina Haddad", "Noah Banda", "Zara Moyo"]
const NAMES = [
  "Website redesign",
  "Mobile app",
  "Brand refresh",
  "Customer portal",
  "Checkout flow",
  "Analytics dashboard",
  "Onboarding emails",
  "Design system",
  "Booking system",
  "Loyalty program",
]
const STATUSES: Status[] = ["active", "paused", "completed"]
const DAY = 1000 * 60 * 60 * 24
const NOW = new Date("2026-09-30T09:00:00Z").getTime()

const allProjects: Project[] = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  name: `${NAMES[i % NAMES.length]}${i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : ""}`,
  client: CLIENTS[i % CLIENTS.length],
  status: STATUSES[(i * 7) % STATUSES.length],
  owner: { name: OWNERS[(i * 3) % OWNERS.length] },
  budget: 4000 + ((i * 7919) % 46) * 1000,
  updatedAt: NOW - DAY * ((i * 13) % 90),
}))

const projects = allProjects.slice(0, 8)

const dateFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
})
const currencyFormat = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const STATUS_COLORS = {
  active: "success",
  paused: "warning",
  completed: "secondary",
} as const

const formatStatus = (status: Status) => status[0].toUpperCase() + status.slice(1)

const StatusBadge = ({ status }: { status: Status }) => (
  <Badge color={STATUS_COLORS[status]} size="sm">
    {formatStatus(status)}
  </Badge>
)

const columnHelper = createColumnHelper<Project>()

const columns: Array<Column<Project>> = [
  columnHelper.column({
    header: "Project",
    field: "name",
    rowHeader: true,
  }),
  columnHelper.column({
    header: "Client",
    field: "client",
  }),
  columnHelper.column({
    header: "Status",
    field: "status",
    renderCell: (row) => formatStatus(row.status),
  }),
  columnHelper.column({
    header: "Owner",
    field: "owner.name",
  }),
  columnHelper.column({
    header: "Updated",
    field: "updatedAt",
    renderCell: (row) => dateFormat.format(row.updatedAt),
  }),
]

export const Base = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects">
      Projects
    </Table.Title>
    <Table.Subtitle as="p" id="projects-subtitle">
      Client work across the studio, updated daily.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="projects"
      aria-describedby="projects-subtitle"
      data={projects}
      columns={columns}
    />
  </Table.Container>
)

export const WithCustomCells = () => (
  <Table.Container>
    <Table.Title as="h2" id="custom-cells">
      Projects
    </Table.Title>
    <DataTable
      aria-labelledby="custom-cells"
      data={projects}
      columns={[
        columns[0],
        columns[1],
        {
          ...columns[2],
          renderCell: (row) => <StatusBadge status={row.status} />,
        },
        columns[4],
      ]}
    />
  </Table.Container>
)

export const WithTitle = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-title">
      Projects
    </Table.Title>
    <DataTable aria-labelledby="projects-title" data={projects} columns={columns} />
  </Table.Container>
)

export const WithCustomHeading = () => (
  <Table.Container>
    <Table.Title as="h3" id="projects-heading">
      Projects
    </Table.Title>
    <Table.Subtitle as="p" id="projects-heading-subtitle">
      The title renders as an h3 to fit the page's heading structure.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="projects-heading"
      aria-describedby="projects-heading-subtitle"
      data={projects}
      columns={columns}
    />
  </Table.Container>
)

// `initialSortColumn` expects the data to already be sorted by that column
const projectsByUpdated = projects.toSorted((a, b) => b.updatedAt - a.updatedAt)

export const WithSorting = () => (
  <Table.Container>
    <Table.Title as="h2" id="sorted-projects">
      Projects
    </Table.Title>
    <DataTable
      aria-labelledby="sorted-projects"
      data={projectsByUpdated}
      columns={[
        { ...columns[0], sortBy: "alphanumeric" },
        { ...columns[1], sortBy: true },
        columns[2],
        columns[3],
        { ...columns[4], sortBy: "datetime" },
      ]}
      initialSortColumn="updatedAt"
      initialSortDirection="DESC"
    />
  </Table.Container>
)

const STATUS_ORDER: Record<Status, number> = { active: 0, paused: 1, completed: 2 }

const projectsByStatus = projects.toSorted(
  (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
)

export const WithCustomSorting = () => (
  <Table.Container>
    <Table.Title as="h2" id="custom-sorted-projects">
      Projects
    </Table.Title>
    <Table.Subtitle as="p" id="custom-sorted-projects-subtitle">
      Status sorts by progress: active, then paused, then completed.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="custom-sorted-projects"
      aria-describedby="custom-sorted-projects-subtitle"
      data={projectsByStatus}
      columns={[
        columns[0],
        columns[1],
        {
          ...columns[2],
          sortBy: (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
        },
        columns[3],
        columns[4],
      ]}
      initialSortColumn="status"
    />
  </Table.Container>
)

export const WithSortEvents = () => {
  const [lastEvent, setLastEvent] = useState("Select a sortable column header")

  return (
    <Table.Container>
      <Table.Title as="h2" id="sort-events">
        Projects
      </Table.Title>
      <Table.Subtitle as="p" id="sort-events-subtitle">
        {lastEvent}
      </Table.Subtitle>
      <DataTable
        aria-labelledby="sort-events"
        aria-describedby="sort-events-subtitle"
        data={projects}
        columns={[
          { ...columns[0], sortBy: "alphanumeric" },
          columns[1],
          columns[2],
          columns[3],
          { ...columns[4], sortBy: "datetime" },
        ]}
        onToggleSort={(columnId, direction) => {
          setLastEvent(`Sorted by ${columnId}, ${direction === "ASC" ? "ascending" : "descending"}`)
        }}
      />
    </Table.Container>
  )
}

export const WithAction = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-action">
      Projects
    </Table.Title>
    <Table.Actions>
      <Button color="secondary" variant="outline" size="sm">
        <Download />
        Export
      </Button>
    </Table.Actions>
    <Table.Divider />
    <Table.Subtitle as="p" id="projects-action-subtitle">
      Client work across the studio, updated daily.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="projects-action"
      aria-describedby="projects-action-subtitle"
      data={projects}
      columns={columns}
    />
  </Table.Container>
)

export const WithActions = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-actions">
      Projects
    </Table.Title>
    <Table.Actions>
      <Button color="secondary" variant="outline" size="sm">
        <Download />
        Export
      </Button>
      <Button color="primary" size="sm">
        <Plus />
        New project
      </Button>
    </Table.Actions>
    <Table.Divider />
    <Table.Subtitle as="p" id="projects-actions-subtitle">
      Client work across the studio, updated daily.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="projects-actions"
      aria-describedby="projects-actions-subtitle"
      data={projects}
      columns={columns}
    />
  </Table.Container>
)

export const WithRowActions = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-row-actions">
      Projects
    </Table.Title>
    <DataTable
      aria-labelledby="projects-row-actions"
      data={projects}
      columns={[
        ...columns.slice(0, 3),
        {
          id: "actions",
          header: () => <span className="sr-only">Actions</span>,
          width: "auto",
          align: "end",
          renderCell: (row) => (
            <div className="flex gap-1">
              <Button
                color="secondary"
                variant="ghost"
                size="sm"
                uniform
                aria-label={`Edit ${row.name}`}
              >
                <Pencil />
              </Button>
              <Button
                color="danger"
                variant="ghost"
                size="sm"
                uniform
                aria-label={`Delete ${row.name}`}
              >
                <Trash />
              </Button>
            </div>
          ),
        },
      ]}
    />
  </Table.Container>
)

export const WithRowActionMenu = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-row-menu">
      Projects
    </Table.Title>
    <DataTable
      aria-labelledby="projects-row-menu"
      data={projects}
      columns={[
        ...columns.slice(0, 4),
        {
          id: "actions",
          header: () => <span className="sr-only">Actions</span>,
          width: "auto",
          align: "end",
          renderCell: (row) => (
            <Menu>
              <Menu.Trigger>
                <Button
                  color="secondary"
                  variant="ghost"
                  size="sm"
                  uniform
                  aria-label={`Actions for ${row.name}`}
                >
                  <DotsHorizontal />
                </Button>
              </Menu.Trigger>
              <Menu.Content align="end" minWidth={180}>
                <Menu.Item onSelect={() => {}}>
                  <Pencil /> Edit
                </Menu.Item>
                <Menu.Item onSelect={() => {}}>
                  <Folder /> Move to folder
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item onSelect={() => {}}>
                  <Trash /> Delete
                </Menu.Item>
              </Menu.Content>
            </Menu>
          ),
        },
      ]}
    />
  </Table.Container>
)

export const MixedColumnWidths = () => (
  <Table.Container>
    <Table.Title as="h2" id="column-widths">
      Projects
    </Table.Title>
    <Table.Subtitle as="p" id="column-widths-subtitle">
      Project grows, Client collapses, Status sizes to its content, and Updated is 140px wide.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="column-widths"
      aria-describedby="column-widths-subtitle"
      data={projects}
      columns={[
        { ...columns[0], width: "grow" },
        { ...columns[1], width: "growCollapse" },
        { ...columns[2], width: "auto" },
        { ...columns[4], width: 140 },
      ]}
    />
  </Table.Container>
)

export const WithRightAlignedColumns = () => (
  <Table.Container>
    <Table.Title as="h2" id="right-aligned">
      Budgets
    </Table.Title>
    <DataTable
      aria-labelledby="right-aligned"
      data={projects}
      columns={[
        columns[0],
        columns[1],
        {
          header: "Budget",
          field: "budget",
          align: "end",
          sortBy: true,
          renderCell: (row) => currencyFormat.format(row.budget),
        },
        { ...columns[4], align: "end" },
      ]}
    />
  </Table.Container>
)

type Invoice = {
  id: number
  number: string
  client: string
  paidAt: number | null
  notes: string | null
}

const invoices: Invoice[] = [
  { id: 1, number: "INV-1042", client: "Northwind Studio", paidAt: NOW - DAY * 3, notes: null },
  { id: 2, number: "INV-1043", client: "Kijani Foods", paidAt: null, notes: "Awaiting PO" },
  { id: 3, number: "INV-1044", client: "Harbor Health", paidAt: NOW - DAY * 12, notes: null },
  { id: 4, number: "INV-1045", client: "Atlas Logistics", paidAt: null, notes: null },
]

export const WithPlaceholderCells = () => (
  <Table.Container>
    <Table.Title as="h2" id="invoices">
      Invoices
    </Table.Title>
    <DataTable
      aria-labelledby="invoices"
      data={invoices}
      columns={[
        { header: "Invoice", field: "number", rowHeader: true },
        { header: "Client", field: "client" },
        {
          header: "Paid",
          field: "paidAt",
          renderCell: (row) =>
            row.paidAt ? (
              dateFormat.format(row.paidAt)
            ) : (
              <Table.CellPlaceholder>Not paid</Table.CellPlaceholder>
            ),
        },
        {
          header: "Notes",
          field: "notes",
          renderCell: (row) => row.notes ?? <Table.CellPlaceholder>None</Table.CellPlaceholder>,
        },
      ]}
    />
  </Table.Container>
)

export const WithNoContent = () => {
  const data: Project[] = []

  return data.length === 0 ? (
    <EmptyMessage>
      <EmptyMessage.Icon>
        <Folder />
      </EmptyMessage.Icon>
      <EmptyMessage.Title>No projects yet</EmptyMessage.Title>
      <EmptyMessage.Description>
        Projects you create or join will appear here.
      </EmptyMessage.Description>
      <EmptyMessage.ActionRow>
        <Button color="primary" size="md">
          <Plus />
          New project
        </Button>
      </EmptyMessage.ActionRow>
    </EmptyMessage>
  ) : (
    <DataTable data={data} columns={columns} />
  )
}

export const WithOverflow = () => (
  <div className="max-w-xl">
    <Table.Container>
      <Table.Title as="h2" id="overflow-projects">
        Projects
      </Table.Title>
      <Table.Subtitle as="p" id="overflow-projects-subtitle">
        When the columns don't fit, the table scrolls horizontally.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="overflow-projects"
        aria-describedby="overflow-projects-subtitle"
        data={projects}
        columns={[
          ...columns,
          {
            header: "Budget",
            field: "budget",
            align: "end",
            renderCell: (row) => currencyFormat.format(row.budget),
          },
        ]}
      />
    </Table.Container>
  </div>
)

export const WithLoading = () => (
  <Table.Container>
    <Table.Title as="h2" id="loading-projects">
      Projects
    </Table.Title>
    <Table.Subtitle as="p" id="loading-projects-subtitle">
      Client work across the studio, updated daily.
    </Table.Subtitle>
    <Table.Skeleton
      aria-labelledby="loading-projects"
      aria-describedby="loading-projects-subtitle"
      columns={columns}
      rows={8}
    />
  </Table.Container>
)

export const CellPadding = () => (
  <div className="grid gap-8">
    {(["condensed", "normal", "spacious"] as const).map((cellPadding) => (
      <Table.Container key={cellPadding}>
        <Table.Title as="h3" id={`padding-${cellPadding}`}>
          {cellPadding[0].toUpperCase() + cellPadding.slice(1)}
        </Table.Title>
        <DataTable
          aria-labelledby={`padding-${cellPadding}`}
          cellPadding={cellPadding}
          data={projects.slice(0, 3)}
          columns={columns}
        />
      </Table.Container>
    ))}
  </div>
)

export const WithPagination = () => {
  const pageSize = 10
  const [pageIndex, setPageIndex] = useState(0)
  const rows = allProjects.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  return (
    <Table.Container>
      <Table.Title as="h2" id="paginated-projects">
        Projects
      </Table.Title>
      <Table.Subtitle as="p" id="paginated-projects-subtitle">
        Client work across the studio, updated daily.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="paginated-projects"
        aria-describedby="paginated-projects-subtitle"
        data={rows}
        columns={columns}
      />
      <Table.Pagination
        aria-label="Pagination for projects"
        pageSize={pageSize}
        totalCount={allProjects.length}
        onChange={({ pageIndex: nextPageIndex }) => setPageIndex(nextPageIndex)}
      />
    </Table.Container>
  )
}

export const WithPaginationUsingDefaultPageIndex = () => {
  const pageSize = 10
  const [pageIndex, setPageIndex] = useState(5)
  const rows = allProjects.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  return (
    <Table.Container>
      <Table.Title as="h2" id="default-page-projects">
        Projects
      </Table.Title>
      <DataTable aria-labelledby="default-page-projects" data={rows} columns={columns} />
      <Table.Pagination
        aria-label="Pagination for projects"
        pageSize={pageSize}
        totalCount={allProjects.length}
        defaultPageIndex={5}
        onChange={({ pageIndex: nextPageIndex }) => setPageIndex(nextPageIndex)}
      />
    </Table.Container>
  )
}

export const WithNetworkError = () => {
  const pageSize = 10
  const [pageIndex, setPageIndex] = useState(0)
  const [state, setState] = useState<"ready" | "failing" | "error" | "retrying">("ready")
  const rows = allProjects.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  // Simulate a refresh that fails, then succeeds on retry
  useEffect(() => {
    if (state !== "failing" && state !== "retrying") return
    const timeout = setTimeout(() => setState(state === "failing" ? "error" : "ready"), 1200)
    return () => clearTimeout(timeout)
  }, [state])

  return (
    <Table.Container>
      <Table.Title as="h2" id="network-projects">
        Projects
      </Table.Title>
      <Table.Actions>
        <Button
          color="secondary"
          variant="outline"
          size="sm"
          disabled={state !== "ready"}
          onClick={() => setState("failing")}
        >
          Refresh
        </Button>
      </Table.Actions>
      <Table.Divider />
      <Table.Subtitle as="p" id="network-projects-subtitle">
        Refresh fails the first time. Retry to load the projects.
      </Table.Subtitle>
      {state === "ready" ? (
        <DataTable
          aria-labelledby="network-projects"
          aria-describedby="network-projects-subtitle"
          data={rows}
          columns={columns}
        />
      ) : (
        <Table.Skeleton aria-labelledby="network-projects" columns={columns} rows={pageSize} />
      )}
      {state === "error" ? (
        <Table.ErrorDialog onRetry={() => setState("retrying")} onDismiss={() => setState("ready")}>
          We couldn't load the projects. Check your connection and try again.
        </Table.ErrorDialog>
      ) : null}
      <Table.Pagination
        aria-label="Pagination for projects"
        pageSize={pageSize}
        totalCount={allProjects.length}
        onChange={({ pageIndex: nextPageIndex }) => setPageIndex(nextPageIndex)}
      />
    </Table.Container>
  )
}

const projectGroups: Array<DataTableRowGroup<Project>> = STATUSES.map((status) => ({
  groupId: status,
  label: status[0].toUpperCase() + status.slice(1),
  rows: projects.filter((project) => project.status === status),
}))

const groupedColumns: Array<Column<Project>> = [
  { ...columns[0], width: "growCollapse" },
  columns[1],
  { ...columns[4], width: "auto" },
]

export const WithGroups = () => (
  <Table.Container>
    <Table.Title as="h2" id="projects-by-status">
      Projects by status
    </Table.Title>
    <DataTable aria-labelledby="projects-by-status" data={projectGroups} columns={groupedColumns} />
  </Table.Container>
)

export const WithSortableGroups = () => (
  <Table.Container>
    <Table.Title as="h2" id="sortable-projects-by-status">
      Projects by status
    </Table.Title>
    <Table.Subtitle as="p" id="sortable-projects-by-status-subtitle">
      Sorting reorders the rows inside each group. The groups stay in place.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="sortable-projects-by-status"
      aria-describedby="sortable-projects-by-status-subtitle"
      data={projectGroups}
      columns={[
        { ...groupedColumns[0], sortBy: "alphanumeric" },
        groupedColumns[1],
        groupedColumns[2],
      ]}
    />
  </Table.Container>
)

type Member = { id: number; name: string; role: string }

const unassigned: Member = { id: 100, name: "Zara Moyo", role: "Contractor" }
const teamData: DataTableData<Member> = [
  {
    groupId: "design",
    label: "Design",
    rows: [
      { id: 1, name: "Amara Osei", role: "Lead designer" },
      { id: 2, name: "Lina Haddad", role: "Product designer" },
    ],
  },
  {
    groupId: "engineering",
    label: "Engineering",
    rows: [
      { id: 3, name: "Kofi Mensah", role: "Engineer" },
      { id: 4, name: "Noah Banda", role: "Engineer" },
    ],
  },
  unassigned,
]

export const WithMixedRowsAndGroups = () => {
  const titleId = useId()

  return (
    <Table.Container>
      <Table.Title as="h2" id={titleId}>
        Team
      </Table.Title>
      <DataTable
        aria-labelledby={titleId}
        data={teamData}
        columns={[
          { header: "Name", field: "name", rowHeader: true, sortBy: true },
          { header: "Role", field: "role" },
        ]}
      />
    </Table.Container>
  )
}

export const ComposedTable = () => (
  <Table.Container>
    <Table.Title as="h2" id="composed-table">
      Team
    </Table.Title>
    <Table aria-labelledby="composed-table" gridTemplateColumns="minmax(max-content, 1fr) auto">
      <Table.Head>
        <Table.Row>
          <Table.Header id="composed-name">Name</Table.Header>
          <Table.Header id="composed-role">Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Group id="design" label="Design" rowCount={2} colSpan={2}>
        <Table.Row>
          <Table.Cell scope="row" headers="composed-name">
            Amara Osei
          </Table.Cell>
          <Table.Cell headers="composed-role">Lead designer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell scope="row" headers="composed-name">
            Lina Haddad
          </Table.Cell>
          <Table.Cell headers="composed-role">Product designer</Table.Cell>
        </Table.Row>
      </Table.Group>
      <Table.Body>
        <Table.Row>
          <Table.Cell scope="row">Zara Moyo</Table.Cell>
          <Table.Cell>Contractor</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Table.Container>
)
