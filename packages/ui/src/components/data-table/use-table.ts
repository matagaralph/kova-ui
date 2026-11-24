import { type CSSProperties, useId, useMemo, useState } from "react"
import { isDev, isTest } from "../../lib/constants.js"
import type { Column } from "./column.js"
import type { DataTableData, DataTableRowGroup, UniqueRow } from "./row.js"
import { DEFAULT_SORT_DIRECTION, keyedStrategies, SortDirection, transition } from "./sorting.js"
import type { ObjectPathValue } from "./utils.js"

interface TableConfig<Data extends UniqueRow> {
  columns: Array<Column<Data>>
  data: DataTableData<Data>
  initialSortColumn?: string | number
  initialSortDirection?: Exclude<SortDirection, "NONE">
  externalSorting?: boolean
  getRowId: (rowData: Data) => string | number
}

interface Table<Data extends UniqueRow> {
  headers: Array<Header<Data>>
  bodies: Array<RowBody<Data> | RowGroup<Data>>
  actions: {
    sortBy: (header: Header<Data>) => void
  }
  gridTemplateColumns: CSSProperties["gridTemplateColumns"]
}

interface Header<Data extends UniqueRow> {
  id: string
  domId: string | undefined
  column: Column<Data>
  isSortable: () => boolean
  getSortDirection: () => SortDirection | Exclude<SortDirection, "NONE">
}

export interface Row<Data extends UniqueRow> {
  type: "row"
  id: string | number
  layoutKey: string
  getCells: () => Array<Cell<Data>>
  getValue: () => Data
}

interface RowGroup<Data extends UniqueRow> {
  "type": "row-group"
  "key": string
  "id": string | number
  "label": string
  "rows": Array<Row<Data>>
  "aria-label"?: string
}

interface RowBody<Data extends UniqueRow> {
  type: "row-body"
  key: string
  rows: Array<Row<Data>>
}

interface Cell<Data extends UniqueRow> {
  id: string
  domId: string | undefined
  headers: string | undefined
  column: Column<Data>
  getValue: () => Data[keyof Data]
  rowHeader: boolean
}

type ColumnSortState = { id: string | number; direction: Exclude<SortDirection, "NONE"> } | null

