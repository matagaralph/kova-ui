import { DataTable } from "./DataTable.js"
import { ErrorDialog } from "./ErrorDialog.js"
import { Pagination } from "./Pagination.js"
import {
  TableActions,
  TableBody,
  TableCell,
  TableCellPlaceholder,
  TableContainer,
  TableDivider,
  TableHead,
  TableHeader,
  Table as TableImpl,
  TableRow,
  TableSkeleton,
  TableSortHeader,
  TableSubtitle,
  TableTitle,
} from "./Table.js"
import { TableGroup } from "./TableGroup.js"

const Table = Object.assign(TableImpl, {
  Container: TableContainer,
  Title: TableTitle,
  Subtitle: TableSubtitle,
  Actions: TableActions,
  Divider: TableDivider,
  Skeleton: TableSkeleton,
  Head: TableHead,
  Body: TableBody,
  Group: TableGroup,
  Header: TableHeader,
  SortHeader: TableSortHeader,
  Row: TableRow,
  Cell: TableCell,
  CellPlaceholder: TableCellPlaceholder,
  Pagination,
  ErrorDialog,
})

export { DataTable, Table }
export type { DataTableProps } from "./DataTable.js"
export type {
  CellPadding,
  TableActionsProps,
  TableBodyProps,
  TableCellPlaceholderProps,
  TableCellProps,
  TableContainerProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSkeletonProps,
  TableSortHeaderProps,
  TableSubtitleProps,
  TableTitleProps,
} from "./Table.js"
export type { TableGroupProps } from "./TableGroup.js"
export type { PaginationProps, PaginationState, ResponsiveValue } from "./Pagination.js"
export type { TableErrorDialogProps } from "./ErrorDialog.js"
// eslint-disable-next-line react-refresh/only-export-components
export { createColumnHelper } from "./column.js"
export type { CellAlignment, Column, ColumnWidth } from "./column.js"
export type { DataTableData, DataTableRowGroup, UniqueRow } from "./row.js"
export type { ObjectPaths } from "./utils.js"
export type { SortDirection } from "./sorting.js"
