import { renderPlaceholder } from "fumadocs-core/mdx-plugins/remark-llms.runtime"

import { absoluteUrl, markdownPath, siteDescription, siteName } from "./shared.js"
import { getComponentPages, type Page, source } from "./source.js"
import {
  colorPalettes,
  iconNames,
  type TokenSource,
  tokenSources,
  tokensToMarkdown,
} from "./tokens.js"

const CALLOUT_LABELS: Record<string, string> = {
  info: "Note",
  warn: "Warning",
  warning: "Warning",
  error: "Important",
  success: "Tip",
  idea: "Tip",
}

/** The Markdown form of the MDX components listed in `placeholders.ts` */
const renderers: Parameters<typeof renderPlaceholder>[1] = {
  // `source.config.ts` puts the example's source in a `source` attribute
  Preview: ({ attributes }) =>
    typeof attributes.source === "string"
      ? `\`\`\`tsx title="${String(attributes.name)}.tsx"\n${attributes.source}\n\`\`\``
      : `_The \`${String(attributes.name)}\` example isn't available._`,
  ComponentsGrid: () =>
    getComponentPages()
      .map(
        (page) =>
          `- [${page.data.title}](${absoluteUrl(markdownPath(page.url))})${page.data.description ? `: ${page.data.description}` : ""}`,
      )
      .join("\n"),
  BrandPlayground: () =>
    "_The website has an interactive playground here: pick brand colors and see Kova components use them._",
  IconGallery: () =>
    `${iconNames.length} icons, each a React component exported by name from \`@kova-ui/icons\`:\n\n${iconNames.map((name) => `\`${name}\``).join(", ")}`,
  ColorPalette: ({ attributes }) =>
    tokensToMarkdown(colorPalettes.filter((group) => group.title === attributes.group)),
  TokenTable: ({ attributes }) => {
    const groups = tokenSources[String(attributes.source ?? "semantic") as TokenSource] ?? []
    return tokensToMarkdown(
      attributes.group ? groups.filter((group) => group.title === attributes.group) : groups,
      attributes.group ? 0 : 3,
    )
  },
  Callout: ({ attributes, children }) => {
    const label =
      (typeof attributes.title === "string" && attributes.title) ||
      CALLOUT_LABELS[String(attributes.type ?? "info")] ||
      "Note"
    const body = children.trim().split("\n").join("\n> ")
    return `> **${label}:** ${body}`
  },
}

/** A page as Markdown: its title, description and URL, then its content with live examples as code */
export async function renderPageMarkdown(page: Page) {
  let body: string
  try {
    body = await renderPlaceholder(await page.data.getText("processed"), renderers)
  } catch (error) {
    // A page whose content fails to evaluate still gets its authored source, rather than breaking
    // `llms-full.txt` for every page
    // oxlint-disable-next-line no-console
    console.error(`Couldn't render the Markdown of ${page.path}:`, error)
    body = await page.data.getText("raw")
  }
  // Site links become absolute, so they work wherever the Markdown ends up
  body = body.replace(/\]\((\/[^)\s]*)\)/g, (_, pathname: string) => `](${absoluteUrl(pathname)})`)
  const lines = [`# ${page.data.title}`, ""]
  if (page.data.description) lines.push(`> ${page.data.description}`, "")
  lines.push(`Source: ${absoluteUrl(page.url)}`, "", body.trim(), "")
  return lines.join("\n")
}

/** `llms.txt`: what Kova is, and a link to the Markdown of every page, grouped like the sidebar */
export function renderLlmsIndex() {
  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    "Components are imported from `kova-ui/components`, icons from `@kova-ui/icons`, and `Markdown` and `CodeBlock` from `@kova-ui/markdown`. Every page below is Markdown; examples are full, runnable `tsx` files.",
    "",
    `- [All pages in one file](${absoluteUrl("/llms-full.txt")})`,
  ]

  const tree = source.getPageTree()
  type Node = (typeof tree.children)[number]
  const visit = (nodes: Node[], depth: number) => {
    for (const node of nodes) {
      if (node.type === "separator") {
        lines.push("", `## ${String(node.name ?? "")}`, "")
      } else if (node.type === "page") {
        const page = source.getNodePage(node)
        if (!page) continue
        const description = page.data.description ? `: ${page.data.description}` : ""
        lines.push(
          `${"  ".repeat(depth)}- [${page.data.title}](${absoluteUrl(markdownPath(page.url))})${description}`,
        )
      } else if (node.type === "folder") {
        if (node.index) visit([node.index], depth)
        visit(node.children, depth)
      }
    }
  }
  visit(tree.children, 0)
  lines.push("")
  return lines.join("\n")
}

/** `llms-full.txt`: every page's Markdown, in sidebar order */
export async function renderLlmsFull() {
  const pages = source.getPages()
  const order = new Map<string, number>()
  const tree = source.getPageTree()
  type Node = (typeof tree.children)[number]
  const visit = (nodes: Node[]) => {
    for (const node of nodes) {
      if (node.type === "page") order.set(node.url, order.size)
      else if (node.type === "folder") {
        if (node.index) order.set(node.index.url, order.size)
        visit(node.children)
      }
    }
  }
  visit(tree.children)
  pages.sort((a, b) => (order.get(a.url) ?? Infinity) - (order.get(b.url) ?? Infinity))
  const rendered = await Promise.all(pages.map(renderPageMarkdown))
  return `# ${siteName}\n\n> ${siteDescription}\n\n${rendered.join("\n---\n\n")}`
}

/** A plain-text response, for the routes that serve Markdown */
export function textResponse(body: string, contentType: string) {
  return new Response(body, {
    headers: {
      "Content-Type": `${contentType}; charset=utf-8`,
      "Vary": "Accept",
    },
  })
}
