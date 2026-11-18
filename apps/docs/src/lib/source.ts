import { loader } from "fumadocs-core/source"
import { defineDocs } from "fumadocs-mdx/macro"

import { MARKDOWN_PLACEHOLDERS } from "./placeholders.js"
import { docsRoute } from "./shared.js"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: {
        headingIds: false,
        mdxAsPlaceholder: MARKDOWN_PLACEHOLDERS,
        // Other JSX has no Markdown form, so only its text is kept
        filterElement: (node) =>
          (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
          !MARKDOWN_PLACEHOLDERS.includes(node.name ?? "")
            ? "children-only"
            : true,
      },
    },
  },
})

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
})

export type Page = NonNullable<ReturnType<typeof source.getPage>>

/** Component pages, alphabetically, for the components index */
export function getComponentPages() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === "components" && page.slugs.length === 2)
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
}
