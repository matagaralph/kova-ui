"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import {
  type ComponentPropsWithoutRef,
  type ComponentType,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
  type Ref,
  use,
} from "react"
import { ArrowDownSm, ArrowUpSm } from "../Icon/index.js"
import type { CellAlignment, Column } from "./column.js"
import type { UniqueRow } from "./row.js"
import { ScrollableRegion } from "./ScrollableRegion.js"
import { SortDirection } from "./sorting.js"
import s from "./Table.module.css"
import { TableGroupContext } from "./TableGroupContext.js"
import { useTableLayout } from "./useTable.js"
import { VisuallyHidden } from "./VisuallyHidden.js"

export type CellPadding = "condensed" | "normal" | "spacious"

// ----------------------------------------------------------------------------
// Table
// ----------------------------------------------------------------------------

export type TableProps = Omit<ComponentPropsWithoutRef<"table">, "cellPadding"> & {
  /**
   * Provide an id to an element which uniquely describes this table
   */
  "aria-describedby"?: string

  /**
   * Provide an id to an element which uniquely labels this table
   */
  "aria-labelledby"?: string

  /**
   * Column width definitions
   */
  "gridTemplateColumns"?: CSSProperties["gridTemplateColumns"]

  /**
   * Specify the amount of space that should be available around the contents of
   * a cell
   * @default normal
   */
  "cellPadding"?: CellPadding

  "ref"?: Ref<HTMLTableElement>
}

function Table({
  "aria-labelledby": labelledby,
  cellPadding = "normal",
  className,
  gridTemplateColumns,
  ref,
  ...rest
}: TableProps) {
  const inheritedGroup = use(TableGroupContext)
  const table = (
    <ScrollableRegion aria-labelledby={labelledby} className={s.TableOverflowWrapper}>
      <table
        {...rest}
        aria-labelledby={labelledby}
        data-cell-padding={cellPadding}
        className={clsx(className, s.Table)}
        role="table"
        ref={ref}
        style={{ "--grid-template-columns": gridTemplateColumns } as CSSProperties}
        data-component="Table"
      />
    </ScrollableRegion>
  )

  // Group associations never leak into nested tables
  return inheritedGroup ? <TableGroupContext value={undefined}>{table}</TableGroupContext> : table
}

// ----------------------------------------------------------------------------
// TableHead
// ----------------------------------------------------------------------------

export type TableHeadProps = ComponentPropsWithoutRef<"thead">

function TableHead({ children }: TableHeadProps) {
  return (
    // The role is explicit because some browsers and assistive technologies drop table
    // semantics when the table uses `display: contents` or `display: grid`
    <thead className={s.TableHead} role="rowgroup" data-component="Table.Head">
      {children}
    </thead>
  )
}

// ----------------------------------------------------------------------------
// TableBody
// ----------------------------------------------------------------------------

export type TableBodyProps = ComponentPropsWithoutRef<"tbody">

function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className={s.TableBody} role="rowgroup" data-component="Table.Body">
      {children}
    </tbody>
  )
}

// ----------------------------------------------------------------------------
// TableHeader
// ----------------------------------------------------------------------------

export type TableHeaderProps = Omit<ComponentPropsWithoutRef<"th">, "align"> & {
  /**
   * The horizontal alignment of the cell's content
   */
  align?: CellAlignment
}

function TableHeader({ align, children, ...rest }: TableHeaderProps) {
  return (
    <th
      data-component="Table.Header"
      {...rest}
      className={s.TableHeader}
      role="columnheader"
      scope="col"
      data-cell-align={align}
    >
      {children}
    </th>
  )
}

export type TableSortHeaderProps = TableHeaderProps & {
  /**
   * Specify the sort direction for the TableHeader
   */
  direction: SortDirection

  /**
   * Provide a handler that is called when the sortable TableHeader is
   * interacted with via a click or keyboard interaction
   */
  onToggleSort: () => void
}

function TableSortHeader({
  align,
  children,
  direction,
  onToggleSort,
  ...rest
}: TableSortHeaderProps) {
  const ariaSort =
    direction === "DESC" ? "descending" : direction === "ASC" ? "ascending" : undefined
  const sortAction = direction === SortDirection.ASC ? "Sort descending" : "Sort ascending"

  return (
    <TableHeader {...rest} aria-sort={ariaSort} align={align} data-component="Table.SortHeader">
      <BaseButton
        className={s.TableSortButton}
        data-component="Table.SortHeader.Button"
        aria-description={sortAction}
        onClick={() => {
          onToggleSort()
        }}
      >
        {children}
        {direction === SortDirection.NONE || direction === SortDirection.ASC ? (
          <ArrowUpSm
            aria-hidden
            className={s.TableSortIcon}
            data-direction="ascending"
            data-component="Table.SortIcon"
          />
        ) : null}
        {direction === SortDirection.DESC ? (
          <ArrowDownSm
            aria-hidden
            className={s.TableSortIcon}
            data-direction="descending"
            data-component="Table.SortIcon"
          />
        ) : null}
      </BaseButton>
    </TableHeader>
  )
}

// ----------------------------------------------------------------------------
// TableRow
// ----------------------------------------------------------------------------

export type TableRowProps = ComponentPropsWithoutRef<"tr">

function TableRow({ children, ...rest }: TableRowProps) {
  return (
    <tr {...rest} className={s.TableRow} role="row" data-component="Table.Row">
      {children}
    </tr>
  )
}

// ----------------------------------------------------------------------------
// TableCell
// ----------------------------------------------------------------------------

export type TableCellProps = Omit<ComponentPropsWithoutRef<"td">, "align" | "scope"> & {
  /**
   * The horizontal alignment of the cell's content
   */
  align?: CellAlignment

  /**
   * Provide the scope for a table cell, useful for defining a row header using
   * `scope="row"`
   */
  scope?: "row"
}

