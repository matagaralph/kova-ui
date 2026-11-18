import { createFileRoute, notFound } from "@tanstack/react-router"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page"
import { Suspense, use } from "react"

import { getMDXComponents } from "../../components/mdx.js"
import { baseOptions } from "../../lib/layout.shared.js"
import { absoluteUrl, githubUrl, markdownPath, siteName, withBase } from "../../lib/shared.js"
import { docs, source } from "../../lib/source.js"

export const Route = createFileRoute("/docs/$")({
  component: Page,
  // Runs on the server and in the browser, so the site works as static files without server functions
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? []
    const page = source.getPage(slugs)
    if (!page) throw notFound()
    await docs.getPage(page.path)?.preload()
    return {
      path: page.path,
      url: page.url,
      title: page.data.title,
      description: page.data.description ?? "",
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const title = loaderData.url === "/docs" ? siteName : `${loaderData.title} – ${siteName}`
    const url = absoluteUrl(loaderData.url)
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:url", content: url },
      ],
      links: [
        { rel: "canonical", href: url },
        {
          rel: "alternate",
          type: "text/markdown",
          href: withBase(markdownPath(loaderData.url)),
          title: "Markdown",
        },
      ],
    }
  },
})

function Page() {
  const { path, url } = Route.useLoaderData()

  return (
    <DocsLayout {...baseOptions()} tree={source.getPageTree()}>
      <Suspense>
        <Content path={path} url={url} />
      </Suspense>
    </DocsLayout>
  )
}

function Content({ path, url }: { path: string; url: string }) {
  const page = docs.getPage(path)
  if (!page) throw new Error(`Unknown page: ${path}`)

  const { toc } = use(page.load())
  const MDX = page.body
  const markdownUrl = markdownPath(url)

  return (
    <DocsPage toc={toc} tableOfContent={{ style: "clerk" }}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.description}</DocsDescription>
      <div className="flex flex-row flex-wrap items-center gap-2 border-b py-3">
        <MarkdownCopyButton markdownUrl={markdownUrl}>Copy page</MarkdownCopyButton>
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          pageUrl={absoluteUrl(markdownUrl)}
          githubUrl={`${githubUrl}/blob/main/apps/docs/content/docs/${encodeURI(path)}`}
        />
      </div>
      <DocsBody className="docs-prose">
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}
