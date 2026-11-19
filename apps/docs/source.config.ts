import { defineConfig } from "fumadocs-mdx/config"
import type { Nodes, Root, RootContent } from "mdast"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

const EXAMPLES_DIR = path.resolve(import.meta.dirname, "src/examples")

type JsxElement = {
  type: "mdxJsxFlowElement" | "mdxJsxTextElement"
  name: string | null
  attributes: { type: string; name?: string; value?: unknown }[]
  children: RootContent[]
}

const isJsx = (node: Nodes): node is Nodes & JsxElement =>
  node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement"

function getAttribute(node: JsxElement, name: string) {
  const attribute = node.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === name)
  return typeof attribute?.value === "string" ? attribute.value : undefined
}

/**
 * Puts the source of each `<Preview name="slug/example" />` inside it as a `tsx` code block, so it
 * is highlighted at build time. It also goes in a `source` attribute, which the page's Markdown
 * prints as a code block in place of the element.
 */
function remarkPreviewSource() {
  return (tree: Root, file: { data: Record<string, unknown> }) => {
    const compiler = file.data._compiler as { addDependency?: (file: string) => void } | undefined
    const visit = (node: Nodes) => {
      if (isJsx(node) && node.name === "Preview") {
        const name = getAttribute(node, "name")
        if (!name) return
        const filePath = path.join(EXAMPLES_DIR, `${name}.tsx`)
        compiler?.addDependency?.(filePath)
        if (!existsSync(filePath)) return
        const code = readFileSync(filePath, "utf8").trimEnd()
        node.children = [{ type: "code", lang: "tsx", meta: "lineNumbers", value: code }]
        node.attributes.push({ type: "mdxJsxAttribute", name: "source", value: code })
        return
      }
      if ("children" in node) node.children.forEach((child) => visit(child as Nodes))
    }
    visit(tree)
  }
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkPreviewSource],
    rehypeCodeOptions: {
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
})
