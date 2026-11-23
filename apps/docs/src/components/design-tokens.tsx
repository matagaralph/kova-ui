import { Search } from "@kova-ui/icons"
import { Button, CopyButton } from "kova-ui/components"
import { useState } from "react"

import { isColorToken, type Token, tokenCategories } from "../lib/tokens.js"

/** `var(--gray-1000)` reads as `gray-1000` */
const short = (value: string) => value.replace(/var\(--([\w-]+)\)/g, "$1")

function Value({ token }: { token: Token }) {
  if (token.light && token.dark && token.light !== token.dark) {
    return (
      <code className="docs-tokens-value">
        <span data-light="">{short(token.light)}</span>
        <span data-dark="">{short(token.dark)}</span>
      </code>
    )
  }
  return <code className="docs-tokens-value">{short(token.light ?? token.value)}</code>
}

function Sample({ token }: { token: Token }) {
  if (token.name.startsWith("--radius-")) {
    return <div className="docs-tokens-radius" style={{ borderRadius: `var(${token.name})` }} />
  }
  if (isColorToken(token)) {
    return <div className="docs-tokens-color" style={{ background: `var(${token.name})` }} />
  }
  return null
}

function Row({ token }: { token: Token }) {
  const shadow = token.name.startsWith("--shadow-")
  const sampled = isColorToken(token) || token.name.startsWith("--radius-")

  return (
    <tr>
      {sampled && (
        <td className="docs-tokens-sample">
          <Sample token={token} />
        </td>
      )}
      <td>
        <CopyButton
          className="docs-tokens-copy"
          variant="secondary"
          size="2xs"
          copyValue={`var(${token.name})`}
        >
          {token.name.slice(2)}
        </CopyButton>
      </td>
      <td>
        {shadow ? (
          <div className="docs-tokens-shadow">
            <div style={{ boxShadow: `var(${token.name})` }} />
          </div>
        ) : (
          <Value token={token} />
        )}
      </td>
    </tr>
  )
}

/** Every token, searchable and filtered by kind */
export default function DesignTokens() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState("all")
  const query = search.trim().toLowerCase()

  return (
    <div className="docs-tokens">
      <div className="docs-search">
        <Search aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
          aria-label="Search tokens"
        />
      </div>
      <div className="docs-tokens-filters">
        {[{ id: "all", title: "All" }, ...tokenCategories]
          .filter(({ id }) => id !== "breakpoints")
          .map(({ id, title }) => (
            <Button
              key={id}
              variant={view === id ? "primary" : "secondary"}
              pill
              aria-pressed={view === id}
              onClick={() => setView(id)}
            >
              {title}
            </Button>
          ))}
      </div>
      {tokenCategories
        .filter(({ id }) => view === "all" || view === id)
        .map(({ id, title, tokens }) => {
          const filtered = tokens.filter((token) => token.name.toLowerCase().includes(query))
          if (!filtered.length) return null
          return (
            <section key={id}>
              <h2 id={id}>{title}</h2>
              <table className="docs-tokens-table">
                <tbody>
                  {filtered.map((token) => (
                    <Row key={token.name} token={token} />
                  ))}
                </tbody>
              </table>
            </section>
          )
        })}
    </div>
  )
}