export function useTable<Data extends UniqueRow>({
  columns,
  data,
  initialSortColumn,
  initialSortDirection,
  externalSorting,
  getRowId,
}: TableConfig<Data>): Table<Data> {
  const tableId = useId()
  const [rowOrder, setRowOrder] = useState<DataTableData<Data>>(data)
  const [prevData, setPrevData] = useState(data)
  const [prevColumns, setPrevColumns] = useState(columns)
  const [sortByColumn, setSortByColumn] = useState<ColumnSortState>(() => {
    return getInitialSortState(columns, initialSortColumn, initialSortDirection)
  })
  const { gridTemplateColumns } = useTableLayout(columns)

  // Reset the `sortByColumn` state if the columns change and that column is no
  // longer provided
  if (columns !== prevColumns) {
    setPrevColumns(columns)
    if (sortByColumn) {
      const column = columns.find((candidate) => {
        const id = candidate.id ?? candidate.field
        return sortByColumn.id === id
      })
      if (!column) {
        setSortByColumn(null)
      }
    }
  }

  const hasGroups = useMemo(() => rowOrder.some(isDataTableRowGroup), [rowOrder])
  const headers = useMemo(
    () =>
      columns.map((column, index): Header<Data> => {
        const id = column.id ?? column.field
        if (id === undefined) {
          throw new Error(`Expected either an \`id\` or \`field\` to be defined for a Column`)
        }

        const sortable = column.sortBy !== undefined && column.sortBy !== false
        return {
          id,
          domId: hasGroups ? `${tableId}-column-${index}` : undefined,
          column,
          isSortable() {
            return sortable
          },
          getSortDirection() {
            if (sortByColumn && sortByColumn.id === id) {
              return sortByColumn.direction
            }
            return SortDirection.NONE
          },
        }
      }),
    [columns, hasGroups, tableId, sortByColumn],
  )

  // Update the row order and apply the current sort column to the incoming data
  if (data !== prevData) {
    setPrevData(data)
    updateRowOrder(data, sortByColumn)
  }

  /**
   * Sort the input row data by the given header
   */
  function sortBy(header: Header<Data>) {
    const sortState = {
      id: header.id,
      direction:
        sortByColumn && sortByColumn.id === header.id
          ? transition(sortByColumn.direction)
          : DEFAULT_SORT_DIRECTION,
    }
    setSortByColumn(sortState)
    updateRowOrder(rowOrder, sortState)
  }

  function updateRowOrder(rows: DataTableData<Data>, state: ColumnSortState) {
    if (externalSorting || state === null) {
      setRowOrder(rows)
    } else {
      const sortedRows = getSortedRowOrder(rows, state)
      setRowOrder(sortedRows)
    }
  }

  /**
   * Blank values are ordered last regardless of the sort direction.
   */
  function getSortedRowOrder(
    currentRowOrder: DataTableData<Data>,
    state: Exclude<ColumnSortState, null>,
  ): DataTableData<Data> {
    const header = headers.find((candidate) => {
      return candidate.id === state.id
    })
    if (!header) {
      throw new Error(`Unable to find header with id: ${state.id}`)
    }

    const { field, sortBy: sortOption } = header.column
    if (sortOption === false || sortOption === undefined) {
      throw new Error(`The column for this header is not sortable`)
    }
    const ascending = state.direction === SortDirection.ASC

    const sortData = (rows: Array<Data>) => {
      if (field === undefined) {
        return rows.slice()
      }

      // Custom sort functions operate on the row versus the field
      if (typeof sortOption === "function") {
        return rows.slice().sort((a, b) => (ascending ? sortOption(a, b) : sortOption(b, a)))
      }

      // Read each row's value, and prepare its sort key, once per sort instead of once per comparison
      const strategy = keyedStrategies[sortOption === true ? "basic" : sortOption] as {
        key: (value: unknown) => unknown
        compare: (a: unknown, b: unknown) => number
      }
      const keyed = rows.map((row) => {
        const value = get(row, field)
        const blank = isBlankValue(value)
        return { row, blank, key: blank ? undefined : strategy.key(value) }
      })

      // Blank values are ordered last regardless of the sort direction
      keyed.sort((a, b) => {
        if (!a.blank && !b.blank) {
          return ascending ? strategy.compare(a.key, b.key) : strategy.compare(b.key, a.key)
        }
        if (!a.blank) {
          return -1
        }
        if (!b.blank) {
          return 1
        }
        return 0
      })
      return keyed.map((entry) => entry.row)
    }

    const sorted: DataTableData<Data> = []
    let ungroupedRows: Array<Data> = []

    function appendUngroupedRows() {
      for (const row of sortData(ungroupedRows)) {
        sorted.push(row)
      }
      ungroupedRows = []
    }

    for (const item of currentRowOrder) {
      if (isDataTableRowGroup(item)) {
        appendUngroupedRows()
        sorted.push({ ...item, rows: sortData(item.rows) })
      } else {
        ungroupedRows.push(item)
      }
    }
    appendUngroupedRows()
    return sorted
  }

  const bodies = useMemo(() => {
    function createRow(row: Data): Row<Data> {
      const rowId = getRowId(row)
      // Cell ids come from the row's id, not its position, so a sorted row keeps its ids and its memo
      const domRowId = `${tableId}-row-${encodeURIComponent(rowId)}`
      const rowHeaderIds = hasGroups
        ? headers.flatMap((header, index) =>
            header.column.rowHeader ? [`${domRowId}-header-${index}`] : [],
          )
        : []
      return {
        type: "row",
        id: `${rowId}`,
        layoutKey: hasGroups ? `grouped:${rowId}` : `${rowId}`,
        getValue() {
          return row
        },
        getCells() {
          return headers.map((header, index) => {
            const rowHeader = header.column.rowHeader ?? false
            return {
              id: `${rowId}:${header.id}`,
              domId: hasGroups && rowHeader ? `${domRowId}-header-${index}` : undefined,
              headers: hasGroups
                ? (rowHeader ? [header.domId] : [...rowHeaderIds, header.domId]).join(" ")
                : undefined,
              column: header.column,
              rowHeader,
              getValue() {
                if (header.column.field !== undefined) {
                  return get(row, header.column.field)
                }
                throw new Error(`Unable to get value for column header ${header.id}`)
              },
            }
          })
        },
      }
    }

    const result: Table<Data>["bodies"] = []
    let body: RowBody<Data> = { type: "row-body", key: "rows:start", rows: [] }
    for (const item of rowOrder) {
      if (isDataTableRowGroup(item)) {
        if (body.rows.length > 0) {
          result.push(body)
        }
        result.push({
          "type": "row-group",
          "key": `group:${item.groupId}`,
          "id": item.groupId,
          "label": item.label,
          "rows": item.rows.map(createRow),
          "aria-label": item["aria-label"],
        })
        body = { type: "row-body", key: `rows:after:${item.groupId}`, rows: [] }
      } else {
        body.rows.push(createRow(item))
      }
    }
    if (body.rows.length > 0 || result.length === 0) {
      result.push(body)
    }
    return result
  }, [rowOrder, headers, getRowId, hasGroups, tableId])

  return {
    headers,
    actions: { sortBy },
    gridTemplateColumns,
    bodies,
  }
}

