import { createFileRoute } from "@tanstack/react-router"

import { renderPageMarkdown, textResponse } from "../../lib/markdown.js"
import { source } from "../../lib/source.js"

export const Route = createFileRoute("/docs/{$}.md")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const page = source.getPage(params._splat?.split("/").filter(Boolean) ?? [])
        if (!page) return new Response("Not found", { status: 404 })
        return textResponse(await renderPageMarkdown(page), "text/markdown")
      },
    },
  },
})
