import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import {
  type AnchorHTMLAttributes,
  Children,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"

import { withBase } from "../lib/shared.js"
import { ComponentsGrid } from "./components-grid.js"
import { lazyWidget } from "./lazy-widget.js"
import { Preview } from "./preview.js"

// Loaded on demand: they're large, or built with Kova components that may be mid-change
const BrandPlayground = lazyWidget("The brand playground", () => import("./brand-playground.js"))
const IconGallery = lazyWidget("The icon gallery", () => import("./icon-gallery.js"))
const ColorPalette = lazyWidget("The palette", () => import("./color-palette.js"))
const DesignTokens = lazyWidget("The design tokens", () => import("./design-tokens.js"))

await Promise.all([BrandPlayground, IconGallery, ColorPalette, DesignTokens].map((w) => w.ready))

const DefaultLink = defaultMdxComponents.a

/** Files like `/llms.txt` aren't router pages, so they get a plain link with the base path */
function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href } = props
  if (href && /^\/[^/].*\.(txt|md|xml|json)$/.test(href))
    return <a {...props} href={withBase(href)} />
  return <DefaultLink {...props} />
}

type WithChildren = ReactElement<{ children?: ReactNode }>

const elements = (node: ReactNode) =>
  Children.toArray(node).filter((child): child is WithChildren => isValidElement(child))

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ""
}

/** Cells of each row, from the table MDX compiles: `thead` and `tbody`, then `tr`, then cells */
function rowsOf(table: ReactNode) {
  return elements(table).map((section) =>
    elements(section.props.children).map((row) =>
      elements(row.props.children).map((cell) => cell.props.children),
    ),
  )
}

/** A `| Prop | Type | Default | Description |` table, as one block per prop */
function PropList({ rows, columns }: { rows: ReactNode[][]; columns: string[] }) {
  const column = (name: string) => columns.indexOf(name)
  const [type, fallback, description] = [column("Type"), column("Default"), column("Description")]

  return (
    <dl className="docs-props not-prose">
      {rows.map((cells, index) => {
        const value = fallback === -1 ? "" : textOf(cells[fallback]).trim()
        return (
          <div key={index} className="docs-prop">
            <dt>
              <code className="docs-prop-name">{textOf(cells[0])}</code>
              {type !== -1 && <code className="docs-prop-type">{textOf(cells[type])}</code>}
              {value && <code className="docs-prop-default">= {value}</code>}
            </dt>
            {description !== -1 && <dd>{cells[description]}</dd>}
          </div>
        )
      })}
    </dl>
  )
}

function ReferenceTable(props: ComponentProps<"table">) {
  const [head, body] = rowsOf(props.children)
  const columns = head?.[0]?.map((cell) => textOf(cell).trim()) ?? []
  if (columns[0] === "Prop" && body) return <PropList rows={body} columns={columns} />

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
    DesignTokens,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
