"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { type ComponentPropsWithoutRef, type ReactNode, useMemo, useState } from "react"
import { isDev, isTest } from "../../lib/constants.js"
import { ChevronLeft, ChevronRight } from "../Icon/index.js"
import s from "./Pagination.module.css"
import { buildPaginationModel } from "./paginationModel.js"
import { VisuallyHidden } from "./VisuallyHidden.js"

const VIEWPORT_RANGES = ["narrow", "regular", "wide"] as const

type ViewportRange = (typeof VIEWPORT_RANGES)[number]

export type ResponsiveValue<T> = T | Partial<Record<ViewportRange, T>>

export type PaginationState = {
  /**
   * The index of currently selected page
   */
  pageIndex: number
}

export type PaginationProps = Omit<
  ComponentPropsWithoutRef<"nav">,
  "onChange" | "aria-label" | "id"
> & {
  /**
   * Provide a label for the navigation landmark rendered by this component
   */
  "aria-label": string

  /**
   * Provide an optional index to specify the default selected page
   */
  "defaultPageIndex"?: number

  /**
   * Optionally provide an `id` that is placed on the navigation landmark
   * rendered by this component
   */
  "id"?: string

  /**
   * Optionally provide a handler that is called whenever the pagination state
   * is updated
   */
  "onChange"?: (state: PaginationState) => void

  /**
   * Optionally specify the number of items within a page
   * @default 25
   */
  "pageSize"?: number

  /**
   * Whether to show the page numbers. Pass an object to change this per viewport:
   * narrow (below 768px), regular, and wide (1400px and above).
   * @default { narrow: false }
   */
  "showPages"?: ResponsiveValue<boolean>

  /**
   * Specify the total number of items within the collection
   */
  "totalCount": number
}

const defaultShowPages = {
  narrow: false,
}

export function Pagination({
  "aria-label": label,
  defaultPageIndex,
  id,
  onChange,
  pageSize = 25,
  showPages = defaultShowPages,
  totalCount,
}: PaginationProps) {
  const {
    pageIndex,
    pageStart,
    pageEnd,
    pageCount,
    hasPreviousPage,
    hasNextPage,
    selectPage,
    selectNextPage,
    selectPreviousPage,
  } = usePagination({
    defaultPageIndex,
    onChange,
    pageSize,
    totalCount,
  })

  const hiddenViewportRanges =
    typeof showPages === "boolean"
      ? showPages
        ? []
        : VIEWPORT_RANGES
      : VIEWPORT_RANGES.filter((range) => showPages[range] === false)

  const model = useMemo(
    () => buildPaginationModel(pageCount, pageIndex + 1, !!showPages, 1, 2),
    [pageCount, pageIndex, showPages],
  )

  return (
    <nav aria-label={label} className={s.TablePagination} id={id} data-component="Table.Pagination">
      <Range pageStart={pageStart} pageEnd={pageEnd} totalCount={totalCount} />
      <ol
        className={s.TablePaginationSteps}
        data-hidden-viewport-ranges={hiddenViewportRanges.join(" ")}
      >
        <Step>
          <BaseButton
            className={s.TablePaginationAction}
            data-has-page={hasPreviousPage ? "" : undefined}
            disabled={!hasPreviousPage}
            focusableWhenDisabled
            data-component="Table.Pagination.PreviousPageButton"
            onClick={selectPreviousPage}
          >
            <ChevronLeft aria-hidden />
            <span>Previous</span>
            <VisuallyHidden>&nbsp;page</VisuallyHidden>
          </BaseButton>
        </Step>
        {model.map((page, i) => {
          if (page.type === "BREAK") {
            return <TruncationStep key={`truncation-${i}`} />
          }
          if (page.type === "NUM") {
            return (
              <Step key={i}>
                <Page
                  active={!!page.selected}
                  onClick={() => {
                    selectPage(page.num - 1)
                  }}
                >
                  {page.num}
                  {page.precedesBreak ? <VisuallyHidden>…</VisuallyHidden> : null}
                </Page>
              </Step>
            )
          }
          return null
        })}
        <Step>
          <BaseButton
            className={s.TablePaginationAction}
            data-has-page={hasNextPage ? "" : undefined}
            disabled={!hasNextPage}
            focusableWhenDisabled
            data-component="Table.Pagination.NextPageButton"
            onClick={selectNextPage}
          >
            <span>Next</span>
            <VisuallyHidden>&nbsp;page</VisuallyHidden>
            <ChevronRight aria-hidden />
          </BaseButton>
        </Step>
      </ol>
    </nav>
  )
}

