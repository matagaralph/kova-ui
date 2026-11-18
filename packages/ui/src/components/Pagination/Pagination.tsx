"use client"

import { ChevronLeft, ChevronRight, DoubleChevronLeft, DoubleChevronRight } from "@kova-ui/icons"
import {
  Pagination as PaginationPrimitive,
  PaginationEllipsis as PaginationEllipsisPrimitive,
  PaginationFirst as PaginationFirstPrimitive,
  PaginationItem as PaginationItemPrimitive,
  PaginationLast as PaginationLastPrimitive,
  PaginationLink as PaginationLinkPrimitive,
  PaginationList as PaginationListPrimitive,
  PaginationNext as PaginationNextPrimitive,
  PaginationPrevious as PaginationPreviousPrimitive,
} from "@ui-sdk/react/pagination"
import { type ComponentProps, createContext, use, useState } from "react"
import { cn, mergeClassName } from "../../lib/cn.js"
import s from "./Pagination.module.css"

const VIEWPORT_RANGES = ["narrow", "regular", "wide"] as const

type ViewportRange = (typeof VIEWPORT_RANGES)[number]

export type ResponsiveValue<T> = T | Partial<Record<ViewportRange, T>>

type RangeContextValue = { page: number; pageCount: number; total?: number; pageSize: number }

const RangeContext = createContext<RangeContextValue | null>(null)

export type PaginationProps = ComponentProps<typeof PaginationPrimitive> & {
  /**
   * Whether to show the page links, or only the steps. Pass an object to choose per viewport:
   * `narrow` (below 768px), `regular`, and `wide` (1400px and above).
   * @default { narrow: false }
   */
  showPages?: ResponsiveValue<boolean>
}

export function Pagination({
  className,
  showPages = { narrow: false },
  siblings = 2,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  ...props
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage)
  const pageSize = props.pageSize ?? 10
  const pageCount =
    props.pageCount ?? (props.total !== undefined ? Math.ceil(props.total / pageSize) : 1)
  const page = Math.min(Math.max(controlledPage ?? uncontrolledPage, 1), Math.max(pageCount, 1))

  const hiddenRanges =
    typeof showPages === "boolean"
      ? showPages
        ? []
        : VIEWPORT_RANGES
      : VIEWPORT_RANGES.filter((range) => showPages[range] === false)

  return (
    <RangeContext value={{ page, pageCount: Math.max(pageCount, 1), total: props.total, pageSize }}>
      <PaginationPrimitive
        className={mergeClassName(s.Pagination, className)}
        data-hide-pages={hiddenRanges.length > 0 ? hiddenRanges.join(" ") : undefined}
        siblings={siblings}
        page={controlledPage}
        defaultPage={controlledPage === undefined ? defaultPage : undefined}
        onPageChange={(next, details) => {
          onPageChange?.(next, details)
          if (!details.canceled) setUncontrolledPage(next)
        }}
        {...props}
      />
    </RangeContext>
  )
}

export type PaginationRangeProps = ComponentProps<"p">

/** The items the current page shows, like "26–50 of 120", announced as it changes. */
function PaginationRange({ className, ...props }: PaginationRangeProps) {
  const range = use(RangeContext)
  if (!range) return null
  const { page, pageCount, total, pageSize } = range
  const start = total === undefined ? 0 : Math.min((page - 1) * pageSize + 1, total)
  const end = total === undefined ? 0 : Math.min(page * pageSize, total)

  return (
    <p className={cn(s.PaginationRange, className)} {...props}>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {total === undefined
          ? `Page ${page} of ${pageCount}`
          : `Showing ${start} through ${end} of ${total}`}
      </span>
      <span aria-hidden="true">
        {total === undefined ? `Page ${page} of ${pageCount}` : `${start}‒${end} of ${total}`}
      </span>
    </p>
  )
}

export type PaginationListProps = ComponentProps<typeof PaginationListPrimitive>

function PaginationList({ className, ...props }: PaginationListProps) {
  return (
    <PaginationListPrimitive className={mergeClassName(s.PaginationList, className)} {...props} />
  )
}

export type PaginationItemProps = ComponentProps<typeof PaginationItemPrimitive>

function PaginationItem({ className, ...props }: PaginationItemProps) {
  return (
    <PaginationItemPrimitive className={mergeClassName(s.PaginationItem, className)} {...props} />
  )
}

export type PaginationLinkProps = ComponentProps<typeof PaginationLinkPrimitive>

function PaginationLink({ className, children, page, ...props }: PaginationLinkProps) {
  return (
    <PaginationLinkPrimitive
      className={mergeClassName(s.PaginationLink, className)}
      page={page}
      {...props}
    >
      {children ?? (
        <>
          <span className="sr-only">Page </span>
          {page}
        </>
      )}
    </PaginationLinkPrimitive>
  )
}

export type PaginationPreviousProps = ComponentProps<typeof PaginationPreviousPrimitive>

function PaginationPrevious({ className, children, ...props }: PaginationPreviousProps) {
  return (
    <PaginationPreviousPrimitive className={mergeClassName(s.PaginationStep, className)} {...props}>
      {children ?? (
        <>
          <ChevronLeft aria-hidden />
          <span>Previous</span>
          <span className="sr-only"> page</span>
        </>
      )}
    </PaginationPreviousPrimitive>
  )
}

export type PaginationNextProps = ComponentProps<typeof PaginationNextPrimitive>

function PaginationNext({ className, children, ...props }: PaginationNextProps) {
  return (
    <PaginationNextPrimitive className={mergeClassName(s.PaginationStep, className)} {...props}>
      {children ?? (
        <>
          <span>Next</span>
          <span className="sr-only"> page</span>
          <ChevronRight aria-hidden />
        </>
      )}
    </PaginationNextPrimitive>
  )
}

export type PaginationFirstProps = ComponentProps<typeof PaginationFirstPrimitive>

function PaginationFirst({ className, children, ...props }: PaginationFirstProps) {
  return (
    <PaginationFirstPrimitive className={mergeClassName(s.PaginationStep, className)} {...props}>
      {children ?? (
        <>
          <DoubleChevronLeft aria-hidden />
          <span>First</span>
          <span className="sr-only"> page</span>
        </>
      )}
    </PaginationFirstPrimitive>
  )
}

export type PaginationLastProps = ComponentProps<typeof PaginationLastPrimitive>

function PaginationLast({ className, children, ...props }: PaginationLastProps) {
  return (
    <PaginationLastPrimitive className={mergeClassName(s.PaginationStep, className)} {...props}>
      {children ?? (
        <>
          <span>Last</span>
          <span className="sr-only"> page</span>
          <DoubleChevronRight aria-hidden />
        </>
      )}
    </PaginationLastPrimitive>
  )
}

export type PaginationEllipsisProps = ComponentProps<typeof PaginationEllipsisPrimitive>

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <PaginationEllipsisPrimitive
      className={mergeClassName(s.PaginationEllipsis, className)}
      {...props}
    />
  )
}

Pagination.Item = PaginationItem
Pagination.Last = PaginationLast
Pagination.Link = PaginationLink
Pagination.List = PaginationList
Pagination.Next = PaginationNext
Pagination.First = PaginationFirst
Pagination.Range = PaginationRange
Pagination.Ellipsis = PaginationEllipsis
Pagination.Previous = PaginationPrevious
