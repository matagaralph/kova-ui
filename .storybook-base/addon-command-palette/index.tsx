// @ts-expect-error -- React import is required here
import React from "react"

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { addons, types, useStorybookApi, useStorybookState } from "storybook/manager-api"

type Page = { id: string; section: string; name: string }

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform)

// Matches Storybook's mobile layout, where the navigation menu replaces search
const isMobile = () => window.matchMedia("(max-width: 599px)").matches

// ⌘K / Ctrl+K anywhere, or "/" when not typing in a field
const isOpenShortcut = (event: {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
  target?: EventTarget | null
}) => {
  if (isMobile()) return false
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") return true
  const target = event.target as HTMLElement | null
  const typing = target?.closest?.("input, textarea, select, [contenteditable='true']")
  return event.key === "/" && !typing
}

export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M10.5 3a7.5 7.5 0 0 1 5.9 12.13l4.24 4.23a1 1 0 0 1-1.42 1.42l-4.23-4.24A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
      fill="currentColor"
    />
  </svg>
)

// Re-imported from our icon library, since the manager has no SVG loader
const SECTION_ICONS: Record<string, ReactNode> = {
  // BookOpen
  Overview: (
    <>
      <path d="M22 6.017c0-1.104-.907-2.037-2.049-2l-.594.025c-2.732.148-4.952.705-7.333 1.953l-.512.279-.087.054a1 1 0 0 0 .971 1.737l.092-.046.454-.246C15.195 6.59 17.26 6.106 20 6.016v11.837c-3.034.046-5.42.582-7.99 1.99l-.517.295-.086.056a1 1 0 0 0 1.009 1.715l.09-.047.455-.258c2.105-1.157 4.045-1.645 6.537-1.738l.543-.014a1.995 1.995 0 0 0 1.95-1.8l.009-.198V6.017Z" />
      <path d="M2 6.017c0-1.104.907-2.037 2.049-2l.594.025c2.732.148 4.952.705 7.333 1.953l.512.279.087.054a1 1 0 0 1-.971 1.737l-.092-.046-.454-.246C8.805 6.59 6.74 6.106 4 6.016v11.837c3.034.046 5.42.582 7.99 1.99l.517.295.086.056a1 1 0 0 1-1.009 1.715l-.09-.047-.455-.258c-2.105-1.157-4.045-1.644-6.537-1.738l-.543-.014a1.995 1.995 0 0 1-1.95-1.8L2 17.855V6.017Z" />
      <path d="M13 7.5v13h-2v-13h2Z" />
    </>
  ),
  // Lightbulb
  Concepts: (
    <path d="M12 3c3.585 0 6.5 2.923 6.5 6.538A6.542 6.542 0 0 1 15.575 15h-7.15A6.542 6.542 0 0 1 5.5 9.538C5.5 5.923 8.415 3 12 3Zm2.865 14v1h-5.73v-1h5.73Zm-1.133 3a2 2 0 0 1-3.464 0h3.464Zm-5.606 0a4.002 4.002 0 0 0 7.748 0 1 1 0 0 0 .991-1v-2.46A8.54 8.54 0 0 0 20.5 9.539C20.5 4.828 16.7 1 12 1S3.5 4.828 3.5 9.538a8.54 8.54 0 0 0 3.635 7.003V19a1 1 0 0 0 .991 1Z" />
  ),
  // GridAlt
  Foundations: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.75.75a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0ZM6.096 7.725a.75.75 0 1 0-.75 1.3.75.75 0 0 0 .75-1.3ZM3.34 7a2.75 2.75 0 1 1 4.763 2.75A2.75 2.75 0 0 1 3.34 7Zm15.588 1a.75.75 0 1 0-1.299.75.75.75 0 0 0 1.299-.75Zm-2.024-2.006a2.75 2.75 0 1 1 2.75 4.762 2.75 2.75 0 0 1-2.75-4.762ZM12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Zm10.154 2.976a.75.75 0 1 0-.75 1.299.75.75 0 0 0 .75-1.3Zm-2.757-.726A2.75 2.75 0 1 1 20.66 17a2.75 2.75 0 0 1-4.763-2.75Zm-9.526 1a.75.75 0 1 0-1.3.75.75.75 0 0 0 1.3-.75Zm-2.025-2.007a2.75 2.75 0 1 1 2.75 4.764 2.75 2.75 0 0 1-2.75-4.764ZM12 18.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.75.75a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0Z"
    />
  ),
  // Cube
  Components: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 3.444a1 1 0 0 0-1 0l-6.253 3.61 6.768 3.807 6.955-3.682-6.47-3.735Zm7.16 5.632L13 12.602v7.666l6.16-3.556a1 1 0 0 0 .5-.867V9.076ZM11 20.268v-7.683L4.34 8.839v7.006a1 1 0 0 0 .5.867L11 20.268Zm-.5-18.557a3 3 0 0 1 3 0l6.66 3.846a3 3 0 0 1 1.5 2.598v7.69a3 3 0 0 1-1.5 2.598L13.5 22.29a3 3 0 0 1-3 0l-6.66-3.846a3 3 0 0 1-1.5-2.598v-7.69a3 3 0 0 1 1.5-2.598L10.5 1.71Z"
    />
  ),
  // Sparkles
  Transitions: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.932 4.377A1.45 1.45 0 0 1 11.375 3c.8 0 1.403.638 1.443 1.377.205 3.787 3.003 6.59 6.784 6.794A1.474 1.474 0 0 1 21 12.636c0 .816-.655 1.428-1.406 1.465-3.775.187-6.571 2.985-6.776 6.772a1.45 1.45 0 0 1-1.443 1.377 1.45 1.45 0 0 1-1.443-1.377c-.205-3.787-3.002-6.585-6.777-6.772a1.472 1.472 0 0 1-1.405-1.464c0-.815.654-1.426 1.404-1.464 3.772-.187 6.573-3.004 6.778-6.796Zm1.443 2.87a8.875 8.875 0 0 1-5.395 5.389 8.847 8.847 0 0 1 5.395 5.369 8.847 8.847 0 0 1 5.41-5.374 8.884 8.884 0 0 1-5.41-5.384Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.25 3.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
      />
    </>
  ),
}

