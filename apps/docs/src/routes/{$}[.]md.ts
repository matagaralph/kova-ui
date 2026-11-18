import { createFileRoute } from "@tanstack/react-router"

import { renderPageMarkdown, textResponse } from "../lib/markdown.js"
import { source } from "../lib/source.js"

// `/docs.md`, the Markdown of the docs index
export const Route = createFileRoute("/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const page = params._splat === "docs" ? source.getPage([]) : undefined
        if (!page) return new Response("Not found", { status: 404 })
        return textResponse(await renderPageMarkdown(page), "text/markdown")
      },
    },
  },
})
