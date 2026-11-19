import * as Icons from "@kova-ui/icons"
import { Blankslate } from "kova-ui/components"
import { type ComponentType, type SVGProps, useDeferredValue, useState } from "react"

import { CopyButton } from "./copy-button.js"

const ICONS = Object.entries(Icons as Record<string, unknown>)
  .filter((entry): entry is [string, ComponentType<SVGProps<SVGSVGElement>>] =>
    /^[A-Z]/.test(entry[0]),
  )
  .sort(([a], [b]) => a.localeCompare(b))

/** Every icon in `@kova-ui/icons`, searchable. Selecting one copies its import */
export default function IconGallery() {
  const [search, setSearch] = useState("")
  const query = useDeferredValue(search.trim().toLowerCase())
  const results = ICONS.filter(([name]) => name.toLowerCase().includes(query))

  return (
    <div>
      <div className="docs-search">
        <Icons.Search aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
          aria-label="Search icons"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {results.length === 0 ? (
        <Blankslate fill="none" className="pt-8">
          <Blankslate.Icon size="sm">
            <Icons.Search />
          </Blankslate.Icon>
          <Blankslate.Description>
            No icons found matching <strong>"{search}"</strong>
          </Blankslate.Description>
        </Blankslate>
      ) : (
        <ul className="docs-icon-grid">
          {results.map(([name, Icon]) => (
            <li key={name}>
              <CopyButton
                value={`import { ${name} } from "@kova-ui/icons"`}
                label={`the ${name} import`}
                title={name}
                className="docs-icon"
              >
                <span className="docs-icon-box">
                  <Icon aria-hidden="true" />
                </span>
                <span className="docs-icon-name">{name}</span>
              </CopyButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
