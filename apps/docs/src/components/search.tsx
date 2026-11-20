import { FileDocument } from "@kova-ui/icons"
import { useNavigate } from "@tanstack/react-router"
import type { SharedProps } from "fumadocs-ui/contexts/search"
import { Alert, Command, type CommandData, Dialog, LoadingIndicator } from "kova-ui/components"
import { useEffect, useMemo, useRef, useState } from "react"

import { withBase } from "../lib/shared.js"
import type { SearchEntry } from "../routes/search[.]json.js"

type Result = {
  value: string
  label: string
  keywords?: string[]
  kind: "page" | "heading"
}

// Every page has these, so on their own they'd only add noise to the results
const commonHeadings = new Set([
  "Usage",
  "API Reference",
  "Accessibility",
  "Data attributes",
  "Data Attributes",
  "CSS variables",
  "CSS Variables",
  "Tested Behavior",
  "State",
])

function toResults(entries: SearchEntry[]) {
  const pages: Result[] = entries.map((entry) => ({
    value: entry.url,
    label: entry.title,
    keywords: [entry.section, ...(entry.description ? [entry.description] : [])],
    kind: "page",
  }))
  const headings: Result[] = entries.flatMap((entry) =>
    entry.headings
      .filter((heading) => heading.title !== entry.title && !commonHeadings.has(heading.title))
      .map((heading) => ({
        value: `${entry.url}#${heading.id}`,
        label: heading.title,
        keywords: [entry.title],
        kind: "heading" as const,
      })),
  )
  const sections = [...new Set(entries.map((entry) => entry.section))]
  const browse: CommandData = sections.map((section) => ({
    type: "group",
    label: section,
    items: pages.filter((page) => page.keywords?.[0] === section),
  }))
  return { all: [...pages, ...headings], browse }
}

/** Searches page titles, descriptions and headings from a small index built with the site */
export function SearchDialog({ open, onOpenChange }: SharedProps) {
  const navigate = useNavigate()
  const list = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")

  // New results start at the best match, once they've rendered and been reordered
  useEffect(() => {
    const frame = requestAnimationFrame(() => list.current?.scrollTo({ top: 0 }))
    return () => cancelAnimationFrame(frame)
  }, [query])
  const [entries, setEntries] = useState<SearchEntry[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!open || entries) return
    setFailed(false)
    fetch(withBase("/search.json"))
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => setFailed(true))
  }, [open, entries])

  // The layout's search buttons open Fumadocs' own dialog through a Base UI handle, so route
  // their presses to this one instead
  useEffect(() => {
    const openFromTrigger = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      if (!event.target.closest("[data-search], [data-search-full]")) return
      event.preventDefault()
      event.stopPropagation()
      onOpenChange(true)
    }
    document.addEventListener("click", openFromTrigger, true)
    return () => document.removeEventListener("click", openFromTrigger, true)
  }, [onOpenChange])

  const results = useMemo(() => (entries ? toResults(entries) : null), [entries])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Content width="large" align="top">
        <Dialog.Title className="sr-only">Search the docs</Dialog.Title>
        <Command
          className="docs-search-command"
          items={results?.all ?? []}
          emptyItems={results?.browse}
          status={failed ? "error" : results ? "idle" : "loading"}
          query={query}
          onQueryChange={setQuery}
          onAction={(value) => {
            const [to, hash] = value.split("#")
            onOpenChange(false)
            void navigate({ to: to as never, hash })
          }}
        >
          <Command.Input aria-label="Search the docs" placeholder="Search the docs…" />
          <Command.Status className="docs-search-status">
            {failed ? (
              <Alert
                color="danger"
                variant="soft"
                title="Search couldn't load"
                description="Check your connection, then open search again."
              />
            ) : results ? null : (
              <>
                <LoadingIndicator size={20} aria-hidden="true" />
                <span className="sr-only">Loading results</span>
              </>
            )}
          </Command.Status>
          <Command.Empty>{results && "No results found."}</Command.Empty>
          <Command.List ref={list}>{(state) => <Results items={state.items} />}</Command.List>
        </Command>
      </Dialog.Content>
    </Dialog>
  )
}

function Results({ items }: { items: CommandData }) {
  return items.map((item, index) => {
    if (typeof item === "string") {
      return (
        <Command.Item key={item} value={item}>
          {item}
        </Command.Item>
      )
    }
    if ("type" in item && item.type === "separator") {
      return <Command.Separator key={`separator-${index}`} />
    }
    if ("type" in item && item.type === "group") {
      return (
        <Command.Group key={item.label}>
          <Command.GroupLabel>{item.label}</Command.GroupLabel>
          <Results items={item.items} />
        </Command.Group>
      )
    }
    const result = item as Result
    return (
      <Command.Item
        key={result.value}
        value={result.value}
        label={result.label}
        keywords={result.keywords}
      >
        <Command.ItemIcon>
          {result.kind === "page" ? (
            <FileDocument aria-hidden="true" />
          ) : (
            <span aria-hidden="true" className="docs-search-hash">
              #
            </span>
          )}
        </Command.ItemIcon>
        <Command.ItemText>{result.label}</Command.ItemText>
      </Command.Item>
    )
  })
}
