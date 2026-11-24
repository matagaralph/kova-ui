"use client"

import { type ReactNode, useId, useMemo } from "react"
import { cn } from "../../lib/cn.js"
import { TableGroupContext } from "./table-group-context.js"
import { Table } from "./table.js"
import s from "./table.module.css"
import { VisuallyHidden } from "./visually-hidden.js"

export type TableGroupProps = {
  /**
   * Provide a custom class name for the group header section
   */
  "className"?: string

  /**
   * Provide a stable identifier exposed on both group sections as `data-group-id`
   */
  "id": string | number

  /**
   * Provide a label for the group header
   */
  "label": string

  /**
   * Specify the number of member rows in the group
   */
  "rowCount": number

  /**
   * Provide an accessible name for the group header
   */
  "aria-label"?: string

  /**
   * Specify the number of columns spanned by the group header
   */
  "colSpan": number

  "children"?: ReactNode
}

function TableGroup({
  className,
  id,
  label,
  rowCount,
  colSpan,
  children,
  "aria-label": ariaLabel,
}: TableGroupProps) {
  const headerId = useId()
  const contextValue = useMemo(() => ({ headerId }), [headerId])

  return (
    <>
      <tbody
        className={cn(s.TableGroupHeaderBody, className)}
        role="rowgroup"
        data-component="Table.Group"
        data-group-id={id}
      >
        <Table.Row>
          <th
            id={headerId}
            className={s.TableGroupHeaderCell}
            scope="colgroup"
            colSpan={colSpan}
            role="columnheader"
            aria-label={ariaLabel}
            data-component="Table.Group.Header"
          >
            <span className={s.TableGroupHeaderContent}>
              <span className={s.TableGroupHeaderLabel}>
                {label}
                <VisuallyHidden>,</VisuallyHidden>
              </span>
              <span className={s.TableGroupHeaderCount}>
                {rowCount}
                <VisuallyHidden>{rowCount === 1 ? " row" : " rows"}</VisuallyHidden>
              </span>
            </span>
          </th>
        </Table.Row>
      </tbody>
      <tbody
        className={s.TableBody}
        role="rowgroup"
        data-component="Table.Group.Body"
        data-group-id={id}
      >
        <TableGroupContext value={contextValue}>{children}</TableGroupContext>
      </tbody>
    </>
  )
}

export { TableGroup }
