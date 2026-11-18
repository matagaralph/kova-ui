import { createFileRoute } from "@tanstack/react-router"

import { renderLlmsIndex, textResponse } from "../lib/markdown.js"

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => textResponse(renderLlmsIndex(), "text/plain"),
    },
  },
})
