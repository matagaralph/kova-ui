import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import type { AnchorHTMLAttributes, ComponentProps } from "react"

import { withBase } from "../lib/shared.js"
import { ComponentsGrid } from "./components-grid.js"
import { lazyWidget } from "./lazy-widget.js"
import { Preview } from "./preview.js"

// Loaded on demand: they're large, or built with Kova components that may be mid-change
const BrandPlayground = lazyWidget("The brand playground", () => import("./brand-playground.js"))
const IconGallery = lazyWidget("The icon gallery", () => import("./icon-gallery.js"))
const ColorPalette = lazyWidget("The palette", () => import("./color-palette.js"))
const TokenTable = lazyWidget("The token table", () => import("./token-table.js"))

await Promise.all([BrandPlayground, IconGallery, ColorPalette, TokenTable].map((w) => w.ready))

const DefaultLink = defaultMdxComponents.a

/** Files like `/llms.txt` aren't router pages, so they get a plain link with the base path */
function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href } = props
  if (href && /^\/[^/].*\.(txt|md|xml|json)$/.test(href))
    return <a {...props} href={withBase(href)} />
  return <DefaultLink {...props} />
}

function ReferenceTable(props: ComponentProps<"table">) {
  return (
    <div className="docs-table docs-reference-table not-prose" tabIndex={0}>
      <table {...props} />
    </div>
  )
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    a: Link,
    table: ReferenceTable,
    Preview,
    ComponentsGrid,
    BrandPlayground,
    IconGallery,
    ColorPalette,
    TokenTable,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