type RangeProps = {
  pageStart: number
  pageEnd: number
  totalCount: number
}

function Range({ pageStart, pageEnd, totalCount }: RangeProps) {
  const start = pageStart + 1
  const end = pageEnd
  return (
    <>
      <div className={s.VisuallyHidden} role="status" aria-live="polite" aria-atomic="true">
        Showing {start} through {end} of {totalCount}
      </div>
      <p className={s.TablePaginationRange} data-component="Table.Pagination.Range">
        {start}
        <VisuallyHidden>&nbsp;through&nbsp;</VisuallyHidden>
        <span aria-hidden="true">‒</span>
        {end} of {totalCount}
      </p>
    </>
  )
}

function TruncationStep() {
  return (
    <li
      aria-hidden="true"
      className={s.TablePaginationTruncationStep}
      data-component="Table.Pagination.TruncationStep"
    >
      …
    </li>
  )
}

function Step({ children }: { children?: ReactNode }) {
  return (
    <li className={s.TablePaginationStep} data-component="Table.Pagination.Step">
      {children}
    </li>
  )
}

type PageProps = {
  active: boolean
  children?: ReactNode
  onClick: () => void
}

function Page({ active, children, onClick }: PageProps) {
  return (
    <BaseButton
      className={s.TablePaginationPage}
      data-active={active ? "" : undefined}
      aria-current={active ? true : undefined}
      onClick={onClick}
      data-component="Table.Pagination.Page"
    >
      <VisuallyHidden>Page&nbsp;</VisuallyHidden>
      {children}
    </BaseButton>
  )
}

type PaginationConfig = {
  defaultPageIndex?: number
  onChange?: (state: PaginationState) => void
  pageSize: number
  totalCount: number
}

function usePagination(config: PaginationConfig) {
  const { defaultPageIndex, onChange, pageSize, totalCount } = config
  const pageCount = Math.ceil(totalCount / pageSize)
  const [defaultIndex, setDefaultIndex] = useState(() => {
    if (defaultPageIndex !== undefined) {
      if (defaultPageIndex >= 0 && defaultPageIndex < pageCount) {
        return defaultPageIndex
      }

      if (isDev || isTest) {
        // eslint-disable-next-line no-console
        console.warn(
          "Warning:",
          `<Pagination> expected \`defaultPageIndex\` to be less than the total number of pages. Instead, received a \`defaultPageIndex\` of ${defaultPageIndex} with ${pageCount} total pages.`,
        )
      }
    }

    return 0
  })
  const [pageIndex, setPageIndex] = useState(defaultIndex)
  const validDefaultPageCount =
    defaultPageIndex !== undefined && defaultPageIndex >= 0 && defaultPageIndex < pageCount
  if (validDefaultPageCount && defaultIndex !== defaultPageIndex) {
    setDefaultIndex(defaultPageIndex)
    setPageIndex(defaultPageIndex)
    onChange?.({ pageIndex: defaultPageIndex })
  }
  const pageStart = pageIndex * pageSize
  const pageEnd = Math.min((pageIndex + 1) * pageSize, totalCount)
  const hasNextPage = pageIndex + 1 < pageCount
  const hasPreviousPage = pageIndex > 0

  function selectPage(newPageIndex: number) {
    if (pageIndex !== newPageIndex) {
      setPageIndex(newPageIndex)
      onChange?.({ pageIndex: newPageIndex })
    }
  }

  function selectPreviousPage() {
    if (hasPreviousPage) {
      selectPage(pageIndex - 1)
    }
  }

  function selectNextPage() {
    if (hasNextPage) {
      selectPage(pageIndex + 1)
    }
  }

  return {
    pageIndex,
    pageStart,
    pageEnd,
    pageCount,
    hasNextPage,
    hasPreviousPage,
    selectPage,
    selectPreviousPage,
    selectNextPage,
  }
}