function isDataTableRowGroup<Data extends UniqueRow>(
  item: Data | DataTableRowGroup<Data>,
): item is DataTableRowGroup<Data> {
  return "groupId" in item && "rows" in item && Array.isArray(item.rows)
}

function getInitialSortState<Data extends UniqueRow>(
  columns: Array<Column<Data>>,
  initialSortColumn?: string | number,
  initialSortDirection?: Exclude<SortDirection, "NONE">,
) {
  if (initialSortColumn !== undefined) {
    const column = columns.find((candidate) => {
      return candidate.id === initialSortColumn || candidate.field === initialSortColumn
    })

    if (column === undefined) {
      if (isDev || isTest) {
        // eslint-disable-next-line no-console
        console.warn(
          `Warning: Unable to find a column with id or field set to: ${initialSortColumn}. Please provide a value to \`initialSortColumn\` which corresponds to a \`id\` or \`field\` value in a column.`,
        )
      }
      return null
    }

    if (column.sortBy === false || column.sortBy === undefined) {
      if (isDev || isTest) {
        // eslint-disable-next-line no-console
        console.warn(
          `Warning: The column specified by initialSortColumn={${initialSortColumn}} is not sortable. Please set \`sortBy\` to true or provide a sort strategy.`,
        )
      }
      return null
    }

    return {
      id: `${initialSortColumn}`,
      direction: initialSortDirection ?? DEFAULT_SORT_DIRECTION,
    }
  }

  if (initialSortDirection !== undefined) {
    const column = columns.find((candidate) => {
      return candidate.sortBy !== false && candidate.sortBy !== undefined
    })

    if (!column) {
      if (isDev || isTest) {
        // eslint-disable-next-line no-console
        console.warn(
          `Warning: An initialSortDirection value was provided but no columns are sortable. Please set \`sortBy\` to true or provide a sort strategy to a column.`,
        )
      }
      return null
    }

    const id = column.id ?? column.field
    if (id === undefined) {
      if (isDev || isTest) {
        // eslint-disable-next-line no-console
        console.warn(
          `Warning: Unable to find an \`id\` or \`field\` for the column: ${column}. Please set one of these properties on the column.`,
        )
      }
      return null
    }

    return {
      id,
      direction: initialSortDirection,
    }
  }

  return null
}

export function useTableLayout<Data extends UniqueRow>(
  columns: Array<Column<Data>>,
): { gridTemplateColumns: string } {
  return {
    gridTemplateColumns: getGridTemplateFromColumns(columns).join(" "),
  }
}

export function getGridTemplateFromColumns<Data extends UniqueRow>(
  columns: Array<Column<Data>>,
): string[] {
  return columns.map((column) => {
    const columnWidth = column.width ?? "grow"
    let minWidth = "auto"
    let maxWidth = "1fr"

    if (columnWidth === "auto") {
      maxWidth = "auto"
    }

    // Setting a min-width of 'max-content' ensures that the column will grow to fit the widest cell's content.
    // However, If the column has a max width, we can't set the min width to `max-content` because
    // the widest cell's content might overflow the container.
    if (columnWidth === "grow" && !column.maxWidth) {
      minWidth = "max-content"
    }

    // Column widths set to "growCollapse" don't need a min width unless one is explicitly provided.
    if (columnWidth === "growCollapse") {
      minWidth = "0"
    }

    // If a consumer passes `minWidth` or `maxWidth`, we need to override whatever we set above.
    if (column.minWidth) {
      minWidth = typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth
    }

    if (column.maxWidth) {
      maxWidth = typeof column.maxWidth === "number" ? `${column.maxWidth}px` : column.maxWidth
    }

    // If a consumer is passing one of the shorthand widths or doesn't pass a width at all, we use the
    // min and max width calculated above to create a minmax() column template value.
    if (typeof columnWidth !== "number" && ["grow", "growCollapse", "auto"].includes(columnWidth)) {
      return minWidth === maxWidth ? minWidth : `minmax(${minWidth}, ${maxWidth})`
    }

    // If we reach this point, the consumer is passing an explicit width value.
    return typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get<ObjectType extends Record<string, any>, Path extends string>(
  object: ObjectType,
  path: Path,
): ObjectPathValue<ObjectType, Path> {
  return path.split(".").reduce<ObjectPathValue<ObjectType, Path>>((value, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (value as any)[key]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, object as any)
}

function isBlankValue(value: unknown): value is null | undefined | "" {
  return value === null || value === undefined || value === ""
}
