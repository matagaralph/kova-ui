import * as Icons from "@kova-ui/icons"
import { type ComponentType, type SVGProps, useDeferredValue, useId, useState } from "react"

import { CopyButton } from "./copy-button.js"

const ICONS = Object.entries(Icons as Record<string, unknown>)
  .filter((entry): entry is [string, ComponentType<SVGProps<SVGSVGElement>>] =>
    /^[A-Z]/.test(entry[0]),
  )
  .sort(([a], [b]) => a.localeCompare(b))

/** How many icons show before "Show all", to keep the page light */
const INITIAL_COUNT = 120

/** Every icon in `@kova-ui/icons`, searchable. Selecting one copies its import */
export default function IconGallery() {
  const [query, setQuery] = useState("")
  const [showAll, setShowAll] = useState(false)
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())
  const id = useId()
  const results = deferredQuery
    ? ICONS.filter(([name]) => name.toLowerCase().includes(deferredQuery))
    : ICONS
  const shown = deferredQuery || showAll ? results : results.slice(0, INITIAL_COUNT)

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Search icons
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search ${ICONS.length} icons`}
        autoComplete="off"
        spellCheck={false}
        className="docs-input"
      />
      <p className="text-fd-muted-foreground mt-2 text-xs" aria-live="polite">
        {results.length === ICONS.length
          ? "Select an icon to copy its import."
          : `${results.length} ${results.length === 1 ? "icon" : "icons"} found`}
      </p>
      <ul className="docs-icon-grid">
        {shown.map(([name, Icon]) => (
          <li key={name}>
            <CopyButton
              value={`import { ${name} } from "@kova-ui/icons"`}
              label={`the ${name} import`}
              className="docs-icon"
            >
              <Icon aria-hidden="true" width={20} height={20} />
              <span>{name}</span>
            </CopyButton>
          </li>
        ))}
      </ul>
      {shown.length < results.length && (
        <button
          type="button"
          className="docs-button mx-auto mt-4 flex"
          onClick={() => setShowAll(true)}
        >
          Show all {ICONS.length} icons
        </button>
      )}
    </div>
  )
}
