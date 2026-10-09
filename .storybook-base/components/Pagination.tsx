"use no memo"
import { linkTo } from "@storybook/addon-links"
import { type MouseEvent } from "react"
import { ChevronLeft, ChevronRight } from "../../src/components/Icon/index.js"
import s from "./Pagination.module.css"

type DocsEntry = { id: string; title: string; type: string }

type StorybookPreview = {
  currentRender?: { id?: string }
  storyStoreValue?: { storyIndex?: { entries: Record<string, DocsEntry> } }
}

const getPreview = () =>
  (window as unknown as { __STORYBOOK_PREVIEW__?: StorybookPreview }).__STORYBOOK_PREVIEW__

// Docs pages in sidebar order
const getDocsEntries = () =>
  Object.values(getPreview()?.storyStoreValue?.storyIndex?.entries ?? {}).filter(
    (entry) => entry.type === "docs",
  )

const PageLink = ({ entry, direction }: { entry: DocsEntry; direction: "previous" | "next" }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    linkTo(entry.id)()
  }

  return (
    <a
      className={s.Link}
      data-direction={direction}
      href={`./?path=/docs/${entry.id}`}
      target="_top"
      onClick={handleClick}
    >
      <span className={s.Label}>{direction === "next" ? "Next" : "Previous"}</span>
      <span className={s.Title}>
        {direction === "previous" && <ChevronLeft aria-hidden />}
        {entry.title.split("/").at(-1)}
        {direction === "next" && <ChevronRight aria-hidden />}
      </span>
    </a>
  )
}

/**
 * Previous and next links between docs pages, following the sidebar order.
 */
export const Pagination = () => {
  const currentId = getPreview()?.currentRender?.id
  const entries = getDocsEntries()
  const index = entries.findIndex((entry) => entry.id === currentId)
  if (index === -1) {
    return null
  }

  const previous = entries[index - 1]
  const next = entries[index + 1]

  return (
    <nav className={`${s.Pagination} sb-unstyled`} aria-label="Documentation pages">
      {previous ? <PageLink entry={previous} direction="previous" /> : <span />}
      {next && <PageLink entry={next} direction="next" />}
    </nav>
  )
}
