import { redirect } from "@tanstack/react-router"
import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start"
import { isMarkdownPreferred } from "fumadocs-core/negotiation"

import { docsRoute } from "./lib/shared.js"

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
})

// Agents that ask for `Accept: text/markdown` get the page's Markdown instead of its HTML
const markdownMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url)
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "")
  const pathname = url.pathname.slice(basePath.length)

  if (
    pathname.startsWith(docsRoute) &&
    !/\.(md|txt)$/.test(pathname) &&
    isMarkdownPreferred(request)
  ) {
    url.pathname = url.pathname.replace(/\/$/, "") + ".md"
    throw redirect({ href: url.href, headers: { Vary: "Accept" } })
  }

  return next()
})

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, markdownMiddleware],
}))