function TableCell({ align, className, children, scope, headers, ...rest }: TableCellProps) {
  const BaseComponent = scope ? "th" : "td"
  const role = scope ? "rowheader" : "cell"

  const group = use(TableGroupContext)
  const resolvedHeaders = [group?.headerId, headers].filter(Boolean).join(" ") || undefined

  return (
    <BaseComponent
      {...rest}
      className={clsx(className, s.TableCell)}
      scope={scope}
      role={role}
      data-cell-align={align}
      data-component="Table.Cell"
      headers={resolvedHeaders}
    >
      {children}
    </BaseComponent>
  )
}

export type TableCellPlaceholderProps = { children?: ReactNode }

function TableCellPlaceholder({ children }: TableCellPlaceholderProps) {
  return (
    <span className={s.PlaceholderText} data-component="Table.CellPlaceholder">
      {children}
    </span>
  )
}

// ----------------------------------------------------------------------------
// TableContainer
// ----------------------------------------------------------------------------

export type TableContainerProps = HTMLAttributes<HTMLElement> & {
  /**
   * Provide an alternate element or component to render as the container
   * @default div
   */
  as?: ElementType
}

function TableContainer({ children, className, as, ...rest }: TableContainerProps) {
  const Component = as || "div"
  return (
    <Component
      {...rest}
      className={clsx(className, s.TableContainer)}
      data-component="Table.Container"
    >
      {children}
    </Component>
  )
}

// ----------------------------------------------------------------------------
// TableTitle
// ----------------------------------------------------------------------------

export type TableTitleProps = {
  children?: ReactNode

  /**
   * Provide an alternate element or component to use as the container for
   * `TableTitle`. This is useful when specifying markup that is more
   * semantic for your use-case, such as a heading tag.
   * @default h2
   */
  as?: keyof JSX.IntrinsicElements | ComponentType

  /**
   * Provide a unique id for the table title. This should be used along with
   * `aria-labelledby` on `DataTable`
   */
  id: string

  ref?: Ref<HTMLElement>
} & HTMLAttributes<HTMLElement>

function TableTitle({ as: Component = "h2", children, id, ref }: TableTitleProps) {
  const BaseComponent = Component as ElementType
  return (
    <BaseComponent className={s.TableTitle} id={id} ref={ref} data-component="Table.Title">
      {children}
    </BaseComponent>
  )
}

// ----------------------------------------------------------------------------
// TableSubtitle
// ----------------------------------------------------------------------------

export type TableSubtitleProps = {
  children?: ReactNode

  /**
   * Provide an alternate element or component to use as the container for
   * `TableSubtitle`. This is useful when specifying markup that is more
   * semantic for your use-case
   * @default div
   */
  as?: keyof JSX.IntrinsicElements | ComponentType

  /**
   * Provide a unique id for the table subtitle. This should be used along with
   * `aria-describedby` on `DataTable`
   */
  id: string
} & HTMLAttributes<HTMLElement>

function TableSubtitle({ as: Component = "div", children, id }: TableSubtitleProps) {
  const BaseComponent = Component as ElementType
  return (
    <BaseComponent className={s.TableSubtitle} id={id} data-component="Table.Subtitle">
      {children}
    </BaseComponent>
  )
}

// ----------------------------------------------------------------------------
// TableDivider
// ----------------------------------------------------------------------------

function TableDivider() {
  return <div className={s.TableDivider} role="presentation" data-component="Table.Divider" />
}

// ----------------------------------------------------------------------------
// TableActions
// ----------------------------------------------------------------------------

export type TableActionsProps = { children?: ReactNode }

function TableActions({ children }: TableActionsProps) {
  return (
    <div className={s.TableActions} data-component="Table.Actions">
      {children}
    </div>
  )
}

// ----------------------------------------------------------------------------
// TableSkeleton
// ----------------------------------------------------------------------------

export type TableSkeletonProps<Data extends UniqueRow> = Omit<
  ComponentPropsWithoutRef<"table">,
  "cellPadding"
> & {
  /**
   * Specify the amount of space that should be available around the contents of
   * a cell
   * @default normal
   */
  cellPadding?: CellPadding

  /**
   * Provide an array of columns for the table. Columns will render as the headers
   * of the table.
   */
  columns: Array<Column<Data>>

  /**
   * Optionally specify the number of rows which should be included in the
   * skeleton state of the component
   * @default 10
   */
  rows?: number
}

function TableSkeleton<Data extends UniqueRow>({
  cellPadding,
  columns,
  rows = 10,
  ...rest
}: TableSkeletonProps<Data>) {
  const { gridTemplateColumns } = useTableLayout(columns)
  return (
    <Table {...rest} cellPadding={cellPadding} gridTemplateColumns={gridTemplateColumns}>
      <TableHead>
        <TableRow>
          {Array.isArray(columns)
            ? columns.map((column, i) => (
                <TableHeader key={i}>
                  {typeof column.header === "string" ? column.header : column.header()}
                </TableHeader>
              ))
            : null}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {Array.from({ length: columns.length }).map((_column, i) => (
            <TableCell key={i} className={s.TableCellSkeleton}>
              <VisuallyHidden>Loading</VisuallyHidden>
              <div className={s.TableCellSkeletonItems}>
                {Array.from({ length: rows }).map((_row, j) => (
                  <div key={j} className={s.TableCellSkeletonItem}>
                    <div className={s.SkeletonText} data-component="SkeletonText" />
                  </div>
                ))}
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export {
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableCellPlaceholder,
  TableContainer,
  TableDivider,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  TableSortHeader,
  TableSubtitle,
  TableTitle,
}
