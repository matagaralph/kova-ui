import { createFileRoute } from "@tanstack/react-router"
import { createFromSource } from "fumadocs-core/search/server"

import { source } from "../lib/source.js"

const search = createFromSource(source, {
  // A page whose content fails to evaluate is still found by its title and description
  async buildIndex(page) {
    const structuredData = await page.data.structuredData().catch((error: unknown) => {
      // oxlint-disable-next-line no-console
      console.error(`Couldn't index the content of ${page.path}:`, error)
      return { headings: [], contents: [] }
    })
    return {
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData,
    }
  },
})

// The exported index, downloaded by the search dialog, so search works without a server
export const Route = createFileRoute("/search.json")({
  server: {
    handlers: {
      GET: () => search.staticGET(),
    },
  },
})
