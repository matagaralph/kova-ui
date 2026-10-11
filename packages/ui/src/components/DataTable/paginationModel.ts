export type PageType = {
  type: "PREV" | "NEXT" | "NUM" | "BREAK"
  num: number
  disabled?: boolean
  selected?: boolean
  precedesBreak?: boolean
}

/**
 * Build the list of steps for a pagination control: previous, the visible page numbers with
 * truncation breaks, and next.
 *
 * For example, with 15 pages and page 9 selected: [1, …, 7, 8, 9, 10, 11, …, 15]
 */
export function buildPaginationModel(
  pageCount: number,
  currentPage: number,
  showPages: boolean,
  marginPageCount: number,
  surroundingPageCount: number,
): PageType[] {
  const prev: PageType = { type: "PREV", num: currentPage - 1, disabled: currentPage === 1 }
  const next: PageType = { type: "NEXT", num: currentPage + 1, disabled: currentPage === pageCount }
  if (!showPages) {
    return [prev, next]
  }

  if (pageCount <= 0) {
    return [prev, { ...next, disabled: true }]
  }

  const pages: PageType[] = []

  // Number of pages shown on each side of the current page
  const standardGap = surroundingPageCount + marginPageCount

  // The most pages shown at once, counting the current page and both breaks
  const maxVisiblePages = standardGap + standardGap + 3

  if (pageCount <= maxVisiblePages) {
    addPages(1, pageCount, false)
    return [prev, ...pages, next]
  }

  // `startGap` is the number of pages hidden by the start break. When the margin and the
  // surrounding window overlap there is no break, and `startOffset` compensates instead.
  let startGap = 0
  let startOffset = 0

  if (currentPage - standardGap - 1 <= 1) {
    startOffset = currentPage - standardGap - 2
  } else {
    startGap = currentPage - standardGap - 1
  }

  // The same, for the end of the list
  let endGap = 0
  let endOffset = 0

  if (pageCount - currentPage - standardGap <= 1) {
    endOffset = pageCount - currentPage - standardGap - 1
  } else {
    endGap = pageCount - currentPage - standardGap
  }

  const hasStartEllipsis = startGap > 0
  const hasEndEllipsis = endGap > 0

  addPages(1, marginPageCount, hasStartEllipsis)

  if (hasStartEllipsis) {
    addEllipsis(marginPageCount)
  }

  addPages(
    marginPageCount + startGap + endOffset + 1,
    pageCount - startOffset - endGap - marginPageCount,
    hasEndEllipsis,
  )

  if (hasEndEllipsis) {
    addEllipsis(pageCount - startOffset - endGap - marginPageCount)
  }

  addPages(pageCount - marginPageCount + 1, pageCount)

  return [prev, ...pages, next]

  function addEllipsis(previousPage: number): void {
    pages.push({
      type: "BREAK",
      num: previousPage + 1,
    })
  }

  function addPages(start: number, end: number, precedesBreak: boolean = false): void {
    for (let i = start; i <= end; i++) {
      pages.push({
        type: "NUM",
        num: i,
        selected: i === currentPage,
        precedesBreak: i === end && precedesBreak,
      })
    }
  }
}
