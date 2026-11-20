import { createFileRoute } from "@tanstack/react-router"

import { source } from "../lib/source.js"

export type SearchEntry = {
  url: string
  title: string
  description?: string
  section: string
  headings: { id: string; title: string }[]
}

const sections: Record<string, string> = {
  components: "Components",
  foundations: "Foundations",
  transitions: "Transitions",
}

type TreeNode = { type: string; url?: string; children?: TreeNode[]; index?: TreeNode }

/** Page URLs in sidebar order */
function sidebarOrder(nodes: TreeNode[], urls: string[] = []) {
  for (const node of nodes) {
    if (node.index?.url) urls.push(node.index.url)
    if (node.url) urls.push(node.url)
    if (node.children) sidebarOrder(node.children, urls)
  }
  return urls
}

async function buildIndex(): Promise<SearchEntry[]> {
  const order = sidebarOrder(source.getPageTree().children as TreeNode[])
  const position = (url: string) => (order.includes(url) ? order.indexOf(url) : order.length)
  const pages = source.getPages().sort((a, b) => position(a.url) - position(b.url))
  return Promise.all(
    pages.map(async (page) => {
      // A page whose content fails to evaluate is still found by its title and description
      const structured = await page.data.structuredData().catch((error: unknown) => {
        // oxlint-disable-next-line no-console
        console.error(`Couldn't index the headings of ${page.path}:`, error)
        return { headings: [] }
      })
      return {
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        section: sections[page.slugs[0] ?? ""] ?? "Getting started",
        headings: structured.headings.map((heading) => ({
          id: heading.id,
          title: heading.content,
        })),
      }
    }),
  )
}

// Page titles, descriptions and headings, downloaded by the search dialog, so search works on a static host
export const Route = createFileRoute("/search.json")({
  server: {
    handlers: {
      GET: async () => Response.json(await buildIndex()),
    },
  },
})