export const SectionIcon = ({ section }: { section: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {SECTION_ICONS[section] ?? SECTION_ICONS.Overview}
  </svg>
)

const usePages = (): Page[] => {
  const { index } = useStorybookState()
  return useMemo(
    () =>
      Object.values(index ?? {})
        .filter((entry) => entry.type === "docs")
        .map((entry) => {
          const parts = entry.title.split("/")
          return { id: entry.id, section: parts[0], name: parts.at(-1) ?? entry.name }
        }),
    [index],
  )
}

export const Palette = ({ pages, onClose }: { pages: Page[]; onClose: () => void }) => {
  const api = useStorybookApi()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    return pages.filter((page) =>
      terms.every((term) => `${page.name} ${page.section}`.toLowerCase().includes(term)),
    )
  }, [pages, query])

  const groups = useMemo(() => {
    const map = new Map<string, Page[]>()
    for (const page of results) map.set(page.section, [...(map.get(page.section) ?? []), page])
    return [...map.entries()]
  }, [results])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const open = (page: Page) => {
    api.selectStory(page.id)
    onClose()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      onClose()
    } else if (event.key === "Tab") {
      // The input is the only focusable element, so keep focus inside the dialog
      event.preventDefault()
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      if (results.length === 0) return
      const step = event.key === "ArrowDown" ? 1 : -1
      setActiveIndex((index) => (index + step + results.length) % results.length)
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault()
      open(results[activeIndex])
    }
  }

  let itemIndex = 0

  return createPortal(
    <div className="kova-cmdk-overlay" onMouseDown={onClose}>
      <div
        className="kova-cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="kova-cmdk-input">
          <SearchIcon />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
            }
            aria-autocomplete="list"
            placeholder="Search documentation..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <div ref={listRef} id={listId} className="kova-cmdk-list" role="listbox">
          {results.length === 0 && <p className="kova-cmdk-empty">No results found.</p>}
          {groups.map(([section, items]) => (
            <div key={section} role="group" aria-label={section} className="kova-cmdk-group">
              <div className="kova-cmdk-heading" aria-hidden>
                {section}
              </div>
              {items.map((page) => {
                const index = itemIndex++
                return (
                  <div
                    key={page.id}
                    id={`${listId}-${page.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    data-index={index}
                    className="kova-cmdk-item"
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => open(page)}
                  >
                    <SectionIcon section={page.section} />
                    {page.name}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export const CommandPalette = () => {
  const api = useStorybookApi()
  const pages = usePages()
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!isOpenShortcut(event)) return
      // Capture phase, so Storybook's own search shortcut never runs
      event.preventDefault()
      event.stopImmediatePropagation()
      setIsOpen(true)
    }
    // Key presses inside the docs iframe are forwarded to the manager on the channel
    const handlePreviewKeyDown = ({ event }: { event: Parameters<typeof isOpenShortcut>[0] }) => {
      if (isOpenShortcut(event)) setIsOpen(true)
    }
    window.addEventListener("keydown", handleKeyDown, true)
    api.on("previewKeydown", handlePreviewKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true)
      api.off("previewKeydown", handlePreviewKeyDown)
    }
  }, [api])

  const close = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="kova-cmdk-trigger"
        aria-label="Search documentation"
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon />
        <span className="kova-cmdk-trigger-label">Search Kova UI</span>
        <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>
      {isOpen && <Palette pages={pages} onClose={close} />}
    </>
  )
}

addons.register("kova/command-palette", () => {
  addons.add("kova/command-palette/tool", {
    title: "Search documentation",
    type: types.TOOL,
    match: () => true,
    render: () => <CommandPalette />,
  })
})
