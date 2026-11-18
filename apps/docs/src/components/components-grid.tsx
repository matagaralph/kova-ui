import { Link } from "@tanstack/react-router"

import { getComponentPages } from "../lib/source.js"

/** Every component page, for the components index */
export function ComponentsGrid() {
  const pages = getComponentPages()

  return (
    <ul className="not-prose sm:grid-cols-2 lg:grid-cols-3 my-8 grid gap-3">
      {pages.map((page) => (
        <li key={page.url}>
          <Link
            to="/docs/$"
            params={{ _splat: page.slugs.join("/") }}
            className="group bg-fd-card hover:bg-fd-accent/40 flex h-full flex-col rounded-xl border p-4 transition-colors"
          >
            <span className="text-fd-foreground font-medium">{page.data.title}</span>
            {page.data.description && (
              <span className="text-fd-muted-foreground mt-1 text-sm">{page.data.description}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
