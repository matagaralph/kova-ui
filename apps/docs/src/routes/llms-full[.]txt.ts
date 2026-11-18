import { createFileRoute } from "@tanstack/react-router"

import { renderLlmsFull, textResponse } from "../lib/markdown.js"

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(await renderLlmsFull(), "text/plain"),
    },
  },
})
