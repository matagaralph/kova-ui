// Ported from Primer React's DataTable tests.

import { lazy } from "react"
import { describe, expect, it } from "vite-plus/test"
import type { Column } from "./column.js"
import { DataTable, type DataTableProps } from "./DataTable.js"
import type { DataTableRowGroup } from "./row.js"
import { useTable } from "./useTable.js"

interface Repository {
  id: number
  name: string
}

const columns: Array<Column<Repository>> = [
  {
    header: "Repository",
    field: "name",
  },
]

const groups: Array<DataTableRowGroup<Repository>> = [
  {
    groupId: "public",
    label: "Public",
    rows: [{ id: 1, name: "primer/react" }],
  },
]

const LazyDataTable = lazy(async () => ({
  default: (await import("./index.js")).DataTable,
})) as typeof DataTable

export function shouldAcceptLazyDataTable() {
  const flat = <LazyDataTable data={[{ id: 1, name: "primer/react" }]} columns={columns} />
  const grouped = <LazyDataTable data={groups} columns={columns} />
  const mixed = (
    <LazyDataTable data={[{ id: 2, name: "primer/css" }, ...groups]} columns={columns} />
  )
  const explicit = <LazyDataTable<Repository> data={groups} columns={columns} />
  const props: DataTableProps<Repository> = { data: groups, columns }
  const spread = <LazyDataTable {...props} />
  return { flat, grouped, mixed, explicit, spread }
}

export function shouldInferLazyDataTableRows() {
  return (
    <LazyDataTable
      data={[
        { id: 1, name: "Standalone", owner: { login: "primer" } },
        {
          groupId: "public",
          label: "Public",
          rows: [{ id: 2, name: "primer/react", owner: { login: "primer" } }],
        },
      ]}
      columns={[
        { header: "Name", field: "name", renderCell: (row) => row.name.toUpperCase() },
        { header: "Owner", field: "owner.login", renderCell: (row) => row.owner.login },
      ]}
      getRowId={(row) => row.id}
    />
  )
}

export function shouldRejectInvalidLazyDataTableProps() {
  const invalidField = (
    // @ts-expect-error Column fields must refer to row data, not group metadata.
    <LazyDataTable<Repository> data={groups} columns={[{ header: "Group", field: "groupId" }]} />
  )
  const invalidRow = (
    // @ts-expect-error Group members must have the required row fields.
    <LazyDataTable<Repository> data={[{ ...groups[0], rows: [{ id: 3 }] }]} columns={columns} />
  )
  const nestedGroups = (
    // @ts-expect-error Nested groups are not supported.
    <LazyDataTable<Repository> data={[{ ...groups[0], rows: groups }]} columns={columns} />
  )
  return { invalidField, invalidRow, nestedGroups }
}

export function shouldAcceptGroupedDataTableProps() {
  const props: DataTableProps<Repository> = {
    columns,
    data: groups,
  }

  return <DataTable {...props} />
}

export function shouldAcceptExplicitRowType() {
  return <DataTable<Repository> data={groups} columns={columns} />
}

export function shouldInferRowTypeFromInlineGroups() {
  return (
    <DataTable
      data={[
        {
          groupId: "public",
          label: "Public",
          rows: [{ id: 1, name: "primer/react" }],
        },
      ]}
      columns={[
        {
          header: "Repository",
          field: "name",
        },
      ]}
    />
  )
}

export function shouldAcceptMixedData() {
  const mixed = [{ id: 2, name: "primer/css" }, ...groups]
  const props: DataTableProps<Repository> = {
    columns,
    data: mixed,
  }
  const explicit = <DataTable<Repository> data={mixed} columns={columns} />
  const inferred = <DataTable data={mixed} columns={columns} />
  const spread = <DataTable {...props} />
  return { props, explicit, inferred, spread }
}

export function useTableModelTypeChecks() {
  useTable({ data: [{ id: 2, name: "primer/css" }, ...groups], columns, getRowId: (row) => row.id })
  const table = useTable({ data: groups, columns, getRowId: (row) => row.id })
  const item = table.bodies[0]
  if (item.type === "row-group") {
    const name: string = item.rows[0].getValue().name
    // @ts-expect-error Group models are not member row models.
    item.getCells()
    return name
  }
  const name: string = item.rows[0].getValue().name
  // @ts-expect-error Ungrouped bodies do not have group labels.
  void item.label
  return name
}

export function shouldInferInlineMixedData() {
  return (
    <DataTable
      data={[
        { id: 1, name: "Standalone", owner: { login: "primer" } },
        {
          groupId: "public",
          label: "Public",
          rows: [{ id: 2, name: "primer/react", owner: { login: "primer" } }],
        },
      ]}
      columns={[
        { header: "Name", field: "name", renderCell: (row) => row.name.toUpperCase() },
        { header: "Owner", field: "owner.login", renderCell: (row) => row.owner.login },
      ]}
      getRowId={(row) => row.id}
    />
  )
}

export function shouldRejectInvalidData() {
  const invalidProps: DataTableProps<Repository> = {
    columns,
    // @ts-expect-error Group members must have the required row fields.
    data: [{ ...groups[0], rows: [{ id: 3 }] }],
  }
  const nestedGroups: DataTableProps<Repository> = {
    columns,
    // @ts-expect-error Nested groups are not supported.
    data: [{ ...groups[0], rows: groups }],
  }
  const invalidColumns: DataTableProps<Repository> = {
    data: [{ id: 2, name: "Standalone" }, ...groups],
    // @ts-expect-error Column fields must refer to row data, not group metadata.
    columns: [{ header: "Group", field: "groupId" }],
  }
  return { invalidProps, nestedGroups, invalidColumns }
}

export function shouldPreserveBusinessTypeInference() {
  const data = [
    { id: 1, type: "repository", name: "Standalone" },
    {
      id: "extra-group-id",
      type: "business-group",
      groupId: "public",
      label: "Public",
      rows: [{ id: 2, type: "repository", name: "primer/react" }],
    },
  ]
  return (
    <DataTable
      data={data}
      columns={[
        { header: "Type", field: "type", renderCell: (row) => row.type.toUpperCase() },
        { header: "Name", field: "name", renderCell: (row) => row.name.toUpperCase() },
      ]}
      getRowId={(row) => {
        const id: number = row.id
        return id
      }}
    />
  )
}

// These checks run through `tsc`. The test only confirms the module loads.
describe("DataTable types", () => {
  it("type-checks DataTable props", () => {
    expect(typeof shouldAcceptLazyDataTable).toBe("function")
    expect(typeof shouldInferLazyDataTableRows).toBe("function")
    expect(typeof shouldRejectInvalidLazyDataTableProps).toBe("function")
    expect(typeof shouldAcceptGroupedDataTableProps).toBe("function")
    expect(typeof shouldAcceptExplicitRowType).toBe("function")
    expect(typeof shouldInferRowTypeFromInlineGroups).toBe("function")
    expect(typeof shouldAcceptMixedData).toBe("function")
    expect(typeof useTableModelTypeChecks).toBe("function")
    expect(typeof shouldInferInlineMixedData).toBe("function")
    expect(typeof shouldRejectInvalidData).toBe("function")
    expect(typeof shouldPreserveBusinessTypeInference).toBe("function")
  })
})
